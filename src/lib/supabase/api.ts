import { supabase } from "./client";
import { Tables, InsertTables, UpdateTables } from "./types";

export type Project = Tables<"projects"> & { technologies: string[] };

// Projects API
export async function getProjects(): Promise<Project[]> {
  try {
    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
      return [];
    }

    // Fetch technologies for each project
    const projectsWithTechnologies = await Promise.all(
      projects.map(async (project) => {
        const { data: techData } = await supabase
          .from("project_technologies")
          .select("technology")
          .eq("project_id", project.id);

        const technologies = techData?.map((t) => t.technology) || [];
        return { ...project, technologies };
      }),
    );

    return projectsWithTechnologies;
  } catch (error) {
    console.error("Error in getProjects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const { data: project, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Error fetching project:", error);
      return null;
    }

    // Fetch technologies for the project
    const { data: techData } = await supabase
      .from("project_technologies")
      .select("technology")
      .eq("project_id", project.id);

    const technologies = techData?.map((t) => t.technology) || [];
    return { ...project, technologies };
  } catch (error) {
    console.error("Error in getProjectBySlug:", error);
    return null;
  }
}

export async function createProject(
  project: InsertTables<"projects"> & { technologies: string[] },
): Promise<Project | null> {
  try {
    // Insert project
    const { data: newProject, error } = await supabase
      .from("projects")
      .insert([
        {
          title: project.title,
          slug: project.slug,
          description: project.description,
          content: project.content,
          image_url: project.image_url,
          secondary_image_url: project.secondary_image_url,
          demo_url: project.demo_url,
          github_url: project.github_url,
          duration: project.duration,
          completion_date: project.completion_date,
          role: project.role,
          client: project.client,
          featured: project.featured || false,
        },
      ])
      .select()
      .single();

    if (error || !newProject) {
      console.error("Error creating project:", error);
      return null;
    }

    // Insert technologies
    if (project.technologies.length > 0) {
      const techInserts = project.technologies.map((tech) => ({
        project_id: newProject.id,
        technology: tech,
      }));

      const { error: techError } = await supabase
        .from("project_technologies")
        .insert(techInserts);

      if (techError) {
        console.error("Error adding technologies:", techError);
      }
    }

    return { ...newProject, technologies: project.technologies };
  } catch (error) {
    console.error("Error in createProject:", error);
    return null;
  }
}

export async function updateProject(
  id: string,
  project: UpdateTables<"projects"> & { technologies?: string[] },
): Promise<boolean> {
  try {
    // Update project
    const { error } = await supabase
      .from("projects")
      .update({
        title: project.title,
        slug: project.slug,
        description: project.description,
        content: project.content,
        image_url: project.image_url,
        secondary_image_url: project.secondary_image_url,
        demo_url: project.demo_url,
        github_url: project.github_url,
        duration: project.duration,
        completion_date: project.completion_date,
        role: project.role,
        client: project.client,
        featured: project.featured,
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating project:", error);
      return false;
    }

    // Update technologies if provided
    if (project.technologies) {
      // Delete existing technologies
      await supabase.from("project_technologies").delete().eq("project_id", id);

      // Insert new technologies
      if (project.technologies.length > 0) {
        const techInserts = project.technologies.map((tech) => ({
          project_id: id,
          technology: tech,
        }));

        const { error: techError } = await supabase
          .from("project_technologies")
          .insert(techInserts);

        if (techError) {
          console.error("Error updating technologies:", techError);
          return false;
        }
      }
    }

    return true;
  } catch (error) {
    console.error("Error in updateProject:", error);
    return false;
  }
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    // Delete project (technologies will be deleted via cascade)
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      console.error("Error deleting project:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in deleteProject:", error);
    return false;
  }
}

// Profiles API
export async function getProfile(
  userId: string,
): Promise<Tables<"profiles"> | null> {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in getProfile:", error);
    return null;
  }
}

export async function updateProfile(
  userId: string,
  profile: UpdateTables<"profiles">,
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("profiles")
      .update(profile)
      .eq("id", userId);

    if (error) {
      console.error("Error updating profile:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in updateProfile:", error);
    return false;
  }
}
