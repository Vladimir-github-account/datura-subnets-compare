import axios, { AxiosRequestConfig } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { Endpoints } from "@octokit/types";

type weeklyCommitCountResponse = Endpoints['GET /repos/{owner}/{repo}/stats/participation']["response"];
type weeklyCommitActivityResponse = Endpoints['GET /repos/{owner}/{repo}/stats/code_frequency']["response"];

const config: AxiosRequestConfig = {
  headers: {
    'Authorization': `token ${process.env.GITHUB_TOKEN}`,
  },
};

export async function GET(req: NextRequest) {
  try {
    let retryCounter = 3;
    axios.interceptors.response.use((response) => {
      if (
        response.status === 202 &&
        retryCounter > 0
      ) {
        const { config } = response;
        const originalConfig = config;
        const waitTime = response.headers['x-retry-after'] * 1000 || 1200;
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
    const { data: weeklyCommitCount } = await axios.get<weeklyCommitCountResponse["data"]>(`https://api.github.com/repos/${repo}/stats/participation`, config);
    const { data: weeklyCommitActivity } = await axios.get<weeklyCommitActivityResponse["data"]>(`https://api.github.com/repos/${repo}/stats/code_frequency`, config);
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