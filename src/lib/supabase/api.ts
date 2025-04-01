import { supabase } from "./client";
import { Tables, InsertTables, UpdateTables } from "./types";
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

export type Project = Tables<"projects"> & { technologies: string[] };
export type Achievement = Tables<"achievements">;

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

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

// Achievements API
export async function getAchievements(): Promise<Achievement[]> {
  try {
    const { data, error } = await supabase
      .from("achievements")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching achievements:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in getAchievements:", error);
    return [];
  }
}

export async function getAchievementById(
  id: string,
): Promise<Achievement | null> {
  try {
    const { data, error } = await supabase
      .from("achievements")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching achievement:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in getAchievementById:", error);
    return null;
  }
}

export async function createAchievement(
  achievement: InsertTables<"achievements">,
): Promise<Achievement | null> {
  try {
    console.log("Creating achievement with data:", achievement);
    const { data, error } = await supabase
      .from("achievements")
      .insert([achievement])
      .select()
      .single();

    if (error) {
      console.error("Error creating achievement:", error);
      return null;
    }

    console.log("Achievement created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error in createAchievement:", error);
    return null;
  }
}

export async function updateAchievement(
  id: string,
  achievement: UpdateTables<"achievements">,
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("achievements")
      .update(achievement)
      .eq("id", id);

    if (error) {
      console.error("Error updating achievement:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in updateAchievement:", error);
    return false;
  }
}

export async function deleteAchievement(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("achievements").delete().eq("id", id);

    if (error) {
      console.error("Error deleting achievement:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in deleteAchievement:", error);
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

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create a Supabase client with the anon key for public operations
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export const submitContactForm = async (formData: ContactFormData) => {
  try {
    console.log('Submitting form data:', formData);
    
    const { data, error } = await supabaseClient
      .from('reach')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          created_at: new Date().toISOString()
        }
      ])
      .select('*')
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Form submission successful:', data);
    return { data, error: null };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};
