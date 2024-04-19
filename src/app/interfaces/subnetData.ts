export interface SubnetData {
  contributors: Contributor[],
  forks: number;
  stars: number,
  watchers: number,
  repo: string;
  description: string;
  healthPercentage: number;
  documentation?: string;
}

export interface Contributor {
  author: {
    login: string;
    avatar_url: string;
    html_url: string;
  }
  total: number;
  weeks: {
    w: number;
    a: number;
    d: number;
    c: number;
  }[]
}
