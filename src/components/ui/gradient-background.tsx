import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

interface GradientBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

const GradientBackground = ({
  children,
  className = "",
}: GradientBackgroundProps) => {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);
  const [isSafari, setIsSafari] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setCurX((prev) => prev + (tgX - prev) / 20);
      setCurY((prev) => prev + (tgY - prev) / 20);

      if (interactiveRef.current) {
        interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      }
    }, 1000 / 60);

    return () => clearInterval(moveInterval);
  }, [curX, curY, tgX, tgY]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  return (
    <div className={`h-full w-full relative overflow-hidden ${className}`}>
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div
        className={`gradients-container h-full w-full blur-lg ${isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"}`}
      >
        {theme === "dark" ? (
          // Dark theme gradients
          <>
            <div className="absolute [background:radial-gradient(circle_at_center,_rgba(18,113,255,0.5)_0,_rgba(18,113,255,0)_50%)_no-repeat] [mix-blend-mode:hard-light] w-[80%] h-[80%] top-[calc(50%-40%)] left-[calc(50%-40%)] [transform-origin:center_center] animate-first opacity-100" />
            <div className="absolute [background:radial-gradient(circle_at_center,_rgba(221,74,255,0.5)_0,_rgba(221,74,255,0)_50%)_no-repeat] [mix-blend-mode:hard-light] w-[80%] h-[80%] top-[calc(50%-40%)] left-[calc(50%-40%)] [transform-origin:calc(50%-400px)] animate-second opacity-100" />
            <div className="absolute [background:radial-gradient(circle_at_center,_rgba(100,220,255,0.5)_0,_rgba(100,220,255,0)_50%)_no-repeat] [mix-blend-mode:hard-light] w-[80%] h-[80%] top-[calc(50%-40%)] left-[calc(50%-40%)] [transform-origin:calc(50%+400px)] animate-third opacity-100" />
            <div className="absolute [background:radial-gradient(circle_at_center,_rgba(140,100,255,0.5)_0,_rgba(140,100,255,0)_50%)_no-repeat] [mix-blend-mode:hard-light] w-[80%] h-[80%] top-[calc(50%-40%)] left-[calc(50%-40%)] [transform-origin:calc(50%-200px)] animate-fourth opacity-70" />
          </>
        ) : (
          // Light theme gradients
          <>
            <div className="absolute [background:radial-gradient(circle_at_center,_rgba(18,113,255,0.3)_0,_rgba(18,113,255,0)_50%)_no-repeat] [mix-blend-mode:multiply] w-[80%] h-[80%] top-[calc(50%-40%)] left-[calc(50%-40%)] [transform-origin:center_center] animate-first opacity-100" />
            <div className="absolute [background:radial-gradient(circle_at_center,_rgba(221,74,255,0.3)_0,_rgba(221,74,255,0)_50%)_no-repeat] [mix-blend-mode:multiply] w-[80%] h-[80%] top-[calc(50%-40%)] left-[calc(50%-40%)] [transform-origin:calc(50%-400px)] animate-second opacity-100" />
            <div className="absolute [background:radial-gradient(circle_at_center,_rgba(100,220,255,0.3)_0,_rgba(100,220,255,0)_50%)_no-repeat] [mix-blend-mode:multiply] w-[80%] h-[80%] top-[calc(50%-40%)] left-[calc(50%-40%)] [transform-origin:calc(50%+400px)] animate-third opacity-100" />
            <div className="absolute [background:radial-gradient(circle_at_center,_rgba(140,100,255,0.3)_0,_rgba(140,100,255,0)_50%)_no-repeat] [mix-blend-mode:multiply] w-[80%] h-[80%] top-[calc(50%-40%)] left-[calc(50%-40%)] [transform-origin:calc(50%-200px)] animate-fourth opacity-70" />
          </>
        )}

        <div
          ref={interactiveRef}
          onMouseMove={handleMouseMove}
          className={`absolute [background:radial-gradient(circle_at_center,_${theme === "dark" ? "rgba(140,100,255,0.6)" : "rgba(140,100,255,0.3)"}_0,_rgba(140,100,255,0)_50%)_no-repeat] ${theme === "dark" ? "[mix-blend-mode:hard-light]" : "[mix-blend-mode:multiply]"} w-full h-full -top-1/2 -left-1/2 opacity-70`}
        />
      </div>

      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
};

export default GradientBackground;
