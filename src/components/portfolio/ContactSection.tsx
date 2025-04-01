import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  Sparkles,
  Bot,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { submitContactForm } from "@/lib/supabase/api";
import { toast } from "sonner";

// Floating shapes component with theme-aware colors
const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full blur-3xl"
        animate={{
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-tr from-primary/20 to-primary/10 rounded-full blur-3xl"
        animate={{
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

// Modern send button with theme-aware animations
const SendButton = ({ isSubmitting, className }: { isSubmitting: boolean; className?: string }) => {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      className={cn(
        "relative w-full overflow-hidden bg-primary hover:bg-primary/90 transition-all duration-300",
        "group flex items-center justify-center gap-2 h-12",
        className
      )}
    >
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: isSubmitting ? 0 : 1 }}
        className="relative z-10 flex items-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Bot className="w-5 h-5 animate-pulse" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <MessageSquare className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Send Message</span>
          </>
        )}
      </motion.span>
      <motion.div
        className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={false}
        animate={isSubmitting ? { width: "100%" } : { width: "0%" }}
      />
    </Button>
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
  const [error, setError] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
  const y = useTransform(scrollYProgress, [0.7, 0.9], [100, 0]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      console.log('Starting form submission...');
      const result = await submitContactForm(formData);
      console.log('Form submission result:', result);
      
      setIsSubmitted(true);
      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error('Form submission error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: <Mail className="h-5 w-5" />, text: "pranjulrathour41@gmail.com" },
    { icon: <Phone className="h-5 w-5" />, text: "+91 8467977141" },
    { icon: <MapPin className="h-5 w-5" />, text: "kanpur, Uttar Pradesh, India" },
  ];

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <FloatingShapes />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          style={{ opacity, y }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Let's Connect</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Have a project in mind or want to discuss potential opportunities?
            I'd love to hear from you.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-primary/20 hover:border-primary/40 transition-colors duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-primary">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="group flex items-center gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      viewport={{ once: true }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:scale-150 transition-transform duration-300" />
                        <div className="relative bg-primary/10 p-3 rounded-full transition-transform group-hover:scale-110 group-hover:bg-primary/20">
                          {item.icon}
                        </div>
                      </div>
                      <span className="text-foreground/80 group-hover:text-foreground transition-colors">{item.text}</span>
                    </motion.div>
                  ))}
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
            <Card className="border-primary/20 hover:border-primary/40 transition-colors duration-300">
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
                      className="bg-background/50 border-primary/20 focus:border-primary transition-colors focus:ring-2 focus:ring-primary/20"
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
                      className="bg-background/50 border-primary/20 focus:border-primary transition-colors focus:ring-2 focus:ring-primary/20"
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
                      className="bg-background/50 border-primary/20 focus:border-primary transition-colors focus:ring-2 focus:ring-primary/20"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <SendButton isSubmitting={isSubmitting} />
                  </motion.div>
                  
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-destructive/10 border border-destructive/30 rounded-lg p-4"
                    >
                      <div className="flex items-center gap-2 text-destructive">
                        <AlertCircle className="w-5 h-5" />
                        <p className="font-medium">{error}</p>
                      </div>
                    </motion.div>
                  )}

                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-500/10 border border-green-500/30 rounded-lg p-4"
                    >
                      <div className="flex items-center gap-2 text-green-500">
                        <Bot className="w-5 h-5" />
                        <p className="font-medium">
                          Thank you! Your message has been received. I'll get back to you soon.
                        </p>
                      </div>
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

