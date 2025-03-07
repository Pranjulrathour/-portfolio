import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  slug: string;
  featured?: boolean;
}

interface ProjectsSectionProps {
  projects?: Project[];
}

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description:
      "A modern e-commerce platform with cart functionality and payment integration.",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
    slug: "ecommerce-platform",
    featured: true,
  },
  {
    id: "2",
    title: "Portfolio Website",
    description:
      "A minimalist portfolio website with smooth animations and responsive design.",
    image:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&q=80",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
    slug: "portfolio-website",
    featured: true,
  },
  {
    id: "3",
    title: "Task Management App",
    description:
      "A productivity app for managing tasks and projects with team collaboration features.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    technologies: ["React", "Firebase", "Tailwind CSS"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
    slug: "task-management-app",
  },
  {
    id: "4",
    title: "Music Streaming Service",
    description:
      "A Spotify-inspired music streaming platform with personalized recommendations.",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
    technologies: ["React", "Node.js", "PostgreSQL", "Redis"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
    slug: "music-streaming-service",
  },
  {
    id: "5",
    title: "AI Content Generator",
    description:
      "An AI-powered tool that generates marketing copy, blog posts, and social media content.",
    image:
      "https://images.unsplash.com/photo-1677442135968-6144fc1c8ffb?w=800&q=80",
    technologies: ["Next.js", "OpenAI API", "Tailwind CSS"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
    slug: "ai-content-generator",
  },
  {
    id: "6",
    title: "Real-time Chat Application",
    description:
      "A real-time messaging platform with channels, direct messages, and file sharing.",
    image:
      "https://images.unsplash.com/photo-1611746872915-64382b5c2a98?w=800&q=80",
    technologies: ["React", "Socket.io", "Express", "MongoDB"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
    slug: "real-time-chat-application",
  },
];

export default function ProjectsSection({
  projects = defaultProjects,
}: ProjectsSectionProps) {
  const [isAdmin, setIsAdmin] = useState(false);

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

  // For the main page, only show featured projects or the first 3
  const displayedProjects =
    window.location.pathname === "/"
      ? projects.filter((p) => p.featured).length > 0
        ? projects.filter((p) => p.featured)
        : projects.slice(0, 3)
      : projects;

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

          {isAdmin && (
            <div className="mt-4">
              <Button variant="outline" className="mt-2">
                <Link to="/admin">Manage Projects</Link>
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/projects/${project.slug}`} className="block h-full">
                <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300 bg-muted/30 border border-border/40 group">
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={project.image}
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
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
                    <div className="flex gap-4">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
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
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
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
                    <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight size={16} />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

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
