import axios, { AxiosRequestConfig } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { Endpoints } from "@octokit/types";

type listUserReposResponse = Endpoints["GET /repos/{owner}/{repo}"]["response"];
type contributors = Endpoints['GET /repos/{owner}/{repo}/stats/contributors']["response"];
type communityProfile = Endpoints["GET /repos/{owner}/{repo}/community/profile"]["response"];

const config: AxiosRequestConfig = {
  headers: {
    'Authorization': `token ${process.env.GITHUB_TOKEN}`,
    'accept': 'application/vnd.github+json',
  },
};

export async function GET(req: NextRequest) {
  try {
    const repo = req.nextUrl.searchParams.get('repo');
    const { data: repoData } = await axios.get<listUserReposResponse["data"]>(`https://api.github.com/repos/${repo}`, config);
    const { data: contributors } = await axios.get<contributors["data"]>(`https://api.github.com/repos/${repo}/stats/contributors`, config);
    const { data: communityData } = await axios.get<communityProfile["data"]>(`https://api.github.com/repos/${repo}/community/profile`, config);

    return NextResponse.json({
      repo,
      contributors,
      description: communityData.description,
      documentation: communityData.documentation,
      healthPercentage: communityData.health_percentage,
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
