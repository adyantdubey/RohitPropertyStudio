import type { SVGProps } from "react";

export type RksMarkProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  label?: string;
};

/**
 * A working RKS identity built from architectural datum lines. This is an
 * implementation mark for the site, not a final registered trademark.
 */
export function RksMark({ label, className, ...props }: RksMarkProps) {
  const classes = ["rks-mark", className].filter(Boolean).join(" ");

  return (
    <svg
      {...props}
      className={classes}
      viewBox="0 0 64 64"
      width="1em"
      height="1em"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <path
        className="rks-mark__datum"
        d="M6 17V6h11M47 6h11v11M58 47v11H47M17 58H6V47M6 51h52"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        opacity="0.38"
      />
      <path
        className="rks-mark__letters"
        d="M9 44V20h7c4.7 0 7 2.2 7 6s-2.3 6-7 6H9m7 0 8 12M29 20v24m13-24L29 33m13 11-9-14m24-7.5c-2.3-2.7-6.8-3.6-9.5-.9-2.9 2.9-.8 7 3.8 8.6 5 1.8 7.2 5.7 4.7 9.7-2.4 3.9-8.3 4.2-12 .4"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <circle
        className="rks-mark__point"
        cx="6"
        cy="51"
        r="2"
        fill="currentColor"
      />
    </svg>
  );
}
