import axios from 'axios';
import { NextResponse } from 'next/server';

const config = {
  headers: {
    'Authorization': `token ${process.env.GITHUB_TOKEN}`,
  }
};

export async function GET(req: Request) {
  const { data: prs } = await axios.get(`https://api.github.com/repos/opentensor/prompting/pulls?state=closed&base=main&sort=created`, config);
  const resultArr = prs.map(async (pr: any) => {
    const { data: commits }  = await axios.get(pr.commits_url, config);
    return await Promise.all(commits.map(async (commit: any) => {
      const { data: commitInfo } = await axios.get(commit.url, config);

      const author = commitInfo.commit.author.name;
      const additions = commitInfo.stats.additions;
      const deletions = commitInfo.stats.deletions;
      return {
        author,
        additions,
        deletions,
        time: commitInfo.commit.author.date,
        pr_number: pr.number,
        pr_title: pr.title,
        file_names: commitInfo.files,
        commit_message: commitInfo.commit.message
      }
    }))
  });
  const results = await Promise.all(resultArr);
  return NextResponse.json(results.flat(2), { status: 200 });
}
