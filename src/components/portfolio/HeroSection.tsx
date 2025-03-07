import { motion } from "framer-motion";
import { ArrowDownCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50 pt-16">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Creative Developer & Designer
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
            I build beautiful, functional websites and applications with a focus
            on user experience and clean code.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="rounded-full px-8"
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8"
              asChild
            >
              <a href="#contact">Get In Touch</a>
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
            className="text-gray-500 hover:text-gray-800 transition-colors"
            aria-label="Scroll down"
          >
            <ArrowDownCircle size={36} className="animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
