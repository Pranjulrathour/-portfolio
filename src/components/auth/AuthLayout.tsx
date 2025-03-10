import { ReactNode } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import BackgroundWrapper from "@/components/ui/background-wrapper";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <BackgroundWrapper>
      <div className="min-h-screen flex items-center justify-center bg-background bg-opacity-70">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div className="max-w-md w-full px-4">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <img 
                src="https://raw.githubusercontent.com/Pranjulrathour/-portfolio/refs/heads/main/public/Red%20%26%20White%20Corporate%20Application%20Letter%20(YouTube%20Thumbnail).png" 
                alt="Portfolio Logo" 
                className="mx-auto w-40 h-auto"
              />
            </Link>
            <p className="text-muted-foreground mt-2">Portfolio Admin Access</p>
          </div>
          {children}
        </div>
      </div>
    </BackgroundWrapper>
  );
}
