import { useState, useEffect } from "react";
import {
  getAchievements,
  deleteAchievement,
  Achievement,
} from "@/lib/supabase/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface AchievementListProps {
  onEdit: (achievement: Achievement) => void;
  refreshTrigger?: number;
}

export default function AchievementList({
  onEdit,
  refreshTrigger = 0,
}: AchievementListProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [achievementToDelete, setAchievementToDelete] =
    useState<Achievement | null>(null);

  useEffect(() => {
    fetchAchievements();
  }, [refreshTrigger]);

  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const data = await getAchievements();
      setAchievements(data);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      toast({
        title: "Error",
        description: "Failed to load achievements. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!achievementToDelete) return;

    try {
      const success = await deleteAchievement(achievementToDelete.id);
      if (success) {
        setAchievements((prev) =>
          prev.filter((a) => a.id !== achievementToDelete.id),
        );
        toast({
          title: "Achievement deleted",
          description: "The achievement has been deleted successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete achievement. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting achievement:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAchievementToDelete(null);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading achievements...</div>;
  }

  if (achievements.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No achievements found</p>
        <p className="text-sm text-gray-400">
          Create your first achievement to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {achievements.map((achievement) => (
        <Card key={achievement.id}>
          <CardHeader>
            <CardTitle>{achievement.place}</CardTitle>
            <CardDescription>{achievement.product}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-500 mb-4">
              <p className="line-clamp-2">{achievement.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {achievement.image_url && (
                <div className="aspect-video rounded-md overflow-hidden">
                  <img
                    src={achievement.image_url}
                    alt="Primary image"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {achievement.secondary_image_url && (
                <div className="aspect-video rounded-md overflow-hidden">
                  <img
                    src={achievement.secondary_image_url}
                    alt="Secondary image"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(achievement)}
            >
              <Pencil className="h-4 w-4 mr-2" /> Edit
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setAchievementToDelete(achievement)}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the achievement from {achievementToDelete?.place} and all
                    associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => setAchievementToDelete(null)}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
