import * as React from "react"
import { cn } from "@/lib/utils"

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  separator?: React.ReactNode
  maxItems?: number
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      separator = "/",
      maxItems,
      className,
      children,
      ...props
    }: BreadcrumbProps,
    ref: React.Ref<HTMLElement>
  ) => {
    const childArray = React.Children.toArray(children)
    const [isCollapsed, setIsCollapsed] = React.useState(false)

    let displayChildren = childArray
    if (maxItems && childArray.length > maxItems) {
      displayChildren = [
        childArray[0],
        <React.Fragment key="collapsed" />,
        ...childArray.slice(-Math.max(1, maxItems - 1)),
      ]
    }

    return (
      <nav
        ref={ref}
        aria-label="breadcrumb"
        className={cn(
          "flex items-center overflow-x-auto",
          "mobile:text-xs tablet:text-sm",
          className
        )}
        {...props}
      >
        <ol
          className={cn(
            "flex items-center gap-1",
            "mobile:gap-0.5 tablet:gap-1.5",
            "flex-wrap"
          )}
        >
          {displayChildren.map((child: React.ReactNode, index: number) => {
            const isCollapseIndicator =
              React.isValidElement(child) &&
              child.key === "collapsed"

            return (
              <React.Fragment key={index}>
                {isCollapseIndicator ? (
                  <>
                    <li
                      className={cn(
                        "text-muted-foreground flex items-center",
                        "px-1 mobile:px-0.5"
                      )}
                      aria-hidden="true"
                    >
                      {separator}
                    </li>
                    <li
                      className={cn(
                        "text-muted-foreground flex items-center cursor-pointer",
                        "hover:text-foreground transition-colors",
                        "px-1 mobile:px-0.5"
                      )}
                      aria-label="expand breadcrumb"
                      role="button"
                      tabIndex={0}
                      onClick={() => setIsCollapsed(!isCollapsed)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setIsCollapsed(!isCollapsed)
                        }
                      }}
                    >
                      <span className="mobile:hidden">...</span>
                      <span className="mobile:block hidden">•••</span>
                    </li>
                    {!isCollapsed && (
                      <li
                        className={cn(
                          "text-muted-foreground flex items-center",
                          "px-1 mobile:px-0.5"
                        )}
                        aria-hidden="true"
                      >
                        {separator}
                      </li>
                    )}
                  </>
                ) : (
                  <>
                    {child}
                    {index < displayChildren.length - 1 &&
                      (!isCollapseIndicator ||
                        React.isValidElement(displayChildren[index + 1])) && (
                        <li
                          className={cn(
                            "text-muted-foreground flex items-center",
                            "px-1 mobile:px-0.5"
                          )}
                          aria-hidden="true"
                        >
                          {separator}
                        </li>
                      )}
                  </>
                )}
              </React.Fragment>
            )
          })}
        </ol>
      </nav>
    )
  }
)

Breadcrumb.displayName = "Breadcrumb"

export { Breadcrumb }
