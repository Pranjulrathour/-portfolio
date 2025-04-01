import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "./client";
import { Tables } from "./types";

type Profile = Tables<"profiles">;

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, fullName: string) => Promise<any>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check for hardcoded user in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser as User);
        setIsAdmin(true);
        setLoading(false);
        return;
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }

    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for changes on auth state (signed in, signed out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const adminUser = {
            id: session.user.id,
            email: session.user.email,
            user_metadata: session.user.user_metadata,
            app_metadata: session.user.app_metadata,
            aud: session.user.aud,
            created_at: session.user.created_at
          };
          setUser(adminUser);
          setIsAdmin(session.user.email === 'admin@example.com');
        } else {
          setUser(null);
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else if (data) {
        setProfile(data);
        setIsAdmin(data.is_admin || false);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      // The profile will be created automatically by the database trigger
      // No need to manually create a profile here

      return data;
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    // For hardcoded admin user
    if (email === "pranjulrathour41@gmail.com" && password === "pranjul1234") {
      const adminUser = {
        id: 'admin-user',
        email: "pranjulrathour41@gmail.com",
        user_metadata: { full_name: "Pranjul Rathour" },
        app_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString()
      } as User;
      localStorage.setItem("user", JSON.stringify(adminUser));
      setUser(adminUser);
      setIsAdmin(true);
      return { user: adminUser };
    }

    // Regular Supabase auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    // Clear hardcoded user
    localStorage.removeItem("user");
    setUser(null);
    setIsAdmin(false);

    // Also sign out from Supabase if there's a session
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
