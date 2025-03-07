import { motion } from "framer-motion";
import { ArrowDownCircle, Code, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/50 pt-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center mb-6 gap-2">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20"
            >
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              Full-Stack Developer
            </motion.span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            Creative Developer & Designer
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
            I build beautiful, functional websites and applications with a focus
            on user experience and clean code.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="rounded-full px-8 group"
            >
              <Zap className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 group"
              asChild
            >
              <Link to="/contact">
                <Code className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                Get In Touch
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20"
        >
          <button
            onClick={scrollToProjects}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Scroll down"
          >
            <ArrowDownCircle size={36} className="animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
