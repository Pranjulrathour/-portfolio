import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../portfolio/Navbar";
import Footer from "../portfolio/Footer";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowLeft, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { getProjectBySlug, Project } from "@/lib/supabase/api";
import { AuthProvider } from "@/lib/supabase/auth";
import BackgroundWrapper from "@/components/ui/background-wrapper";

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const projectData = await getProjectBySlug(slug);

        if (projectData) {
          setProject(projectData);
        } else {
          setError("Project not found");
          // Navigate to projects page after a delay if project not found
          setTimeout(() => navigate("/projects"), 2000);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to load project details");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug, navigate]);

  if (loading) {
    return (
      <AuthProvider>
        <BackgroundWrapper>
          <div className="min-h-screen bg-background bg-opacity-70">
            <Navbar />
            <div className="pt-24 pb-20 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">
                  Loading project details...
                </p>
              </div>
            </div>
            <Footer />
          </div>
        </BackgroundWrapper>
      </AuthProvider>
    );
  }

  if (error) {
    return (
      <AuthProvider>
        <BackgroundWrapper>
          <div className="min-h-screen bg-background bg-opacity-70">
            <Navbar />
            <div className="pt-24 pb-20 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-red-500 mb-4">
                  {error}
                </h2>
                <p className="text-muted-foreground mb-6">
                  Redirecting to projects page...
                </p>
                <Button asChild>
                  <Link to="/projects">View All Projects</Link>
                </Button>
              </div>
            </div>
            <Footer />
          </div>
        </BackgroundWrapper>
      </AuthProvider>
    );
  }

  // Fallback to a default project if none is found
  const projectData = project || {
    title: "Project Not Found",
    description: "This project could not be found or has been removed.",
    content: "No content available.",
    image_url:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&q=80",
    technologies: ["N/A"],
    demo_url: null,
    github_url: null,
    completion_date: "N/A",
    duration: "N/A",
    client: "N/A",
    role: "N/A",
  };

  return (
    <AuthProvider>
      <BackgroundWrapper>
        <div className="min-h-screen bg-background bg-opacity-70">
          <Navbar />

          <div className="pt-24 pb-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  to="/projects"
                  className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 group"
                >
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to Projects
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                      {projectData.title}
                    </h1>

                    <p className="text-muted-foreground text-lg mb-6">
                      {projectData.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {projectData.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-background/50"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="mb-8 flex gap-4">
                      {projectData.demo_url && (
                        <Button asChild className="group">
                          <a
                            href={projectData.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {projectData.github_url && (
                        <Button variant="outline" asChild className="group">
                          <a
                            href={projectData.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                            Source Code
                          </a>
                        </Button>
                      )}
                    </div>

                    <div className="aspect-video overflow-hidden rounded-lg mb-8">
                      <img
                        src={
                          projectData.image_url ||
                          "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&q=80"
                        }
                        alt={projectData.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      {projectData.content}
                    </div>
                  </div>

                  <div>
                    <div className="bg-muted/30 rounded-lg p-6 border border-border/40 sticky top-24">
                      <h3 className="text-xl font-semibold mb-4">
                        Project Details
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Date</p>
                            <p className="text-muted-foreground">
                              {projectData.completion_date}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Duration</p>
                            <p className="text-muted-foreground">
                              {projectData.duration}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 text-muted-foreground mt-0.5"
                          >
                            <path d="M20 7h-9"></path>
                            <path d="M14 17H5"></path>
                            <circle cx="17" cy="17" r="3"></circle>
                            <circle cx="7" cy="7" r="3"></circle>
                          </svg>
                          <div>
                            <p className="font-medium">Client</p>
                            <p className="text-muted-foreground">
                              {projectData.client}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 text-muted-foreground mt-0.5"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                          <div>
                            <p className="font-medium">Role</p>
                            <p className="text-muted-foreground">
                              {projectData.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <Footer />
        </div>
      </BackgroundWrapper>
    </AuthProvider>
  );
}
