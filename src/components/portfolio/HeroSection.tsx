import { motion } from "framer-motion";
import { ArrowDownCircle, Code, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React from "react";
import GradientBackground from "@/components/ui/gradient-background";
import SplitRotatingText from "@/components/ui/split-rotating-text";

export default function HeroSection() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      <GradientBackground>
        {/* Background elements with subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center z-10">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 md:pr-8 mb-10 md:mb-0"
          >
            <div className="flex items-start mb-4">
              <div className="inline-flex items-center justify-center px-3 py-1 border-2 border-black dark:border-white mb-4">
                <span className="text-sm font-medium">Hello !</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              I'm <span className="text-blue-600">Pranjul Rathour,</span>
            </h1>
            <div className="flex flex-col space-y-4 mb-6">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold">
                CREATIVE AND GENIUS
              </div>
              <div className="bg-blue-600 text-white px-6 py-3 rounded-lg inline-block max-w-max">
                <motion.div
                  className="text-3xl md:text-4xl lg:text-5xl font-bold"
                  key="rotating-text"
                >
                  <SplitRotatingText
                    staticText=""
                    rotatingTexts={[
                      "CREATOR!",
                      "DESIGNER!",
                      "DEVELOPER!",
                      "INNOVATOR!",
                      "MAKER!",
                      "MASTERMIND!",
                      "SOLVER!",
                    ]}
                    rotationInterval={2000}
                    staggerDuration={0.03}
                    transition={{ type: "spring", damping: 30, stiffness: 200 }}
                    mainClassName=""
                    staticClassName="hidden"
                    rotatingClassName="bg-transparent"
                    elementLevelClassName="font-bold"
                  />
                </motion.div>
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Innovative Digital Marketer with Expertise in Driving Online
              Growth Through Strategic Campaigns.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={scrollToProjects}
                className="rounded-md px-8 bg-blue-600 hover:bg-blue-700"
              >
                Hire Me
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-md px-8 border-2"
                asChild
              >
                <Link to="/contact">Whatsapp</Link>
              </Button>
            </div>
          </motion.div>

          {/* Right content - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-1/2 relative"
          >
            <div className="relative">
              {/* Blue shape behind image */}
              <div className="absolute inset-0 bg-blue-600 rounded-tl-[100px] rounded-br-[100px] transform translate-x-4 translate-y-4 -z-10"></div>

              {/* Profile image */}
              <img
                src="https://raw.githubusercontent.com/Pranjulrathour/photo/refs/heads/main/image_(1)%5B1%5D.png"
                alt="Professional portrait"
                className="w-full h-auto object-cover rounded-tl-[100px] rounded-br-[100px] shadow-lg"
              />

              {/* Floating badges */}
              <div className="absolute top-10 right-0 transform translate-x-1/4 bg-blue-600 text-white px-4 py-2 rounded-full font-medium">
                WEB Designer
              </div>
              <div className="absolute bottom-10 right-0 transform translate-x-1/3 bg-blue-600 text-white px-4 py-2 rounded-full font-medium">
                UI/UX Designer
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
      </GradientBackground>
    </section>
  );
}
