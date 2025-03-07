import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Palette, Lightbulb, Rocket } from "lucide-react";

export default function AboutSection() {
  const skills = [
    {
      name: "Development",
      icon: <Code className="h-6 w-6" />,
      description:
        "Building responsive and performant web applications using modern frameworks and technologies.",
    },
    {
      name: "Design",
      icon: <Palette className="h-6 w-6" />,
      description:
        "Creating intuitive user interfaces with a focus on usability, accessibility, and aesthetics.",
    },
    {
      name: "Problem Solving",
      icon: <Lightbulb className="h-6 w-6" />,
      description:
        "Finding elegant solutions to complex problems through creative thinking and technical expertise.",
    },
    {
      name: "Deployment",
      icon: <Rocket className="h-6 w-6" />,
      description:
        "Setting up CI/CD pipelines and deploying applications to various hosting platforms.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              I'm a passionate web developer and designer with a strong focus on
              creating beautiful, functional, and user-friendly digital
              experiences. With several years of experience in the industry,
              I've had the opportunity to work on a variety of projects across
              different sectors.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              My approach combines technical expertise with creative
              problem-solving, allowing me to build solutions that not only look
              great but also perform exceptionally well. I'm constantly learning
              and exploring new technologies to stay at the forefront of web
              development.
            </p>
            <p className="text-gray-600 leading-relaxed">
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
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="text-primary mb-4">{skill.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">
                        {skill.name}
                      </h3>
                      <p className="text-gray-600">{skill.description}</p>
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
