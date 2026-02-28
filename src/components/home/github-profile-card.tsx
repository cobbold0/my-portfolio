"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { useTheme } from "next-themes";
import type { GitHubProfile } from "@/lib/github";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function getHeatStrength(count: number, maxCount: number) {
  if (count <= 0) return 0;
  return Math.min(1, count / Math.max(maxCount, 1));
}

export function GitHubProfileCard({ profile }: { profile: GitHubProfile }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  const heatCoreLow = isDark ? "hsl(191 100% 58% / 0.3)" : "hsl(210 100% 55% / 0.35)";
  const heatCoreMid = isDark ? "hsl(191 100% 58% / 0.7)" : "hsl(56 100% 52% / 0.85)";
  const heatCoreHigh = isDark ? "hsl(191 100% 58% / 1)" : "hsl(10 92% 54% / 0.95)";
  const heatBlobCore = isDark ? "hsl(191 100% 62% / 0.95)" : "hsl(16 95% 52% / 0.95)";
  const heatBlobMid = isDark ? "hsl(191 100% 58% / 0.45)" : "hsl(52 98% 50% / 0.55)";
  const heatBlobEdge = isDark ? "hsl(191 100% 58% / 0)" : "hsl(210 100% 55% / 0)";
  const heatBaseStart = isDark ? "hsl(191 100% 58% / 0.12)" : "hsl(210 100% 55% / 0.12)";
  const heatBaseMid = isDark ? "hsl(191 100% 58% / 0.05)" : "hsl(52 98% 50% / 0.08)";
  const heatBaseEnd = isDark ? "hsl(191 100% 58% / 0.14)" : "hsl(10 92% 54% / 0.12)";

  const years = useMemo(() => {
    const fromContributions = profile.contributionsByYear.map((item) => item.year);
    const fromCommits = profile.recentCommits.map((commit) => new Date(commit.committedAt).getUTCFullYear());
    return Array.from(new Set([...fromContributions, ...fromCommits])).sort((a, b) => b - a);
  }, [profile.contributionsByYear, profile.recentCommits]);
  const [selectedYear, setSelectedYear] = useState<number | null>(years[0] ?? null);
  const selectedContributionData = profile.contributionsByYear.find((item) => item.year === selectedYear);
  const selectedContributions = selectedContributionData?.total ?? 0;

  const weeklySeries = useMemo(() => {
    const weeks = selectedContributionData?.weeks || [];
    const values = weeks.map((week) => week.days.reduce((sum, day) => sum + day.count, 0));
    const maxWeekly = values.length > 0 ? Math.max(...values) : 0;
    return values.map((value, index) => ({
      index,
      value,
      strength: getHeatStrength(value, maxWeekly)
    }));
  }, [selectedContributionData]);

  const commitsForYear = useMemo(() => {
    if (!selectedYear) return [];
    return profile.recentCommits
      .filter((commit) => new Date(commit.committedAt).getUTCFullYear() === selectedYear)
      .slice(0, 3);
  }, [profile.recentCommits, selectedYear]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
        <img src={profile.avatarUrl} alt={`${profile.name} avatar`} width={64} height={64} className="h-16 w-16 rounded-full border" />
        <div>
          <CardTitle className="text-xl">{profile.name}</CardTitle>
          <p className="text-sm text-muted-foreground">@{profile.username}</p>
        </div>
      </CardHeader>
      <CardContent>
        {profile.bio ? <p className="text-sm text-muted-foreground">{profile.bio}</p> : null}
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary">
            {profile.repoCount} repos {profile.repoCountIncludesPrivate ? "(public + private)" : "(public only)"}
          </Badge>
          <Badge variant="secondary">{profile.followers} followers</Badge>
          <Badge variant="secondary">{profile.following} following</Badge>
        </div>

        {years.length > 0 ? (
          <div className="mt-6">
            <p className="text-sm font-medium">Contributions by year</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {years.map((year) => (
                <button key={year} type="button" onClick={() => setSelectedYear(year)}>
                  <Badge variant={selectedYear === year ? "default" : "secondary"}>{year}</Badge>
                </button>
              ))}
            </div>
            {selectedYear ? (
              <p className="mt-2 text-sm text-muted-foreground">
                {selectedContributions} contributions in {selectedYear}
              </p>
            ) : null}

            {selectedContributionData?.weeks?.length ? (
              <div className="mt-3 overflow-x-auto rounded-xl border bg-muted/20 p-4">
                <div className="min-w-[760px]">
                  <svg viewBox={`0 0 ${weeklySeries.length * 14 + 56} 160`} className="h-auto w-full">
                    <defs>
                      <filter id="signature-blur" x="-70%" y="-70%" width="240%" height="240%">
                        <feGaussianBlur stdDeviation="10" />
                      </filter>
                      <radialGradient id="heat-blob" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor={heatBlobCore} />
                        <stop offset="55%" stopColor={heatBlobMid} />
                        <stop offset="100%" stopColor={heatBlobEdge} />
                      </radialGradient>
                      <linearGradient id="heat-base" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={heatBaseStart} />
                        <stop offset="50%" stopColor={heatBaseMid} />
                        <stop offset="100%" stopColor={heatBaseEnd} />
                      </linearGradient>
                      <linearGradient id="heat-legend" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={heatCoreLow} />
                        <stop offset="55%" stopColor={heatCoreMid} />
                        <stop offset="100%" stopColor={heatCoreHigh} />
                      </linearGradient>
                    </defs>

                    <rect x="0" y="0" width="100%" height="100%" rx="10" fill="hsl(var(--background) / 0.3)" />
                    <rect x="6" y="6" width="98%" height="148" rx="8" fill="url(#heat-base)" />
                    {weeklySeries.map((item) => {
                      if (item.value <= 0) return null;
                      const x = 22 + item.index * 14;
                      const primaryY = 98 - item.strength * 46 + Math.sin(item.index * 0.28) * 10;
                      const secondaryY = 120 - item.strength * 26 + Math.cos(item.index * 0.34) * 10;
                      const primaryR = 10 + item.strength * 28;
                      const secondaryR = 6 + item.strength * 16;
                      return (
                        <g key={`hot-${item.index}`}>
                          <circle cx={x} cy={primaryY} r={primaryR} fill="url(#heat-blob)" filter="url(#signature-blur)" />
                          <circle cx={x + 2} cy={secondaryY} r={secondaryR} fill="url(#heat-blob)" filter="url(#signature-blur)" opacity="0.7" />
                        </g>
                      );
                    })}
                  </svg>
                </div>

                <div className="mt-3 flex items-center justify-end gap-2 text-xs text-muted-foreground">
                  <span>Cool</span>
                  <span className="h-2 w-28 rounded-full" style={{ background: `linear-gradient(90deg, ${heatCoreLow}, ${heatCoreMid}, ${heatCoreHigh})` }} />
                  <span>Hot</span>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {commitsForYear.length > 0 ? (
          <div className="mt-6">
            <p className="text-sm font-medium">Recent commits{selectedYear ? ` (${selectedYear})` : ""}</p>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              {commitsForYear.map((commit) => (
                <li key={`${commit.repoName}-${commit.committedAt}`} className="rounded-md border bg-muted/40 p-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={commit.repoUrl} target="_blank" rel="noreferrer" className="font-medium text-foreground hover:underline">
                      {commit.repoName}
                    </Link>
                    {commit.isPrivate ? <Badge variant="secondary">Private</Badge> : null}
                  </div>
                  <p className="mt-1">{commit.message}</p>
                  <p className="mt-1 text-xs">
                    {new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(new Date(commit.committedAt))}{" "}
                    <Link href={commit.commitUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                      View commit
                    </Link>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : selectedYear ? (
          <p className="mt-6 text-sm text-muted-foreground">No commits found for {selectedYear} in the loaded activity window.</p>
        ) : null}

        <Link href={profile.profileUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
          View GitHub profile <ExternalLink className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
