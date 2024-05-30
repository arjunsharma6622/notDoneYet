import * as React from "react";

import { cn } from "@/lib/utils";
import { FiAlertCircle, FiInfo } from "react-icons/fi";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type, ...props }, ref) => {
    return (
      <>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:!ring-transparent",
            className,
            error && "border-red-500 "
          )}
          ref={ref}
          {...props}
        />
        {error && <div className="flex items-center gap-1 mt-1"><span className="text-xs  text-red-500">{error}</span></div>}
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
