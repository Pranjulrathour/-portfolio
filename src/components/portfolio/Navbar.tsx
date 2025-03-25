import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Menu as MenuIcon, 
  X, 
  Code, 
  User as UserIcon, 
  Award, 
  Home, 
  Mail, 
  ShieldCheck,
  Github,
  Laptop,
  BookOpen,
  Settings,
  LogOut,
  LogIn
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/supabase/auth-context";
import { Menu, MenuItem, MenuLink, MenuDivider } from "@/components/ui/NavbarMenu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to home page after logout
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { 
      name: "Home", 
      href: "/", 
      icon: <Home className="h-4 w-4" />,
      dropdown: null
    },
    { 
      name: "Projects", 
      href: "/projects", 
      icon: <Code className="h-4 w-4" />,
      dropdown: (
        <div className="min-w-[200px]">
          <div className="mb-2 pb-1 border-b border-border/30">
            <h3 className="text-sm font-medium text-muted-foreground">Projects</h3>
          </div>
          <div className="flex flex-col gap-1">
            <MenuLink href="/projects/web-development">
              <div className="flex items-center gap-2">
                <Laptop className="h-4 w-4 text-primary" />
                <span>Web Development</span>
              </div>
            </MenuLink>
            <MenuLink href="/projects/mobile-apps">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <span>Mobile Applications</span>
              </div>
            </MenuLink>
            <MenuLink href="/projects">
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-primary" />
                <span>All Projects</span>
              </div>
            </MenuLink>
          </div>
        </div>
      )
    },
    {
      name: "Achievements",
      href: "/achievements",
      icon: <Award className="h-4 w-4" />,
      dropdown: (
        <div className="min-w-[200px]">
          <div className="mb-2 pb-1 border-b border-border/30">
            <h3 className="text-sm font-medium text-muted-foreground">My Achievements</h3>
          </div>
          <div className="flex flex-col gap-1">
            <MenuLink href="/achievements/awards">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                <span>Awards & Honors</span>
              </div>
            </MenuLink>
            <MenuLink href="/achievements/certifications">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <span>Certifications</span>
              </div>
            </MenuLink>
            <MenuLink href="/achievements">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                <span>All Achievements</span>
              </div>
            </MenuLink>
          </div>
        </div>
      )
    },
    { 
      name: "About", 
      href: "/about", 
      icon: <UserIcon className="h-4 w-4" />,
      dropdown: null
    },
    { 
      name: "Contact", 
      href: "/contact", 
      icon: <Mail className="h-4 w-4" />,
      dropdown: null
    },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "py-3"
          : "py-5",
        "bg-background/60 backdrop-blur-md border-b border-border/40"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            src="https://raw.githubusercontent.com/Pranjulrathour/-portfolio/refs/heads/main/public/Red%20%26%20White%20Corporate%20Application%20Letter%20(YouTube%20Thumbnail).png"
            alt="Pranjul Rathour Logo"
            className="h-10"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          <Menu setActive={setActiveItem}>
            {navLinks.map((link) => (
              <MenuItem
                key={link.name}
                setActive={setActiveItem}
                active={activeItem}
                item={link.name}
                href={link.href}
                icon={link.icon}
              >
                {link.dropdown}
              </MenuItem>
            ))}

            <div className="h-6 w-px bg-border/50 mx-1"></div>

            {user ? (
              <>
                {isAdmin && (
                  <MenuItem
                    setActive={setActiveItem}
                    active={activeItem}
                    item="Admin"
                    href="/admin"
                    icon={<ShieldCheck className="h-4 w-4" />}
                  >
                    <div className="min-w-[200px]">
                      <div className="mb-2 pb-1 border-b border-border/30">
                        <h3 className="text-sm font-medium text-muted-foreground">Admin Panel</h3>
                      </div>
                      <div className="flex flex-col gap-1">
                        <MenuLink href="/admin">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-primary" />
                            <span>Dashboard</span>
                          </div>
                        </MenuLink>
                        <MenuLink href="/admin/projects">
                          <div className="flex items-center gap-2">
                            <Code className="h-4 w-4 text-primary" />
                            <span>Manage Projects</span>
                          </div>
                        </MenuLink>
                        <MenuLink href="/admin/achievements">
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-primary" />
                            <span>Manage Achievements</span>
                          </div>
                        </MenuLink>
                        <MenuDivider />
                        <MenuLink href="/" onClick={handleSignOut}>
                          <div className="flex items-center gap-2">
                            <LogOut className="h-4 w-4 text-red-500" />
                            <span className="text-red-500">Logout</span>
                          </div>
                        </MenuLink>
                      </div>
                    </div>
                  </MenuItem>
                )}
                {!isAdmin && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="rounded-full" 
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                )}
              </>
            ) : (
              <Link to="/login">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-full hover:bg-primary/10 hover:text-primary"
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Login
                </Button>
              </Link>
            )}
            <ThemeToggle />
          </Menu>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="text-foreground p-2 rounded-full hover:bg-muted/70 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md absolute top-full left-0 right-0 shadow-md py-4 px-4 border-b animate-fade-in">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            
            <MenuDivider />
            
            {user ? (
              <div className="flex flex-col gap-2">
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full flex justify-center gap-2">
                      <ShieldCheck className="h-4 w-4" />
                      Admin Dashboard
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full flex justify-center gap-2">
                  <LogIn className="h-4 w-4" />
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
