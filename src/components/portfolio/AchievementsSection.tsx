import { useState, useEffect } from "react";
import { getAchievements, Achievement } from "@/lib/supabase/api";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { IconAward } from "@tabler/icons-react";

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

// Simple Image Header component
function ImageHeader({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="w-full h-full overflow-hidden">
      <img 
        src={imageUrl || "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80"} 
        alt="Achievement" 
        className="w-full h-full object-cover transition-all duration-500 group-hover/bento:scale-110" 
      />
    </div>
  );
}

export default function AchievementsSection({
  achievements: initialAchievements,
}: AchievementsSectionProps) {
  const [achievements, setAchievements] = useState<Achievement[]>(
    initialAchievements || [],
  );
  const [loading, setLoading] = useState(!initialAchievements);
  const [error, setError] = useState<string | null>(null);

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

  // For the main page, only show the first 4 achievements
  const displayedAchievements =
    window.location.pathname === "/" ? achievements.slice(0, 4) : achievements;

  // Get grid span class based on index
  const getSpanClass = (index: number) => {
    if (index % 5 === 0) return "md:col-span-2 md:row-span-2"; // Feature item
    if (index % 3 === 0) return "md:col-span-2"; // Wider item
    return ""; // Default size
  };

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
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Elite Achievements
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[15rem] auto-rows-[20rem]">
              {displayedAchievements.map((achievement, index) => (
                <div 
                  key={achievement.id}
                  className={`row-span-1 rounded-xl group hover:shadow-xl transition duration-300 shadow-input dark:shadow-none p-0 dark:bg-black dark:border-white/[0.2] bg-white border border-neutral-200 relative overflow-hidden cursor-pointer ${getSpanClass(index)}`}
                >
                  <div className="relative z-10 w-full h-full">
                    <ImageHeader imageUrl={achievement.image_url || ""} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-90 transition-opacity group-hover:opacity-100"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-white line-clamp-1 mb-1">
                        {achievement.place} - {achievement.product}
                      </div>
                      <span className="bg-primary/90 p-1.5 rounded-full text-white">
                        <IconAward className="h-5 w-5" />
                      </span>
                    </div>
                    <div className="text-white/80 text-sm line-clamp-2 group-hover:line-clamp-none transition-all">
                      {achievement.description}
                    </div>
                    <Link
                      to={`/achievements/${achievement.id}`}
                      className="absolute inset-0 z-30"
                      aria-label={`View details of ${achievement.place} - ${achievement.product}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {window.location.pathname === "/" && achievements.length > 4 && (
          <div className="mt-12 text-center">
            <Button
              asChild
              variant="outline"
              className="rounded-full px-8 group"
            >
              <Link to="/achievements">
                View All Achievements
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
