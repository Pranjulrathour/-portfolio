import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createAchievement } from "@/lib/supabase/api";
import { toast } from "@/components/ui/use-toast";

const achievementSchema = z.object({
  place: z.string().min(3, { message: "Place must be at least 3 characters" }),
  product: z
    .string()
    .min(3, { message: "Product must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  image_url: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .min(1, { message: "Primary image URL is required" }),
  secondary_image_url: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .optional()
    .or(z.literal("")),
});

type AchievementFormValues = z.infer<typeof achievementSchema>;

interface AddAchievementFormProps {
  onSuccess?: () => void;
}

export default function AddAchievementForm({
  onSuccess,
}: AddAchievementFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AchievementFormValues>({
    resolver: zodResolver(achievementSchema),
    defaultValues: {
      place: "",
      product: "",
      description: "",
      image_url: "",
      secondary_image_url: "",
    },
  });

  const onSubmit = async (data: AchievementFormValues) => {
    setIsSubmitting(true);
    try {
      // Create new achievement
      console.log("Submitting achievement data:", data);
      const newAchievement = await createAchievement({
        place: data.place,
        product: data.product,
        description: data.description,
        image_url: data.image_url,
        secondary_image_url: data.secondary_image_url || null,
      });

      if (newAchievement) {
        toast({
          title: "Achievement created",
          description: "Your achievement has been created successfully.",
        });
        form.reset();
        onSuccess?.();
      } else {
        toast({
          title: "Error",
          description: "Failed to create achievement. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting achievement:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="place"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Place</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Achievement location or context"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product, service, or project name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="secondary_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secondary Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/image2.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Achievement Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detailed description of the achievement, its significance, and impact..."
                  {...field}
                  rows={8}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Creating Achievement..." : "Create Achievement"}
        </Button>
      </form>
    </Form>
  );
}
