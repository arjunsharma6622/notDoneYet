import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi"; // Importing icons
import { cn } from "@/lib/utils"; // Utility for combining class names

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
}

const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, text, variant, size, asChild = false, ...props }, ref) => {
    const Component = asChild ? "span" : "button";

    const IconComponent = () => {
      switch (variant) {
        case "add":
          return <FiPlus className="cursor-pointer md:h-5 md:w-5 w-4 h-4 text-blue-600" />;
        case "edit":
          return <FiEdit2 className="cursor-pointer md:h-5 md:w-5 w-4 h-4 text-gray-600" />;
        case "delete":
          return <FiTrash2 className="cursor-pointer md:h-5 md:w-5 w-4 h-4 text-red-600" />;
        case "addLong":
          return (
            <div className="flex items-center gap-1">
              <FiPlus className="cursor-pointer md:h-5 md:w-5 h-4 w-4 text-blue-600" />
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
        <IconComponent />
      </Component>
    );
  },
);

IconButton.displayName = "Icon";

export { IconButton };
