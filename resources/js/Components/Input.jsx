// Componente Input
import { forwardRef } from "react";


export const Input = forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
    {...props}
  />
));
Input.displayName = "Input";
