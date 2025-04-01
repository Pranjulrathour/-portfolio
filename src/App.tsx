import { Suspense } from "react";
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
import ClickSpark from "./components/ui/click-spark";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
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
  );
}

function App() {
  return (
    <AuthProvider>
      <ClickSpark sparkColor="#3b82f6" sparkSize={6} sparkRadius={25} sparkCount={10} duration={500}>
        <LoadingScreen />
        <Suspense fallback={null}>
          <AppRoutes />
        </Suspense>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </ClickSpark>
    </AuthProvider>
  );
}

export default App;
