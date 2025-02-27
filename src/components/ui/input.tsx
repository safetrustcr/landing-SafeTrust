import * as React from "react"

 const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
   ({ className, ...props }, ref) => {
     return (
       <input
         className={className}
         ref={ref}
         {...props}
       />
     )
   }
 )
 Input.displayName = "Input"

 export { Input }