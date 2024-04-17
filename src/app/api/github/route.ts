import axios, { AxiosRequestConfig } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { Endpoints } from "@octokit/types";

// type lastYearCommitActivityResponse = Endpoints['GET /repos/{owner}/{repo}/stats/commit_activity']["response"];
// type listRepoPullsResponse = Endpoints["GET /repos/{owner}/{repo}/pulls"]["response"];
type listUserReposResponse = Endpoints["GET /repos/{owner}/{repo}"]["response"];
type weeklyCommitCountResponse = Endpoints['GET /repos/{owner}/{repo}/stats/participation']["response"];
type weeklyCommitActivityResponse = Endpoints['GET /repos/{owner}/{repo}/stats/code_frequency']["response"];
type contributorsResponse = Endpoints['GET /repos/{owner}/{repo}/stats/contributors']["response"];

const config: AxiosRequestConfig = {
  headers: {
    'Authorization': `token ${process.env.GITHUB_TOKEN}`,
  },
};

export async function GET(req: NextRequest) {
  try {
    let retryCounter = 1;
    axios.interceptors.response.use((response) => {
      if (
        response.status === 202 &&
        retryCounter > 0
      ) {
        // console.log(retryCounter);
        const { config } = response;
        const originalConfig = config;
        const waitTime = response.headers['x-retry-after'] * 1000 || 100;
        retryCounter += -1;

        return new Promise((resolve, reject) => {
          setTimeout(() => resolve(axios.request(originalConfig)), waitTime);
        });
      }

      return response;
    }, error => {
      return Promise.reject(error);
    });

    const repo = req.nextUrl.searchParams.get('repo');
    const { data: repoData } = await axios.get<listUserReposResponse["data"]>(`https://api.github.com/repos/${repo}`, config);
    const { data: weeklyCommitCount } = await axios.get<weeklyCommitCountResponse["data"]>(`https://api.github.com/repos/${repo}/stats/participation`, config);
    const { data: weeklyCommitActivity } = await axios.get<weeklyCommitActivityResponse["data"]>(`https://api.github.com/repos/${repo}/stats/code_frequency`, config);
    const { data: contributors } = await axios.get<contributorsResponse["data"]>(`https://api.github.com/repos/${repo}/stats/contributors`, config);
    const commitArr = [...weeklyCommitCount.all].reverse();
    const lastYearCommitsCount = commitArr.reduce((acc, el) => acc + el, 0);
    const lastThreeMonthsCommitsCount = [...commitArr].slice(0, 13).reduce((acc, el) => acc + el, 0);
    const lastMonthCommitsCount = [...commitArr].slice(0, 4).reduce((acc, el) => acc + el, 0);
    const weekCommitsCount = commitArr[0];

    const lastYearCommitsActivity = Array.isArray(weeklyCommitActivity)
      ? weeklyCommitActivity.reduce((acc, el) => {
        return {
          additions: acc.additions + el[1],
          deletions: acc.deletions + el[2],
        }
      }, { additions: 0, deletions: 0 })
      : { additions: 0, deletions: 0 };

    return NextResponse.json({
      repo,
      forks: repoData.forks_count,
      stars: repoData.stargazers_count,
      watchers: repoData.subscribers_count,
      contributorsCount: contributors.length || 0,
      lastYearCommitsCount,
      lastMonthCommitsCount,
      lastThreeMonthsCommitsCount,
      weekCommitsCount,
      lastYearAdditionsCount: lastYearCommitsActivity.additions,
      lastYearDeletionsCount: lastYearCommitsActivity.deletions,
    }, { status: 200 });
  } catch (e) {
    console.log('error', e);
    return NextResponse.json(
      { error: 'Bad request.' },
      { status: 400 }
    );
  }
}

// const { data: prs } = await axios.get<listRepoPullsResponse["data"]>(
//   `https://api.github.com/repos/${req.query.repo}/pulls?state=closed&base=${repoData.default_branch}&sort=created`,
//   config
// );

// const resultArr = prs.map(async (pr: any) => {
//   const { data: commits }  = await axios.get(pr.commits_url, config);
//   return await Promise.all(commits.map(async (commit: any) => {
//     const { data: commitInfo } = await axios.get(commit.url, config);
//
//     const author = commitInfo.commit.author.name;
//     const additions = commitInfo.stats.additions;
//     const deletions = commitInfo.stats.deletions;
//     return {
//       author,
//       additions,
//       deletions,
//       time: commitInfo.commit.author.date,
//       pr_number: pr.number,
//       pr_title: pr.title,
//       file_names: commitInfo.files,
//       commit_message: commitInfo.commit.message
//     }
//   }))
// });
// const results = await Promise.all(resultArr);