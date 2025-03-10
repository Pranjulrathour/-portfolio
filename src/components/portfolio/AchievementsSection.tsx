import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { getAchievements, Achievement } from "@/lib/supabase/api";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
// Removed TiltedCard import as we're using a simpler card design

interface AchievementsSectionProps {
  achievements?: Achievement[];
}

// Fallback achievements in case API fails
const fallbackAchievements: Achievement[] = [
  {
    id: "1",
    place: "International Design Conference",
    product: "UI/UX Design System",
    description:
      "Recognized for creating an innovative design system that improved workflow efficiency by 40% and user satisfaction by 35%.",
    image_url:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80",
    secondary_image_url:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    created_at: null,
    updated_at: null,
  },
  {
    id: "2",
    place: "Tech Innovation Summit",
    product: "Mobile Payment Solution",
    description:
      "Awarded for developing a secure mobile payment solution that increased transaction speed by 60% while maintaining robust security protocols.",
    image_url:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    secondary_image_url: null,
    created_at: null,
    updated_at: null,
  },
];

export default function AchievementsSection({
  achievements: initialAchievements,
}: AchievementsSectionProps) {
  const [achievements, setAchievements] = useState<Achievement[]>(
    initialAchievements || [],
  );
  const [loading, setLoading] = useState(!initialAchievements);
  const [error, setError] = useState<string | null>(null);
  // No longer need selectedAchievement state as we're using dedicated pages

  useEffect(() => {
    // If achievements were not passed as props, fetch them
    if (!initialAchievements) {
      const fetchAchievements = async () => {
        try {
          setLoading(true);
          const data = await getAchievements();
          if (data && data.length > 0) {
            setAchievements(data);
          } else {
            // Use fallback achievements if API returns empty
            setAchievements(fallbackAchievements);
            setError(
              "Could not load achievements from database, showing sample achievements",
            );
          }
        } catch (err) {
          console.error("Error fetching achievements:", err);
          setAchievements(fallbackAchievements);
          setError("Failed to load achievements, showing sample achievements");
        } finally {
          setLoading(false);
        }
      };

      fetchAchievements();
    }
  }, [initialAchievements]);

  // For the main page, only show the first 3 achievements
  const displayedAchievements =
    window.location.pathname === "/" ? achievements.slice(0, 3) : achievements;

  if (loading) {
    return (
      <section id="achievements" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading achievements...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="achievements" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            Elite Achievements
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Recognition and awards for excellence in various projects and
            initiatives.
          </p>

          {error && <p className="text-amber-500 mt-2 text-sm">{error}</p>}
        </div>

        {displayedAchievements.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No achievements found. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <div className="h-full rounded-xl overflow-hidden bg-purple-600 hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-video">
                    <img
                      src={
                        achievement.image_url ||
                        "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80"
                      }
                      alt={`${achievement.place} - ${achievement.product}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 font-bold text-xl">
                      {achievement.place}
                    </div>
                    <div className="absolute top-4 right-4 font-bold text-xl">
                      {achievement.product}
                    </div>
                  </div>
                  <div className="p-6 text-white">
                    <p className="mb-6 line-clamp-3">
                      {achievement.description}
                    </p>
                    <div className="flex justify-end">
                      <Link
                        to={`/achievements/${achievement.id}`}
                        className="bg-white rounded-full p-4 hover:bg-gray-100 transition-colors"
                      >
                        <ArrowUpRight size={24} className="text-black" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {window.location.pathname === "/" && achievements.length > 3 && (
          <div className="mt-12 text-center">
            <Button
              asChild
              variant="outline"
              className="rounded-full px-8 group"
            >
              <Link to="/achievements">
                View All Achievements
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y--1" />
              </Link>
            </Button>
          </div>
        )}

        {/* Removed modal in favor of dedicated achievement detail page */}
      </div>
    </section>
  );
}
