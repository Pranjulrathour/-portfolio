import Navbar from "../portfolio/Navbar";
import ProjectsSection from "../portfolio/ProjectsSection";
import Footer from "../portfolio/Footer";
import { motion } from "framer-motion";
import { AuthProvider } from "@/lib/supabase/auth";
import BackgroundWrapper from "@/components/ui/background-wrapper";

export default function ProjectsPage() {
  return (
    <AuthProvider>
      <BackgroundWrapper>
        <div className="min-h-screen bg-background bg-opacity-70">
          <Navbar />
          <div className="pt-24 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="container mx-auto px-4"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                My Projects
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl">
                Explore my portfolio of work across web development, design, and
                more.
              </p>
            </motion.div>
          </div>
          <ProjectsSection />
          <Footer />
        </div>
      </BackgroundWrapper>
    </AuthProvider>
  );
}
