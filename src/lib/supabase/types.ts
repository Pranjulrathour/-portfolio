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
    };
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
