type GitHubUserResponse = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
};

type ContributionYear = {
  year: number;
  total: number;
  weeks: Array<{
    days: Array<{
      date: string;
      count: number;
    }>;
  }>;
};

type RecentCommit = {
  repoName: string;
  repoUrl: string;
  committedAt: string;
  message: string;
  commitUrl: string;
  isPrivate: boolean;
};

export type GitHubProfile = {
  username: string;
  name: string;
  bio?: string;
  avatarUrl: string;
  profileUrl: string;
  repoCount: number;
  repoCountIncludesPrivate: boolean;
  followers: number;
  following: number;
  contributionsByYear: ContributionYear[];
  recentCommits: RecentCommit[];
};

export function getGitHubUsernameFromUrl(url?: string) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    if (!parsed.hostname.toLowerCase().includes("github.com")) return null;
    const username = parsed.pathname.split("/").filter(Boolean)[0];
    return username || null;
  } catch {
    return null;
  }
}

function getYearRange(count: number) {
  const currentYear = new Date().getUTCFullYear();
  return Array.from({ length: count }, (_, index) => currentYear - index);
}

function isoStartOfYear(year: number) {
  return `${year}-01-01T00:00:00Z`;
}

function isoEndOfYear(year: number) {
  return `${year}-12-31T23:59:59Z`;
}

async function fetchGraphQL<T>(query: string, variables: Record<string, unknown>, token: string): Promise<T | null> {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store"
  });

  if (!response.ok) return null;
  const payload = (await response.json()) as { data?: T; errors?: Array<{ message: string }> };
  if (!payload.data || payload.errors?.length) return null;
  return payload.data;
}

async function getViewerProfileFromGraphQL(token: string) {
  const years = getYearRange(5);
  const contributionFields = years
    .map((_, index) => {
      const alias = `y${index}`;
      return `${alias}: contributionsCollection(from: $from${index}, to: $to${index}) { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } } }`;
    })
    .join("\n");

  const variableDeclarations = years.map((_, index) => `$from${index}: DateTime!, $to${index}: DateTime!`).join(", ");
  const variables = years.reduce<Record<string, string>>((acc, year, index) => {
    acc[`from${index}`] = isoStartOfYear(year);
    acc[`to${index}`] = isoEndOfYear(year);
    return acc;
  }, {});

  const query = `
    query ViewerProfile(${variableDeclarations}) {
      viewer {
        login
        name
        bio
        avatarUrl
        url
        followers { totalCount }
        following { totalCount }
        repositories(ownerAffiliations: OWNER) { totalCount }
        repositoriesWithCommits: repositories(ownerAffiliations: OWNER, first: 100, orderBy: {field: PUSHED_AT, direction: DESC}) {
          nodes {
            nameWithOwner
            url
            isPrivate
            defaultBranchRef {
              target {
                ... on Commit {
                  history(first: 15) {
                    nodes {
                      committedDate
                      messageHeadline
                      url
                      author {
                        user {
                          login
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        ${contributionFields}
      }
    }
  `;

  type GraphQLData = {
    viewer: {
      login: string;
      name: string | null;
      bio: string | null;
      avatarUrl: string;
      url: string;
      followers: { totalCount: number };
      following: { totalCount: number };
      repositories: { totalCount: number };
      repositoriesWithCommits: {
        nodes: Array<{
          nameWithOwner: string;
          url: string;
          isPrivate: boolean;
          defaultBranchRef?: {
            target?: {
              history?: {
                nodes?: Array<{
                  committedDate: string;
                  messageHeadline: string;
                  url: string;
                  author?: {
                    user?: {
                      login?: string;
                    } | null;
                  } | null;
                }>;
              };
            };
          };
        } | null>;
      };
      [key: string]: unknown;
    };
  };

  const data = await fetchGraphQL<GraphQLData>(query, variables, token);
  if (!data) return null;

  const contributionsByYear = years.map((year, index) => {
    const alias = `y${index}`;
    const collection = data.viewer[alias] as
      | {
          contributionCalendar?: {
            totalContributions?: number;
            weeks?: Array<{
              contributionDays?: Array<{
                date?: string;
                contributionCount?: number;
              }>;
            }>;
          };
        }
      | undefined;

    const weeks = (collection?.contributionCalendar?.weeks || []).map((week) => ({
      days: (week.contributionDays || []).map((day) => ({
        date: day.date || "",
        count: day.contributionCount || 0
      }))
    }));

    return {
      year,
      total: collection?.contributionCalendar?.totalContributions || 0,
      weeks
    };
  });

  const recentCommits = (data.viewer.repositoriesWithCommits.nodes || [])
    .flatMap((repo) => {
      if (!repo) return [] as RecentCommit[];
      const commits = repo.defaultBranchRef?.target?.history?.nodes || [];
      return commits
        .filter((commit) => commit.author?.user?.login?.toLowerCase() === data.viewer.login.toLowerCase())
        .map((commit) => ({
          repoName: repo.nameWithOwner,
          repoUrl: repo.url,
          committedAt: commit.committedDate,
          message: commit.messageHeadline,
          commitUrl: commit.url,
          isPrivate: repo.isPrivate
        })) as RecentCommit[];
    })
    .sort((a, b) => (a.committedAt < b.committedAt ? 1 : -1))
    .slice(0, 120);

  return {
    username: data.viewer.login,
    name: data.viewer.name || data.viewer.login,
    bio: data.viewer.bio || undefined,
    avatarUrl: data.viewer.avatarUrl,
    profileUrl: data.viewer.url,
    repoCount: data.viewer.repositories.totalCount,
    repoCountIncludesPrivate: true,
    followers: data.viewer.followers.totalCount,
    following: data.viewer.following.totalCount,
    contributionsByYear,
    recentCommits
  } satisfies GitHubProfile;
}

export async function getGitHubProfile(username?: string | null): Promise<GitHubProfile | null> {
  if (!username) return null;

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    const viewer = await getViewerProfileFromGraphQL(token);
    if (viewer && viewer.username.toLowerCase() === username.toLowerCase()) {
      return viewer;
    }
  }

  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Accept: "application/vnd.github+json"
    },
    cache: "no-store"
  });

  if (!response.ok) return null;
  const data = (await response.json()) as GitHubUserResponse;

  return {
    username: data.login,
    name: data.name || data.login,
    bio: data.bio || undefined,
    avatarUrl: data.avatar_url,
    profileUrl: data.html_url,
    repoCount: data.public_repos,
    repoCountIncludesPrivate: false,
    followers: data.followers,
    following: data.following,
    contributionsByYear: [],
    recentCommits: []
  };
}
