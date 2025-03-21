import * as React from "react";
import { cn } from "@/lib/utils/TwMerge";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-9 w-full rounded-md border border-orange-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors",
                    "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-orange-600",
                    "placeholder:text-orange-400/70",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500",
                    "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
);

Input.displayName = "Input";

export { Input };