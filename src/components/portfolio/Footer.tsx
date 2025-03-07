import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com" },
    { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com" },
    { icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com" },
  ];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-gradient-to-r from-slate-100 to-slate-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight mb-4 inline-block"
            >
              Portfolio
            </Link>
            <p className="text-gray-600 mt-2 max-w-xs">
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
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <p className="text-gray-600">Email: contact@example.com</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} Portfolio. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link
              to="/privacy"
              className="text-gray-600 hover:text-black text-sm transition-colors mr-4"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-600 hover:text-black text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
