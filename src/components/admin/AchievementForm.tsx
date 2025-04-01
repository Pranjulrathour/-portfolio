import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createAchievement } from "@/lib/supabase/api";
import { toast } from "sonner";
import { Achievement } from "@/lib/supabase/types";

interface AchievementFormData {
  place: string;
  product: string;
  description: string;
  image_url?: string;
  secondary_image_url?: string;
}

interface AchievementFormProps {
  achievement?: Achievement;
  onSuccess?: () => void;
}

export default function AchievementForm({ achievement, onSuccess }: AchievementFormProps) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AchievementFormData>({
    defaultValues: achievement
  });

  const onSubmit = async (data: AchievementFormData) => {
    try {
      setLoading(true);
      await createAchievement(data);
      toast.success("Achievement created successfully!");
      reset();
      onSuccess?.();
    } catch (error) {
      console.error("Error creating achievement:", error);
      toast.error("Failed to create achievement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="place">Place</Label>
        <Input
          id="place"
          {...register("place", { required: "Place is required" })}
          placeholder="Enter place"
        />
        {errors.place && (
          <p className="text-red-500 text-sm">{errors.place.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="product">Product</Label>
        <Input
          id="product"
          {...register("product", { required: "Product is required" })}
          placeholder="Enter product"
        />
        {errors.product && (
          <p className="text-red-500 text-sm">{errors.product.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description", { required: "Description is required" })}
          placeholder="Enter description"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="image_url">Image URL</Label>
        <Input
          id="image_url"
          {...register("image_url")}
          placeholder="Enter image URL"
        />
      </div>

      <div>
        <Label htmlFor="secondary_image_url">Secondary Image URL</Label>
        <Input
          id="secondary_image_url"
          {...register("secondary_image_url")}
          placeholder="Enter secondary image URL"
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Achievement"}
      </Button>
    </form>
  );
}
