import React from "react";
import Squares from "./squares";
import { useTheme } from "@/components/ThemeProvider";

interface BackgroundWrapperProps {
  children: React.ReactNode;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
  const { theme } = useTheme();

  // Adjust colors based on theme
  const borderColor =
    theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
  const hoverFillColor =
    theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background animation */}
      <div className="fixed inset-0 z-0 opacity-20">
        <Squares
          direction="diagonal"
          speed={0.5}
          squareSize={80}
          borderColor={borderColor}
          hoverFillColor={hoverFillColor}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BackgroundWrapper;
