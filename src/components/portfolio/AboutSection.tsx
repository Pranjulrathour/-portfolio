import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Code,
  Palette,
  Lightbulb,
  Rocket,
  Zap,
  Globe,
  Database,
  Server,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AboutSection() {
  const skills = [
    {
      name: "Frontend Development",
      icon: <Code className="h-6 w-6" />,
      description:
        "Building responsive and performant web applications using modern frameworks and technologies.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    },
    {
      name: "UI/UX Design",
      icon: <Palette className="h-6 w-6" />,
      description:
        "Creating intuitive user interfaces with a focus on usability, accessibility, and aesthetics.",
      technologies: ["Figma", "Adobe XD", "Sketch", "Framer"],
    },
    {
      name: "Backend Development",
      icon: <Server className="h-6 w-6" />,
      description:
        "Building robust server-side applications and APIs to power web and mobile applications.",
      technologies: ["Node.js", "Express", "Python", "Django"],
    },
    {
      name: "Database Management",
      icon: <Database className="h-6 w-6" />,
      description:
        "Designing and optimizing database schemas for efficient data storage and retrieval.",
      technologies: ["PostgreSQL", "MongoDB", "Supabase", "Firebase"],
    },
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              About Me
            </h2>

            <div className="flex flex-wrap gap-2 mb-6">
              <Badge
                variant="outline"
                className="px-3 py-1 text-sm bg-primary/10 border-primary/20"
              >
                <Zap className="mr-1 h-3.5 w-3.5" /> Full Stack Developer
              </Badge>
              <Badge
                variant="outline"
                className="px-3 py-1 text-sm bg-purple-500/10 border-purple-500/20"
              >
                <Palette className="mr-1 h-3.5 w-3.5" /> UI/UX Designer
              </Badge>
              <Badge
                variant="outline"
                className="px-3 py-1 text-sm bg-blue-500/10 border-blue-500/20"
              >
                <Globe className="mr-1 h-3.5 w-3.5" /> Web Developer
              </Badge>
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              I'm a passionate web developer and designer with a strong focus on
              creating beautiful, functional, and user-friendly digital
              experiences. With several years of experience in the industry,
              I've had the opportunity to work on a variety of projects across
              different sectors.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              My approach combines technical expertise with creative
              problem-solving, allowing me to build solutions that not only look
              great but also perform exceptionally well. I'm constantly learning
              and exploring new technologies to stay at the forefront of web
              development.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When I'm not coding, you can find me exploring new design trends,
              contributing to open-source projects, or enjoying outdoor
              activities to recharge my creative energy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border border-border/40 bg-muted/30 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-primary bg-primary/10 p-3 rounded-full inline-flex mb-4">
                        {skill.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {skill.name}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {skill.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {skill.technologies.map((tech) => (
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
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
