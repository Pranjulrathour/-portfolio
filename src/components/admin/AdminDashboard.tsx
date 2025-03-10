import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ProjectForm from "./ProjectForm";
import AddProjectForm from "./AddProjectForm";
import ProjectList from "./ProjectList";
import AchievementForm from "./AchievementForm";
import AddAchievementForm from "./AddAchievementForm";
import AchievementList from "./AchievementList";
import { Project, Achievement } from "@/lib/supabase/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/supabase/auth";

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("projects");
  const [showForm, setShowForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(
    undefined,
  );
  const [selectedAchievement, setSelectedAchievement] = useState<
    Achievement | undefined
  >(undefined);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    // If not admin, redirect to login
    if (!isAdmin) {
      navigate("/login");
    }
  }, [isAdmin, navigate]);

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setSelectedAchievement(undefined);
    setShowForm(true);
    setShowAddForm(false);
  };

  const handleEditAchievement = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setSelectedProject(undefined);
    setShowForm(true);
    setShowAddForm(false);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setShowAddForm(false);
    setSelectedProject(undefined);
    setSelectedAchievement(undefined);
    setRefreshTrigger((prev) => prev + 1);
  };

  const renderAddButton = () => {
    if (showForm || showAddForm) return null;

    if (activeTab === "projects") {
      return (
        <Button onClick={() => setShowAddForm(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> New Project
        </Button>
      );
    }

    if (activeTab === "achievements") {
      return (
        <Button onClick={() => setShowAddForm(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> New Achievement
        </Button>
      );
    }

    return null;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        {renderAddButton()}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="achievements">Elite Achievements</TabsTrigger>
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
          ) : showAddForm ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Add New Project</h2>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
              <AddProjectForm onSuccess={handleFormSuccess} />
            </div>
          ) : (
            <ProjectList
              onEdit={handleEditProject}
              refreshTrigger={refreshTrigger}
            />
          )}
        </TabsContent>

        <TabsContent value="achievements">
          {showForm ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  {selectedAchievement ? "Edit Achievement" : "New Achievement"}
                </h2>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setSelectedAchievement(undefined);
                  }}
                >
                  Cancel
                </Button>
              </div>
              <AchievementForm
                achievement={selectedAchievement}
                onSuccess={handleFormSuccess}
              />
            </div>
          ) : showAddForm ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Add New Achievement</h2>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
              <AddAchievementForm onSuccess={handleFormSuccess} />
            </div>
          ) : (
            <AchievementList
              onEdit={handleEditAchievement}
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
              <p>Email: {user?.email || "Admin"}</p>
              <p>Admin Status: Administrator</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
