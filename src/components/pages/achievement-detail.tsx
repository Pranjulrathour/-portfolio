import Navbar from "../portfolio/Navbar";
import Footer from "../portfolio/Footer";
import AchievementDetail from "../portfolio/AchievementDetail";
import { AuthProvider } from "@/lib/supabase/auth";
import BackgroundWrapper from "@/components/ui/background-wrapper";

export default function AchievementDetailPage() {
  return (
    <AuthProvider>
      <BackgroundWrapper>
        <div className="min-h-screen bg-background bg-opacity-70">
          <Navbar />
          <div className="pt-24 pb-12">
            <AchievementDetail />
          </div>
          <Footer />
        </div>
      </BackgroundWrapper>
    </AuthProvider>
  );
}
