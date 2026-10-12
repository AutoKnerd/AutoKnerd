"use client";

import { track } from "@vercel/analytics";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type TrackedLinkProps = {
  href: string;
  /** Event name shown in Vercel Analytics → Events (e.g. "Book Call"). */
  event: string;
  /** Where on the page the button lives (e.g. "hero", "nav", "final-cta"). */
  location: string;
  className?: string;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function TrackedLink({
  href,
  event,
  location,
  className,
  children,
  ...rest
}: TrackedLinkProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => track(event, { location })}
      {...rest}
    >
      {children}
    </a>
  );
}
