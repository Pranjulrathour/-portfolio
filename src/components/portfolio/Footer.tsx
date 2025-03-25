import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SocialIcons from "@/components/ui/SocialIcons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-muted/30 border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link to="/" className="mb-4 inline-block">
              <img
                src="https://raw.githubusercontent.com/Pranjulrathour/-portfolio/refs/heads/main/public/Red%20%26%20White%20Corporate%20Application%20Letter%20(YouTube%20Thumbnail).png"
                alt="Pranjul Rathour Logo"
                className="h-12"
              />
            </Link>
            <p className="text-muted-foreground mt-2 max-w-xs">
              Creating beautiful, functional websites and applications with a
              focus on user experience.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <SocialIcons />
            <div className="mt-4">
              <Button variant="outline" className="mt-2" asChild>
                <a href="mailto:pranjulrathour41@gmail.com">
                  pranjulrathour41@gmail.com
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Pranjul Rathour. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link
              to="/privacy"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
