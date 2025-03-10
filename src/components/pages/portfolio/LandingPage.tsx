import Navbar from "../../portfolio/Navbar";
import HeroSection from "../../portfolio/HeroSection";
import ProjectsSection from "../../portfolio/ProjectsSection";
import AchievementsSection from "../../portfolio/AchievementsSection";
import AboutSection from "../../portfolio/AboutSection";
import ContactSection from "../../portfolio/ContactSection";
import Footer from "../../portfolio/Footer";
import { AuthProvider } from "@/lib/supabase/auth";
import BackgroundWrapper from "@/components/ui/background-wrapper";

export default function LandingPage() {
  return (
    <AuthProvider>
      <BackgroundWrapper>
        <div className="min-h-screen bg-background bg-opacity-70">
          <Navbar />
          <HeroSection />
          <ProjectsSection />
          <AchievementsSection />
          <AboutSection />
          <ContactSection />
          <Footer />
        </div>
      </BackgroundWrapper>
    </AuthProvider>
  );
}
