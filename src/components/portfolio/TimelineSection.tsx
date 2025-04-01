import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { GraduationCap, Calendar, School, Award } from "lucide-react";
import { useRef } from "react";

const educationData = [
  {
    id: 1,
    title: "Bachelor of Computer Applications (BCA)",
    institution: "Dr. Virendra Swarup Institute of Computer Studies",
    duration: "2023 - 2026",
    type: "Degree",
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    id: 2,
    title: "12th Grade",
    institution: "Priyadarshini Public Inter College",
    duration: "2023",
    percentage: "85.8%",
    type: "Higher Secondary",
    icon: <School className="w-6 h-6" />,
  },
  {
    id: 3,
    title: "10th Grade",
    institution: "Priyadarshini Public Inter College",
    duration: "2021",
    percentage: "88.5%",
    type: "Secondary",
    icon: <School className="w-6 h-6" />,
  },
];

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="py-20 bg-background relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
          >
            Education Timeline
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            My academic journey and achievements
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Animated vertical line */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary to-primary/70"
              style={{ 
                height: useTransform(lineHeight, [0, 1], ["0%", "100%"]),
                opacity: useTransform(lineHeight, [0, 0.1], [0, 0.2]) 
              }}
            />

            {educationData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.3,
                  type: "spring",
                  stiffness: 50 
                }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative mb-12 last:mb-0"
              >
                <div className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Content */}
                  <motion.div 
                    className="w-1/2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div 
                      className="bg-muted/30 p-6 rounded-xl border border-border/40 hover:border-primary/40 transition-colors shadow-lg hover:shadow-primary/10"
                      initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 50
                      }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <motion.span 
                          className="p-2 rounded-full bg-primary/10 text-primary"
                          initial={{ rotate: -180, opacity: 0 }}
                          whileInView={{ rotate: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.3 + 0.3 }}
                          viewport={{ once: true }}
                        >
                          {item.icon}
                        </motion.span>
                        <span className="text-sm font-medium text-muted-foreground">
                          {item.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground mb-2">{item.institution}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{item.duration}</span>
                        </div>
                        {item.percentage && (
                          <motion.div 
                            className="flex items-center gap-1"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.3 + 0.6 }}
                            viewport={{ once: true }}
                          >
                            <Award className="w-4 h-4" />
                            <span>{item.percentage}</span>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Timeline point */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <motion.div 
                      className="w-4 h-4 rounded-full bg-primary"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        delay: index * 0.3,
                        duration: 0.8
                      }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full bg-primary"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Empty space for alignment */}
                  <div className="w-1/2" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 