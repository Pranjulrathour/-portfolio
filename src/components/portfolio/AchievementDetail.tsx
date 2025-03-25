import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { getAchievementById, Achievement } from "@/lib/supabase/api";

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

  return (
    <div className="pt-6 pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            className="group mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back
          </Button>

          {error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <p>Redirecting to achievements...</p>
            </div>
          ) : achievement ? (
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {achievement.place}
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-primary mb-6">
                {achievement.product}
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <div className="aspect-video rounded-xl overflow-hidden mb-4">
                    <img
                      src={
                        achievement.image_url ||
                        "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80"
                      }
                      alt={`${achievement.place} - ${achievement.product}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {achievement.secondary_image_url && (
                    <div className="aspect-video rounded-xl overflow-hidden">
                      <img
                        src={achievement.secondary_image_url}
                        alt={`${achievement.place} - ${achievement.product} secondary`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="bg-muted/50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">
                    Achievement Details
                  </h3>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{achievement.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Achievement not found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
