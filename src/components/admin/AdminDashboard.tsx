import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";
import { Project } from "@/lib/supabase/api";
import { useAuth } from "@/lib/supabase/auth";
import { Navigate } from "react-router-dom";

export default function AdminDashboard() {
  const { user, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("projects");
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(
    undefined,
  );
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/login" />;
  }

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelectedProject(undefined);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        {activeTab === "projects" && !showForm && (
          <Button onClick={() => setShowForm(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> New Project
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          {showForm ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  {selectedProject ? "Edit Project" : "New Project"}
                </h2>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setSelectedProject(undefined);
                  }}
                >
                  Cancel
                </Button>
              </div>
              <ProjectForm
                project={selectedProject}
                onSuccess={handleFormSuccess}
              />
            </div>
          ) : (
            <ProjectList
              onEdit={handleEditProject}
              refreshTrigger={refreshTrigger}
            />
          )}
        </TabsContent>

        <TabsContent value="settings">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <p className="text-gray-600 mb-4">
              Manage your admin account settings and preferences.
            </p>
            {/* Add settings form here */}
            <div className="text-sm text-gray-500">
              <p>Email: {user.email}</p>
              <p>Admin Status: {isAdmin ? "Administrator" : "User"}</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
