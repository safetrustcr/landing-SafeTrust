"use client";

import * as React from "react";
import Link from "next/link";
import { ExternalLink as ExternalIcon } from "lucide-react";
import { isExternalLink } from "../../utils/link-helpers";

export type IconPosition = "end" | "start";

export interface ExternalLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  openInNewTab?: boolean;
  showIcon?: boolean;
  iconPosition?: IconPosition;
  iconClassName?: string;
  className?: string;
}

export function ExternalLink({
  href,
  children,
  openInNewTab = true,
  showIcon = true,
  iconPosition = "end",
  iconClassName = "ml-2 inline-block h-4 w-4",
  className = "text-primary hover:underline transition-colors",
  ...rest
}: ExternalLinkProps) {
  const external = isExternalLink(href);

  const shouldOpenInNewTab = external && openInNewTab;
  const rel = shouldOpenInNewTab
    ? `${rest.rel ? rest.rel + " " : ""}noopener noreferrer`
    : rest.rel;

  const icon =
    showIcon && external ? (
      <ExternalIcon className={iconClassName} aria-hidden />
    ) : null;

  const srText = shouldOpenInNewTab ? (
    <span className="sr-only">(opens in new tab)</span>
  ) : null;

  const isInternal =
    !external &&
    (href.startsWith("/") ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:"));

  const content = (
    <>
      {iconPosition === "start" && icon}
      <span className="align-middle">{children}</span>
      {iconPosition === "end" && icon}
      {srText}
    </>
  );

  const anchorProps = {
    href,
    className,
    target: shouldOpenInNewTab ? "_blank" : rest.target,
    rel,
    ...rest,
  } as React.AnchorHTMLAttributes<HTMLAnchorElement>;

  if (isInternal) {
    // Render Next.js Link for internal navigations, but keep anchor props
    return (
      <Link href={href} legacyBehavior>
        <a {...anchorProps}>{content}</a>
      </Link>
    );
  }

  return <a {...anchorProps}>{content}</a>;
}

export default ExternalLink;
