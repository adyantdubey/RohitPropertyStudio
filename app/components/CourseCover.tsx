type CourseCoverProps = {
  variant: "system" | "field" | "room";
  title: string;
  eyebrow?: string;
  status?: "Launch list open" | "Coming soon" | "On the roadmap";
  className?: string;
};

export function CourseCover({
  variant,
  title,
  eyebrow = "ROHITT KUMAR SINGH / PROPERTY ACADEMY",
  status = "On the roadmap",
  className = "",
}: CourseCoverProps) {
  return (
    <div
      className={`course-cover authority-academy-cover cover-${variant} ${className}`}
    >
      <div className="cover-grid" aria-hidden="true" />
      <span className="cover-code">R/{variant.slice(0, 2).toUpperCase()}–01</span>
      <div className="cover-orbit" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="cover-title">
        <small>{eyebrow}</small>
        <strong>{title}</strong>
      </div>
      <span className="cover-mark">R</span>
      <div className="cover-foot">
        <span>{status.toUpperCase()}</span>
        <span>100 YARDS</span>
      </div>
    </div>
  );
}
