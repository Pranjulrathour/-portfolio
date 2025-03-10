import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { getAchievementById, Achievement } from "@/lib/supabase/api";
// TiltedCard removed as we're using simple images on the detail page

interface AchievementDetailProps {
  achievementId?: string;
}

export default function AchievementDetail({
  achievementId,
}: AchievementDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const actualId = achievementId || id;

  useEffect(() => {
    const fetchAchievement = async () => {
      if (!actualId) return;

      try {
        setLoading(true);
        const achievementData = await getAchievementById(actualId);

        if (achievementData) {
          setAchievement(achievementData);
        } else {
          setError("Achievement not found");
          // Navigate to achievements page after a delay if achievement not found
          setTimeout(() => navigate("/achievements"), 2000);
        }
      } catch (err) {
        console.error("Error fetching achievement:", err);
        setError("Failed to load achievement details");
      } finally {
        setLoading(false);
      }
    };

    fetchAchievement();
  }, [actualId, navigate]);

  if (loading) {
    return (
      <div className="pt-6 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            Loading achievement details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-6 pb-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
          <p className="text-muted-foreground mb-6">
            Redirecting to achievements page...
          </p>
          <Button asChild>
            <Link to="/achievements">View All Achievements</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Fallback to a default achievement if none is found
  const achievementData = achievement || {
    id: "not-found",
    place: "Unknown Location",
    product: "Achievement Not Found",
    description: "This achievement could not be found or has been removed.",
    image_url:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&q=80",
    secondary_image_url: null,
    created_at: null,
    updated_at: null,
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          to="/achievements"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Achievements
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              {achievementData.product}
            </h1>

            <Badge variant="outline" className="mb-6">
              {achievementData.place}
            </Badge>

            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {achievementData.image_url && (
                  <div className="aspect-video overflow-hidden rounded-lg shadow-md border border-border/40">
                    <img
                      src={achievementData.image_url}
                      alt={achievementData.product}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {achievementData.secondary_image_url && (
                  <div className="aspect-video overflow-hidden rounded-lg shadow-md border border-border/40">
                    <img
                      src={achievementData.secondary_image_url}
                      alt={`${achievementData.product} secondary`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>{achievementData.description}</p>
            </div>
          </div>

          <div>
            <div className="bg-muted/30 rounded-lg p-6 border border-border/40 sticky top-24">
              <h3 className="text-xl font-semibold mb-4">
                Achievement Details
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-muted-foreground mt-0.5"
                  >
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                  <div>
                    <p className="font-medium">Location/Context</p>
                    <p className="text-muted-foreground">
                      {achievementData.place}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-muted-foreground mt-0.5"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                  <div>
                    <p className="font-medium">Product/Service</p>
                    <p className="text-muted-foreground">
                      {achievementData.product}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
