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
import { createProject, Project } from "@/lib/supabase/api";
import { toast } from "@/components/ui/use-toast";

const projectSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug can only contain lowercase letters, numbers, and hyphens",
    }),
  tagline: z
    .string()
    .min(10, { message: "Tagline must be at least 10 characters" }),
  description: z
    .string()
    .min(50, { message: "Description must be at least 50 characters" }),
  image_url: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .min(1, { message: "Primary image URL is required" }),
  secondary_image_url: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .optional()
    .or(z.literal("")),
  demo_url: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .optional()
    .or(z.literal("")),
  github_url: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .optional()
    .or(z.literal("")),
  technologies: z.string(),
  duration: z.string().min(1, { message: "Duration is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  role: z.string().min(1, { message: "Role is required" }),
  client: z.string().optional().or(z.literal("")),
  featured: z.boolean().default(false),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface AddProjectFormProps {
  onSuccess?: () => void;
}

export default function AddProjectForm({ onSuccess }: AddProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      slug: "",
      tagline: "",
      description: "",
      image_url: "",
      secondary_image_url: "",
      demo_url: "",
      github_url: "",
      technologies: "",
      duration: "",
      date: "",
      role: "",
      client: "",
      featured: false,
    },
  });

  const onSubmit = async (data: ProjectFormValues) => {
    setIsSubmitting(true);
    try {
      const technologies = data.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech.length > 0);

      // Create new project
      const newProject = await createProject({
        title: data.title,
        slug: data.slug,
        description: data.tagline,
        content: data.description,
        image_url: data.image_url,
        secondary_image_url: data.secondary_image_url || null,
        demo_url: data.demo_url || null,
        github_url: data.github_url || null,
        duration: data.duration,
        completion_date: data.date,
        role: data.role,
        client: data.client || null,
        featured: data.featured,
        technologies,
      });

      if (newProject) {
        toast({
          title: "Project created",
          description: "Your project has been created successfully.",
        });
        form.reset();
        onSuccess?.();
      } else {
        toast({
          title: "Error",
          description: "Failed to create project. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting project:", error);
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="E-commerce Platform" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug (URL-friendly name)</FormLabel>
                  <FormControl>
                    <Input placeholder="e-commerce-platform" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tagline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tagline</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="A modern e-commerce platform with cart functionality"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="React, Node.js, MongoDB (comma separated)"
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

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Duration</FormLabel>
                  <FormControl>
                    <Input placeholder="3 months" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Completion Date</FormLabel>
                  <FormControl>
                    <Input placeholder="June 2023" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Role</FormLabel>
                  <FormControl>
                    <Input placeholder="Lead Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="client"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Name (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="RetailCo Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="github_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Repository URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://github.com/username/repo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="demo_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Live Demo URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4 mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured Project</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Display this project on the homepage
                    </p>
                  </div>
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
              <FormLabel>Project Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detailed description of the project, its features, challenges, and solutions..."
                  {...field}
                  rows={8}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Creating Project..." : "Create Project"}
        </Button>
      </form>
    </Form>
  );
}
