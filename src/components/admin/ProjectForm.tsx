import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createProject } from "@/lib/supabase/api";
import { toast } from "sonner";
import { TechnologySelect } from "@/components/ui/technology-select";
import { Project } from "@/lib/supabase/types";

interface ProjectFormData {
  title: string;
  slug: string;
  description: string;
  content?: string;
  image_url?: string;
  demo_url?: string;
  github_url?: string;
}

interface ProjectFormProps {
  project?: Project;
  onSuccess?: () => void;
}

export default function ProjectForm({ project, onSuccess }: ProjectFormProps) {
  const [loading, setLoading] = useState(false);
  const [technologies, setTechnologies] = useState<string[]>(project?.technologies || []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProjectFormData>({
    defaultValues: project
  });

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setLoading(true);
      await createProject({
        ...data,
        technologies
      });
      toast.success("Project created successfully!");
      reset();
      setTechnologies([]);
      onSuccess?.();
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register("title", { required: "Title is required" })}
          placeholder="Enter title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          {...register("slug", { required: "Slug is required" })}
          placeholder="Enter slug"
        />
        {errors.slug && (
          <p className="text-red-500 text-sm">{errors.slug.message}</p>
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
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          {...register("content")}
          placeholder="Enter content"
        />
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
        <Label htmlFor="demo_url">Demo URL</Label>
        <Input
          id="demo_url"
          {...register("demo_url")}
          placeholder="Enter demo URL"
        />
      </div>

      <div>
        <Label htmlFor="github_url">GitHub URL</Label>
        <Input
          id="github_url"
          {...register("github_url")}
          placeholder="Enter GitHub URL"
        />
      </div>

      <div>
        <Label>Technologies</Label>
        <TechnologySelect
          value={technologies}
          onChange={setTechnologies}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Project"}
      </Button>
    </form>
  );
}
