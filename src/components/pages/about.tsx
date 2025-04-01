import Navbar from "../portfolio/Navbar";
import AboutSection from "../portfolio/AboutSection";
import Footer from "../portfolio/Footer";
import { motion } from "framer-motion";
import { AuthProvider } from "@/lib/supabase/auth";
import BackgroundWrapper from "@/components/ui/background-wrapper";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export default function AboutPage() {
  return (
    <AuthProvider>
      <BackgroundWrapper>
        <div className="min-h-screen bg-background bg-opacity-70">
          <Navbar />
          <ScrollProgress className="top-[60px]" />
          <div className="pt-24 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="container mx-auto px-4"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                About Me
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl">
                Learn more about my background, skills, and what drives me as a
                developer and designer.
              </p>
            </motion.div>
          </div>
          <AboutSection />
          <Footer />
        </div>
      </BackgroundWrapper>
    </AuthProvider>
  );
}
