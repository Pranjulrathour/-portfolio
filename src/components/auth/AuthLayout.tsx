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
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                Pranjul Rathour
              </h1>
            </Link>
            <p className="text-muted-foreground mt-2">Portfolio Admin Access</p>
          </div>
          {children}
        </div>
      </div>
    </BackgroundWrapper>
  );
}
