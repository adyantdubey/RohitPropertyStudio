import registry from "./projects.json";

/**
 * The Record Grade — a published formula over verifiable public-record checks.
 * It grades record completeness and cleanliness ONLY; it is never buy/don't-buy
 * advice. Keep in sync with scripts/report/make-report.mjs (the printed report
 * uses the same checks and bands).
 */

type Project = (typeof registry.projects)[number];

export type GradeCheck = {
  label: string;
  max: number;
  /** null = only completed in a commissioned report */
  earned: number | null;
};

const promoterCounts = registry.projects.reduce<Record<string, number>>((acc, p) => {
  acc[p.promoter] = (acc[p.promoter] || 0) + 1;
  return acc;
}, {});

export function gradeChecks(project: Project): GradeCheck[] {
  return [
    { label: "Found on the K-RERA public register", max: 25, earned: 25 },
    { label: "Full registration number verified", max: 10, earned: project.reraComplete ? 10 : null },
    {
      label: "Register status", max: 15,
      earned: ["Active", "New launch", "Completed"].includes(project.status) ? 15 : project.status === "Applied" ? 5 : 0,
    },
    { label: "Builder's registered footprint", max: 10, earned: Math.min(promoterCounts[project.promoter] || 1, 10) },
    { label: "No unresolved complaints found", max: 15, earned: null },
    { label: "Encumbrance trail reviewed clean", max: 15, earned: null },
    { label: "Approvals on the filing verified", max: 10, earned: null },
  ];
}

export function gradeOf(project: Project) {
  const checks = gradeChecks(project);
  const earned = checks.reduce((a, c) => a + (c.earned ?? 0), 0);
  const possible = checks.reduce((a, c) => a + c.max, 0);
  const pct = Math.round((earned / possible) * 100);
  const grade = pct >= 85 ? "A" : pct >= 70 ? "B" : pct >= 55 ? "C" : pct >= 40 ? "D" : "E";
  const provisional = checks.some((c) => c.earned === null);
  return { checks, earned, possible, pct, grade, provisional };
}
