import axios, { AxiosRequestConfig } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { Endpoints } from "@octokit/types";

// type listRepoPullsResponse = Endpoints["GET /repos/{owner}/{repo}/pulls"]["response"];
type listUserReposResponse = Endpoints["GET /repos/{owner}/{repo}"]["response"];
type contributorsResponse = Endpoints["GET /repos/{owner}/{repo}/contributors"]["response"];

const config: AxiosRequestConfig = {
  headers: {
    'Authorization': `token ${process.env.GITHUB_TOKEN}`,
  },
};

export async function GET(req: NextRequest) {
  try {
    const repo = req.nextUrl.searchParams.get('repo');
    const { data: repoData } = await axios.get<listUserReposResponse["data"]>(`https://api.github.com/repos/${repo}`, config);
    const { data: contributors } = await axios.get<contributorsResponse["data"]>(`https://api.github.com/repos/${repo}/contributors`, config);

    return NextResponse.json({
      repo,
      contributorsCount: contributors.length || 0,
      forks: repoData.forks_count,
      stars: repoData.stargazers_count,
      watchers: repoData.subscribers_count,
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