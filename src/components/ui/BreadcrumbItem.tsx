import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  href?: string
  active?: boolean
  children: React.ReactNode
  className?: string
}

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ href, active, children, className, ...props }, ref) => {
    const content = (
      <span
        className={cn(
          "inline-flex items-center px-2 py-1.5 rounded-md transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
          "truncate max-w-[200px] mobile:max-w-[120px] tablet:max-w-[150px]",
          active
            ? "text-foreground font-semibold bg-accent/20 dark:bg-accent/10 cursor-default"
            : "text-muted-foreground hover:text-foreground hover:bg-accent/50 dark:hover:bg-accent/20 cursor-pointer",
          className
        )}
        aria-current={active ? "page" : undefined}
      >
        {children}
      </span>
    )

    return (
      <li ref={ref} className="flex items-center" {...props}>
        {href && !active ? (
          <Link href={href} className="block focus-visible:outline-none rounded-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1">
            {content}
          </Link>
        ) : (
          content
        )}
      </li>
    )
  }
)

BreadcrumbItem.displayName = "BreadcrumbItem"

export { BreadcrumbItem }

