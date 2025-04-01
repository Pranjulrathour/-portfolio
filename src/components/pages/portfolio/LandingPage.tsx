import Navbar from "../../portfolio/Navbar";
import HeroSection from "../../portfolio/HeroSection";
import ProjectsSection from "../../portfolio/ProjectsSection";
import AchievementsSection from "../../portfolio/AchievementsSection";
import AboutSection from "../../portfolio/AboutSection";
import ContactSection from "../../portfolio/ContactSection";
import Footer from "../../portfolio/Footer";
import BackgroundWrapper from "@/components/ui/background-wrapper";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import TimelineSection from "../../portfolio/TimelineSection";

export default function LandingPage() {
  return (
    <BackgroundWrapper>
      <div className="min-h-screen bg-background bg-opacity-70">
        <Navbar />
        <ScrollProgress className="top-[60px]" />
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <TimelineSection />
        <AchievementsSection />
        <ContactSection />
        <Footer />
      </div>
    </BackgroundWrapper>
  );
}
