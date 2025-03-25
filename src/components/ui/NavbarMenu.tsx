import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  href,
  icon,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  href: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}) => {
  return (
    <div 
      onMouseEnter={() => setActive(item)} 
      className="relative"
    >
      <Link
        to={href}
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
          active === item 
            ? "text-primary bg-primary/10" 
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        }`}
      >
        {icon}
        <span>{item}</span>
      </Link>
      
      {active !== null && active === item && children && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
          className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 z-50"
        >
          <motion.div
            transition={transition}
            layoutId="active" // layoutId ensures smooth animation
            className="bg-background/80 dark:bg-background/80 backdrop-blur-md rounded-xl overflow-hidden border border-border/30 dark:border-border/30 shadow-xl"
          >
            <motion.div
              layout // layout ensures smooth animation
              className="w-max h-full p-4"
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
  className,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className={`relative rounded-full border border-border/20 dark:border-border/20 bg-background/50 dark:bg-background/50 backdrop-blur-md flex items-center space-x-1 px-2 py-1 ${className || ""}`}
    >
      {children}
    </nav>
  );
};

export const MenuLink = ({ 
  children, 
  href,
  className, 
  onClick,
  ...rest 
}: { 
  children: React.ReactNode; 
  href: string;
  className?: string;
  onClick?: () => void;
  [key: string]: any; 
}) => {
  return (
    <Link
      to={href}
      className={`block text-foreground dark:text-foreground hover:text-primary dark:hover:text-primary px-3 py-2 rounded-lg hover:bg-muted/50 dark:hover:bg-muted/30 transition-colors ${className || ""}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Link>
  );
};

export const MenuDivider = ({ className }: { className?: string }) => {
  return (
    <div className={`h-px bg-border/50 my-2 ${className || ""}`}></div>
  );
};

export default { MenuItem, Menu, MenuLink, MenuDivider }; 