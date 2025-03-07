import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Sparkles, Code, User as UserIcon, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status on component mount and when localStorage changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const storedUser = localStorage.getItem("user");
      setIsLoggedIn(!!storedUser);
    };

    // Initial check
    checkLoginStatus();

    // Set up event listener for storage changes
    window.addEventListener("storage", checkLoginStatus);

    // Custom event for login status changes within the app
    window.addEventListener("loginStatusChanged", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener("loginStatusChanged", checkLoginStatus);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("loginStatusChanged"));

    // Redirect to home page after logout
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: <Sparkles className="h-4 w-4" /> },
    { name: "Projects", href: "/projects", icon: <Code className="h-4 w-4" /> },
    { name: "About", href: "/about", icon: <UserIcon className="h-4 w-4" /> },
    { name: "Contact", href: "/contact", icon: <Send className="h-4 w-4" /> },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm py-3 border-b"
          : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"
        >
          Pranjul Rathour
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link to="/admin">
                <Button variant="default" size="sm">
                  Admin
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
          )}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="text-foreground p-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md absolute top-full left-0 right-0 shadow-md py-4 px-4 border-b">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            {isLoggedIn ? (
              <div className="flex flex-col gap-2">
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="default" size="sm" className="w-full">
                    Admin
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
