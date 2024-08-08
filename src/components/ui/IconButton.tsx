import { cn } from "@/lib/utils"; // Utility for combining class names
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle, PencilLine, Plus, Trash2 } from "lucide-react";
import * as React from "react";
import { FiPlus } from "react-icons/fi"; // Importing icons

const iconVariants = cva("flex items-center justify-center p-2 rounded-full", {
  variants: {
    variant: {
      add: "bg-blue-100 text-blue-600 hover:bg-blue-200",
      edit: "bg-gray-100 text-gray-600 hover:bg-gray-200",
      delete: "bg-red-100 text-red-600 hover:bg-red-200",
      addLong: "bg-blue-100 text-blue-600 hover:bg-blue-200 p-1 px-3",
    },
    size: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "add",
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

const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, text, variant, size, isLoading = false, asChild = false, ...props }, ref) => {
    const Component = asChild ? "span" : "button";

    const IconComponent = () => {
      switch (variant) {
        case "add":
          return <Plus strokeWidth={1.7} className="cursor-pointer md:h-5 md:w-5 w-4 h-4 text-blue-600" />;
        case "edit":
          return <PencilLine strokeWidth={1.7} className="cursor-pointer md:h-5 md:w-5 w-4 h-4 text-gray-600" />;
        case "delete":
          return <Trash2 strokeWidth={1.7} className="cursor-pointer md:h-5 md:w-5 w-4 h-4 text-red-600" />;
        case "addLong":
          return (
            <div className="flex items-center gap-1">
              <Plus strokeWidth={1.7} className="cursor-pointer md:h-5 md:w-5 h-4 w-4 text-blue-600" />
              <span className="text-xs md:text-sm">{text}</span>
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <Component
        ref={ref}
        className={cn(iconVariants({ variant, size }), className)}
        {...props}
      >
        {isLoading ?
          <LoaderCircle strokeWidth={1.7} className="animate-spin md:h-5 md:w-5 w-4 h-4" />
          :
          <IconComponent />
        }
      </Component>
    );
  },
);

IconButton.displayName = "Icon";

export { IconButton };
