import { cn } from "@/lib/utils"; // Utility for combining class names
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import * as React from "react";

const iconVariants = cva("flex items-center justify-center px-5 py-2 rounded-full font- text-sm", {
    variants: {
        variant: {
            save: `bg-blue-600 text-white hover:bg-blue-500`,
            cancel: `bg-red-600 text-white hover:bg-red-500`,
        },
        size: {
            default: "",
        },
    },
    defaultVariants: {
        variant: "save",
        size: "default",
    },
});

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconVariants> {
    asChild?: boolean;
    text?: string;
    isLoading?: boolean;
}

const FormButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, text, variant, size, isLoading = false, asChild = false, ...props }, ref) => {
        const Component = asChild ? "span" : "button";

        return (
            <Component
                ref={ref}
                className={cn(iconVariants({ variant, size }), className, `${isLoading ? "cursor-not-allowed" : ""}`)}
                disabled={isLoading}
                {...props}
            >
                {variant === "save" ? (isLoading ? "Saving..." : "Save") : variant === "cancel" ? "Cancel" : text}

                {isLoading && (
                    <LoaderCircle strokeWidth={1.7} className="ml-2 animate-spin md:h-5 md:w-5 w-4 h-4" />
                )}
            </Component>
        );
    },
);

FormButton.displayName = "Icon";

export { FormButton };
