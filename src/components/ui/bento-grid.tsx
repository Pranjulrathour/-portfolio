import { cn } from "@/lib/utils";
import React from "react";

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const BentoGrid = ({
  className,
  children,
  ...props
}: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[15rem] auto-rows-[20rem]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface BentoGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  children,
  ...props
}: BentoGridItemProps) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-300 shadow-input dark:shadow-none p-0 dark:bg-black dark:border-white/[0.2] bg-white border border-neutral-200 relative overflow-hidden cursor-pointer",
        className
      )}
      {...props}
    >
      {header && (
        <div className="relative z-10 w-full h-full">
          {header}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-90 transition-opacity group-hover/bento:opacity-100"></div>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 transform translate-y-0 group-hover/bento:translate-y-0 transition-transform">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-white line-clamp-1 mb-1">
            {title}
          </div>
          {icon && (
            <span className="bg-primary/90 p-1.5 rounded-full text-white">
              {icon}
            </span>
          )}
        </div>
        {description && (
          <div className="text-white/80 text-sm line-clamp-2 group-hover/bento:line-clamp-none transition-all">
            {description}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}; 