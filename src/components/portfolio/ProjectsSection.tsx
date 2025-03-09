import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getProjects, Project } from "@/lib/supabase/api";
import { FlipCard } from "@/components/ui/flip-card";

interface ProjectsSectionProps {
  projects?: Project[];
}

// Fallback projects in case API fails
const fallbackProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description:
      "A modern e-commerce platform with cart functionality and payment integration.",
    image_url:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    demo_url: "https://example.com",
    github_url: "https://github.com",
    slug: "ecommerce-platform",
    featured: true,
    content: null,
    secondary_image_url: null,
    duration: "3 months",
    completion_date: "June 2023",
    role: "Lead Developer",
    client: "RetailCo Inc.",
    created_at: null,
    updated_at: null,
  },
  {
    id: "2",
    title: "Portfolio Website",
    description:
      "A minimalist portfolio website with smooth animations and responsive design.",
    image_url:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&q=80",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    demo_url: "https://example.com",
    github_url: "https://github.com",
    slug: "portfolio-website",
    featured: true,
    content: null,
    secondary_image_url: null,
    duration: "1 month",
    completion_date: "May 2023",
    role: "Frontend Developer",
    client: "Personal Project",
    created_at: null,
    updated_at: null,
  },
];

export default function ProjectsSection({
  projects: initialProjects,
}: ProjectsSectionProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [projects, setProjects] = useState<Project[]>(initialProjects || []);
  const [loading, setLoading] = useState(!initialProjects);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in as admin
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setIsAdmin(!!user.is_admin);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    // If projects were not passed as props, fetch them
    if (!initialProjects) {
      const fetchProjects = async () => {
        try {
          setLoading(true);
          const data = await getProjects();
          if (data && data.length > 0) {
            setProjects(data);
          } else {
            // Use fallback projects if API returns empty
            setProjects(fallbackProjects);
            setError(
              "Could not load projects from database, showing sample projects",
            );
          }
        } catch (err) {
          console.error("Error fetching projects:", err);
          setProjects(fallbackProjects);
          setError("Failed to load projects, showing sample projects");
        } finally {
          setLoading(false);
        }
      };

      fetchProjects();
    }
  }, [initialProjects]);

  // For the main page, only show featured projects or the first 3
  const displayedProjects =
    window.location.pathname === "/"
      ? projects.filter((p) => p.featured).length > 0
        ? projects.filter((p) => p.featured)
        : projects.slice(0, 3)
      : projects;

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            {window.location.pathname === "/"
              ? "Featured Projects"
              : "My Projects"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work. Each project is unique and solves
            specific problems.
          </p>

          {error && <p className="text-amber-500 mt-2 text-sm">{error}</p>}

          {isAdmin && (
            <div className="mt-4">
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => {
                  // Force navigation to admin page
                  window.location.href = "/admin";
                }}
              >
                Manage Projects
              </Button>
            </div>
          )}
        </div>

        {displayedProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No projects found. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-[400px]"
              >
                <FlipCard
                  frontContent={
                    <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300 bg-muted/30 border border-border/40 group">
                      <div className="aspect-video overflow-hidden relative">
                        <img
                          src={
                            project.image_url ||
                            "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80"
                          }
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {project.featured && (
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-primary/90 hover:bg-primary text-white">
                              Featured
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="bg-background/50"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge
                              variant="secondary"
                              className="bg-background/50"
                            >
                              +{project.technologies.length - 3}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  }
                  backContent={
                    <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300 bg-muted/30 border border-border/40 group p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-primary">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="bg-background/50"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="mt-auto">
                        <div className="flex gap-4 justify-between items-center">
                          <div className="flex gap-2">
                            {project.demo_url && (
                              <a
                                href={project.demo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 group/link"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink
                                  size={16}
                                  className="transition-transform group-hover/link:scale-110"
                                />
                                <span>Live Demo</span>
                              </a>
                            )}
                            {project.github_url && (
                              <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 group/link"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Github
                                  size={16}
                                  className="transition-transform group-hover/link:scale-110"
                                />
                                <span>Source</span>
                              </a>
                            )}
                          </div>
                          <Link
                            to={`/projects/${project.slug}`}
                            className="text-primary flex items-center gap-1 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View Details
                            <ArrowUpRight size={16} />
                          </Link>
                        </div>
                      </div>
                    </Card>
                  }
                />
              </motion.div>
            ))}
          </div>
        )}

        {window.location.pathname === "/" && projects.length > 3 && (
          <div className="mt-12 text-center">
            <Button
              asChild
              variant="outline"
              className="rounded-full px-8 group"
            >
              <Link to="/projects">
                View All Projects
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y--1" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
