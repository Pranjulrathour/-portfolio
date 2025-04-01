import { motion, useScroll, useTransform } from "framer-motion";
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
  Code2,
  Coffee,
  Flame,
  Laptop,
  Sparkles,
  Trophy,
  Globe2,
  Loader2,
  Brain,
  Boxes,
  Bot,
  LayoutGrid,
  Cpu,
  GitBranch,
  Terminal,
  Network,
  Layers
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRef, useEffect } from "react";
import { useProjectStats } from "@/hooks/useProjectStats";
import SkillsMarquee from './SkillsMarquee';

const baseStats = [
  { label: "Cups of Coffee", value: "247", icon: <Coffee className="w-5 h-5" /> },
  { label: "Lines of Code", value: "10k+", icon: <Code2 className="w-5 h-5" /> },
];

const skills = [
  { name: "React.js", level: 85, icon: <Code2 className="w-5 h-5" /> },
  { name: "Next.js", level: 80, icon: <LayoutGrid className="w-5 h-5" /> },
  { name: "TypeScript", level: 75, icon: <Terminal className="w-5 h-5" /> },
  { name: "Node.js", level: 70, icon: <GitBranch className="w-5 h-5" /> },
  { name: "Python", level: 65, icon: <Cpu className="w-5 h-5" /> },
];

const expertiseAreas = [
  {
    title: "Web3 Engineer",
    description: "Building decentralized applications and blockchain solutions",
    icon: <Network className="w-6 h-6 text-primary" />,
  },
  {
    title: "Full Stack",
    description: "End-to-end application development",
    icon: <Laptop className="w-6 h-6 text-primary" />,
  },
  {
    title: "AI Engineer",
    description: "Building intelligent systems and ML models",
    icon: <Brain className="w-6 h-6 text-primary" />,
  },
  {
    title: "Product Manager",
    description: "Leading product strategy and development",
    icon: <Boxes className="w-6 h-6 text-primary" />,
  },
  {
    title: "AI Agents Dev",
    description: "Developing autonomous AI agents and systems",
    icon: <Bot className="w-6 h-6 text-primary" />,
  },
  {
    title: "Machine Learning Dev",
    description: "Implementing advanced ML algorithms and models",
    icon: <Layers className="w-6 h-6 text-primary" />,
  }
];

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const { stats: projectStats, loading, error } = useProjectStats();

  // Debug logging
  useEffect(() => {
    console.log('About Section - Project Stats:', { projectStats, loading, error });
  }, [projectStats, loading, error]);

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const allStats = [
    { 
      label: "Projects Completed", 
      value: loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : error ? (
        "N/A"
      ) : (
        `${projectStats.totalProjects}+`
      ), 
      icon: <Trophy className="w-5 h-5" /> 
    },
    ...baseStats
  ];

  return (
    <section className="py-24 relative overflow-hidden" ref={containerRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4"
            >
              About Me
            </motion.h1>
          </div>

          {/* Header Content */}
          <motion.div 
            className="text-center mb-16"
            style={{ opacity, y }}
          >
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent pb-4">
              Hi, I'm PRANJUL RATHOUR
              <span className="inline-block ml-2 animate-wave">👋</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A passionate full-stack developer and AI engineer, focused on crafting clean & user‑friendly experiences while building intelligent systems that make a difference.
            </p>
          </motion.div>

          {/* Profile Image Section */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden border border-border/50 bg-muted/30 backdrop-blur-sm"
            >
              <img 
                src="/WhatsApp Image 2025-04-01 at 02.09.51_5082f2ca.jpg"
                alt="Profile" 
                className="w-full h-[400px] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
              
              {/* Stats Cards */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="grid grid-cols-3 gap-4">
                  {allStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-background/50 backdrop-blur-md rounded-xl p-4 border border-border/50"
                    >
                      <div className="flex items-center gap-2 mb-1 text-primary">
                        {stat.icon}
                      </div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Expertise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {expertiseAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl bg-background/50 backdrop-blur-md p-6 border border-border/50 hover:border-primary/50 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit">
                    {area.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{area.title}</h3>
                  <p className="text-muted-foreground">{area.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Skills Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold flex items-center gap-2 mb-8">
              <Flame className="w-6 h-6 text-primary" />
              Skills & Technologies
            </h3>
            <SkillsMarquee />
          </div>
        </div>
      </div>
    </section>
  );
}
