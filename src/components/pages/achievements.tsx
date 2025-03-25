import Navbar from "../portfolio/Navbar";
import AchievementsSection from "../portfolio/AchievementsSection";
import Footer from "../portfolio/Footer";
import { AuthProvider } from "@/lib/supabase/auth";
import BackgroundWrapper from "@/components/ui/background-wrapper";

export default function AchievementsPage() {
  return (
    <AuthProvider>
      <BackgroundWrapper>
        <div className="min-h-screen bg-background bg-opacity-70">
          <Navbar />
          <div className="pt-24 pb-12">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                Elite Achievements
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl">
                Explore my notable achievements, awards, and recognition across
                various projects and initiatives.
              </p>
            </div>
          </div>
          <AchievementsSection />
          <Footer />
        </div>
      </BackgroundWrapper>
    </AuthProvider>
  );
}
