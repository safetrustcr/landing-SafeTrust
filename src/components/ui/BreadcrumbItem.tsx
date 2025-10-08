import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface BreadcrumbItemProps {
  href?: string
  active?: boolean
  children: React.ReactNode
}

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ href, active, children, className, ...props }, ref) => {
    const content = (
      <span
        className={cn(
          "flex items-center px-1 py-0.5 rounded transition-colors truncate max-w-[200px]",
          active
            ? "text-foreground font-medium"
            : "text-muted-foreground hover:text-foreground hover:bg-accent",
          className
        )}
        aria-current={active ? "page" : undefined}
      >
        {children}
      </span>
    )

    return (
      <li ref={ref} {...props}>
        {href ? (
          <Link href={href} className="block">
            {content}
          </Link>
        ) : (
          content
        )}
      </li>
    )
  }
)

