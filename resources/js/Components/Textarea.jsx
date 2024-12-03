import { forwardRef } from "react";


export const Textarea = forwardRef(({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
      {...props}
    />
  ));
  Textarea.displayName = "Textarea";