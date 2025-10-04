import * as React from "react"
import { cn } from "@/lib/utils"

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  separator?: React.ReactNode
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    { separator = "/", className, children, ...props }: BreadcrumbProps,
    ref: React.Ref<HTMLElement>
  ) => {
    const childArray = React.Children.toArray(children)

    return (
      <nav ref={ref} aria-label="breadcrumb" className={cn("flex", className)} {...props}>
        <ol className="flex items-center gap-1 text-sm">
          {childArray.map((child: React.ReactNode, index: number) => (
            <React.Fragment key={index}>
              {child}
              {index < childArray.length - 1 && (
                <li className="text-muted-foreground flex items-center" aria-hidden="true">
                  {separator}
                </li>
              )}
            </React.Fragment>
          ))}
        </ol>
      </nav>
    )
  }
)

Breadcrumb.displayName = "Breadcrumb"

export { Breadcrumb }
