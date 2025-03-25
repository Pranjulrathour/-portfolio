import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Style for keyframes animation
const animationStyles = `
  :root {
    --primary: hsl(262.1, 83.3%, 57.8%);
    --primary-light: hsl(262.1, 83.3%, 70%);
  }

  @keyframes fly-1 {
    from {
      transform: translateY(0.1em);
    }
    to {
      transform: translateY(-0.1em);
    }
  }

  .send-btn {
    font-family: inherit;
    font-size: 18px;
    background: var(--primary);
    color: white;
    padding: 0.7em 1em;
    padding-left: 0.9em;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.2s;
    cursor: pointer;
    width: 100%;
    justify-content: center;
  }

  .send-btn span {
    display: block;
    margin-left: 0.3em;
    transition: all 0.3s ease-in-out;
  }

  .send-btn svg {
    display: block;
    transform-origin: center center;
    transition: transform 0.3s ease-in-out;
  }

  .send-btn:hover .svg-wrapper {
    animation: fly-1 0.6s ease-in-out infinite alternate;
  }

  .send-btn:hover svg {
    transform: translateX(1.2em) rotate(45deg) scale(1.1);
  }

  .send-btn:hover span {
    transform: translateX(5em);
  }

  .send-btn:active {
    transform: scale(0.95);
  }

  .send-btn:disabled {
    background: var(--primary-light);
    cursor: not-allowed;
  }
`;

// Styled Send Button Component
const SendButton = ({ 
  isSubmitting, 
  className 
}: { 
  isSubmitting: boolean;
  className?: string;
}) => {
  return (
    <>
      <style>{animationStyles}</style>
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "send-btn",
          "shadow-md hover:shadow-lg", 
          className
        )}
      >
        {isSubmitting ? (
          "Sending..."
        ) : (
          <>
            <div className="svg-wrapper-1">
              <div className="svg-wrapper">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  width={24} 
                  height={24}
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path 
                    fill="currentColor" 
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" 
                  />
                </svg>
              </div>
            </div>
            <span>Send Message</span>
          </>
        )}
      </button>
    </>
  );
};

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    { icon: <Mail className="h-5 w-5" />, text: "contact@example.com" },
    { icon: <Phone className="h-5 w-5" />, text: "+1 (555) 123-4567" },
    { icon: <MapPin className="h-5 w-5" />, text: "San Francisco, CA" },
  ];

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com",
      label: "GitHub",
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/5 to-purple-500/5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-primary/5 to-purple-500/5 blur-3xl rounded-full"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-12 h-12 bg-primary/10 rounded-full blur-sm animate-float-slow"></div>
      <div className="absolute bottom-20 right-10 w-20 h-20 bg-purple-500/10 rounded-full blur-sm animate-float-slow animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-primary/10 rounded-full blur-sm animate-float-slow animation-delay-1000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Have a project in mind or want to discuss potential opportunities?
            I'd love to hear from you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border border-border/40 bg-muted/30 backdrop-blur-sm shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-primary">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center gap-4 group"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      viewport={{ once: true }}
                    >
                      <div className="text-primary bg-primary/10 p-3 rounded-full transition-transform group-hover:scale-110 group-hover:bg-primary/20">
                        {item.icon}
                      </div>
                      <span className="text-foreground group-hover:text-primary transition-colors">{item.text}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-10">
                  <h4 className="text-lg font-semibold mb-4">
                    Connect With Me
                  </h4>
                  <div className="flex gap-4">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-all p-2 hover:bg-primary/10 rounded-full"
                        aria-label={link.label}
                        whileHover={{ scale: 1.1 }}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 * index }}
                        viewport={{ once: true }}
                      >
                        {link.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="border border-border/40 bg-muted/30 backdrop-blur-sm shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Label htmlFor="name" className="text-foreground/90">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="bg-background/50 border-primary/20 focus:border-primary transition-colors focus:ring-1 focus:ring-primary"
                    />
                  </motion.div>
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Label htmlFor="email" className="text-foreground/90">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      required
                      className="bg-background/50 border-primary/20 focus:border-primary transition-colors focus:ring-1 focus:ring-primary"
                    />
                  </motion.div>
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Label htmlFor="message" className="text-foreground/90">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message"
                      rows={5}
                      required
                      className="bg-background/50 border-primary/20 focus:border-primary transition-colors focus:ring-1 focus:ring-primary"
                    />
                  </motion.div>
                  <motion.div 
                    className="group pt-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <SendButton isSubmitting={isSubmitting} />
                  </motion.div>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center"
                    >
                      <p className="text-green-500 font-medium">
                        Thank you! Your message has been sent successfully.
                      </p>
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
