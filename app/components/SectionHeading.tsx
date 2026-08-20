import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  body?: string;
  align?: "left" | "split";
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "split",
  light = false,
}: SectionHeadingProps) {
  return (
    <header
      className={`section-heading section-heading-${align}${
        light ? " section-heading-light" : ""
      }`}
    >
      <p className={`eyebrow${light ? " eyebrow-light" : ""}`}>{eyebrow}</p>
      <h2>{title}</h2>
      {body ? <p className="section-heading-body">{body}</p> : null}
    </header>
  );
}
