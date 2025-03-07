import Navbar from "../../portfolio/Navbar";
import HeroSection from "../../portfolio/HeroSection";
import ProjectsSection from "../../portfolio/ProjectsSection";
import AboutSection from "../../portfolio/AboutSection";
import ContactSection from "../../portfolio/ContactSection";
import Footer from "../../portfolio/Footer";
import { AuthProvider } from "@/lib/supabase/auth";

export default function LandingPage() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </div>
    </AuthProvider>
  );
}
