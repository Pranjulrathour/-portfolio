export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          website: string | null;
          bio: string | null;
          is_admin: boolean | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          bio?: string | null;
          is_admin?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          bio?: string | null;
          is_admin?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          content: string | null;
          image_url: string | null;
          secondary_image_url: string | null;
          demo_url: string | null;
          github_url: string | null;
          duration: string | null;
          completion_date: string | null;
          role: string | null;
          client: string | null;
          featured: boolean | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description: string;
          content?: string | null;
          image_url?: string | null;
          secondary_image_url?: string | null;
          demo_url?: string | null;
          github_url?: string | null;
          duration?: string | null;
          completion_date?: string | null;
          role?: string | null;
          client?: string | null;
          featured?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string;
          content?: string | null;
          image_url?: string | null;
          secondary_image_url?: string | null;
          demo_url?: string | null;
          github_url?: string | null;
          duration?: string | null;
          completion_date?: string | null;
          role?: string | null;
          client?: string | null;
          featured?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      project_technologies: {
        Row: {
          id: string;
          project_id: string;
          technology: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          project_id: string;
          technology: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          project_id?: string;
          technology?: string;
          created_at?: string | null;
        };
      };
      achievements: {
        Row: {
          id: string;
          place: string;
          product: string;
          description: string;
          image_url: string | null;
          secondary_image_url: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          place: string;
          product: string;
          description: string;
          image_url?: string | null;
          secondary_image_url?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          place?: string;
          product?: string;
          description?: string;
          image_url?: string | null;
          secondary_image_url?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      reach: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          message: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          message: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          message?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

export interface Project {
  id?: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  image_url?: string;
  demo_url?: string;
  github_url?: string;
  technologies: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Achievement {
  id?: string;
  place: string;
  product: string;
  description: string;
  image_url?: string;
  secondary_image_url?: string;
  created_at?: string;
  updated_at?: string;
}
