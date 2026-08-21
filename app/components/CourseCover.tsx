type CourseCoverProps = {
  variant: "system" | "field" | "room";
  title: string;
  eyebrow?: string;
  className?: string;
};

export function CourseCover({
  variant,
  title,
  eyebrow = "ROHIT / PROPERTY DECISION STUDIO",
  className = "",
}: CourseCoverProps) {
  return (
    <div className={`course-cover cover-${variant} ${className}`}>
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
        <span>PREVIEW EDITION</span>
        <span>ED. 01</span>
      </div>
    </div>
  );
}
