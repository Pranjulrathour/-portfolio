import { useParams } from "react-router-dom";
import Navbar from "../portfolio/Navbar";
import Footer from "../portfolio/Footer";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowLeft, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthProvider } from "@/lib/supabase/auth";

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  // This would normally come from an API or database
  // For demo purposes, we're using hardcoded data
  const project = {
    title: "E-commerce Platform",
    description:
      "A modern e-commerce platform with cart functionality and payment integration.",
    fullDescription: (
      <>
        <p className="mb-4">
          This e-commerce platform was built to provide a seamless shopping
          experience for users. It features a responsive design, intuitive
          navigation, and a streamlined checkout process.
        </p>
        <p className="mb-4">
          The application uses React for the frontend, with state management
          handled by Redux. The backend is built with Node.js and Express, with
          MongoDB as the database. Payment processing is handled by Stripe's
          API.
        </p>
        <p className="mb-4">Key features include:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>User authentication and profile management</li>
          <li>Product browsing with filtering and search capabilities</li>
          <li>Shopping cart with persistent storage</li>
          <li>Secure checkout with Stripe integration</li>
          <li>Order history and tracking</li>
          <li>Admin dashboard for product and order management</li>
        </ul>
        <p>
          The project was completed over a period of three months, with regular
          client feedback incorporated throughout the development process.
        </p>
      </>
    ),
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&q=80",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Stripe",
      "Redux",
      "Express",
      "JWT",
    ],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
    date: "June 2023",
    duration: "3 months",
    client: "RetailCo Inc.",
    role: "Lead Developer",
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
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
                    {project.title}
                  </h1>

                  <p className="text-muted-foreground text-lg mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
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

                  <div className="mb-8 flex gap-4">
                    {project.demoUrl && (
                      <Button asChild className="group">
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="outline" asChild className="group">
                        <a
                          href={project.githubUrl}
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
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    {project.fullDescription}
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
                            {project.date}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Duration</p>
                          <p className="text-muted-foreground">
                            {project.duration}
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
                            {project.client}
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
                            {project.role}
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
    </AuthProvider>
  );
}
