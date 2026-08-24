import { gradeOf } from "../../lib/datalab/grade";
import registry from "../../lib/datalab/projects.json";

type Project = (typeof registry.projects)[number];

/** The Record Grade dial — record completeness, never buy/don't-buy advice. */
export function GradeDial({ project, size = 116 }: { project: Project; size?: number }) {
  const { earned, possible, grade, provisional } = gradeOf(project);
  const r = 46;
  const c = 2 * Math.PI * r;
  const frac = earned / possible;

  return (
    <div className="gdial">
      <svg viewBox="0 0 120 120" width={size} height={size} role="img"
        aria-label={`Record grade ${grade}${provisional ? " provisional" : ""}, ${earned} of ${possible} points`}>
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--line)" strokeWidth="7" />
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--gold)" strokeWidth="7"
          strokeDasharray={`${(c * frac).toFixed(1)} ${c.toFixed(1)}`} strokeLinecap="round"
          transform="rotate(-90 60 60)" />
        <text x="60" y="58" textAnchor="middle" className="gdial__grade">{grade}</text>
        <text x="60" y="77" textAnchor="middle" className="gdial__pts">{earned}/{possible}</text>
      </svg>
      <div className="gdial__side">
        <strong>Record Grade{provisional ? " · provisional" : ""}</strong>
        <p>
          Grades how complete and clean the public record is — a fixed formula, never advice.
          {provisional && " The remaining checks (complaints, ownership trail, approvals) are completed in the full verified report."}
        </p>
      </div>
    </div>
  );
}
