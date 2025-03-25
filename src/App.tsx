import { Suspense, useState, useEffect } from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import Dashboard from "./components/pages/dashboard";
import Success from "./components/pages/success";
import LandingPage from "./components/pages/portfolio/LandingPage";
import AboutPage from "./components/pages/about";
import ProjectsPage from "./components/pages/projects";
import AchievementsPage from "./components/pages/achievements";
import ContactPage from "./components/pages/contact";
import ProjectDetailPage from "./components/pages/project-detail";
import AchievementDetailPage from "./components/pages/achievement-detail";
import AdminPage from "./components/pages/admin";
import { AuthProvider, useAuth } from "@/lib/supabase/auth";
import LoadingScreen from "@/components/LoadingScreen";

// Dynamically import ClickSpark to avoid rendering issues
const DynamicClickSpark = () => {
  const [ClickSparkComponent, setClickSparkComponent] = useState<React.ComponentType<any> | null>(null);
  
  useEffect(() => {
    const loadComponent = async () => {
      try {
        const module = await import("@/components/ui/ClickSpark");
        setClickSparkComponent(() => module.default);
      } catch (error) {
        console.error("Failed to load ClickSpark:", error);
      }
    };
    
    loadComponent();
  }, []);
  
  return ClickSparkComponent;
};

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if user exists and is admin
  if (!user || !isAdmin) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/achievements/:id" element={<AchievementDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/success" element={<Success />} />
      </Routes>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <LoadingScreen />
      <Suspense fallback={<p>Loading...</p>}>
        <AppRoutes />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
