import { useEffect, useRef, useState } from 'react';
import { skillList } from './skillsData';
import { motion } from 'framer-motion';

type MarqueeAnimationType = (
  element: HTMLElement,
  elementWidth: number,
) => Animation;

const marqueeAnimation: MarqueeAnimationType = (element, elementWidth) => {
  return element.animate(
    [
      { transform: 'translateX(0)' }, 
      { transform: `translateX(-${elementWidth / 2}px)` }
    ],
    {
      duration: 30000,
      easing: 'linear',
      iterations: Infinity,
    },
  );
};

type MarqueeProps = {
  skills?: typeof skillList;
};

const SkillsMarquee: React.FC<MarqueeProps> = ({ skills = skillList }) => {
  const skillsElementRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const animationRef = useRef<Animation | null>(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    if (skillsElementRef.current) {
      const elementWidth = skillsElementRef.current.getBoundingClientRect().width;
      animationRef.current = marqueeAnimation(skillsElementRef.current as HTMLElement, elementWidth);
    }

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);

  const handleMouseEnter = () => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  };

  return (
    <motion.div 
      className="relative overflow-x-hidden rounded-xl bg-background/50 backdrop-blur-md border border-zinc-800/50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        id="skills" 
        className="w-max whitespace-nowrap p-5 lg:p-7" 
        ref={skillsElementRef}
      >
        <div className="flex gap-6 lg:gap-8">
          {[...skills, ...skills].map(({ name, logo, bgColor }, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 bg-background/30 backdrop-blur-sm rounded-lg px-5 py-3 border border-zinc-800/50 hover:bg-purple-500/5 transition-colors group"
            >
              <div className={`p-3 rounded-md ${bgColor} group-hover:bg-purple-500/20 transition-colors flex items-center justify-center w-14 h-14`}>
                <img 
                  src={logo} 
                  alt={name} 
                  className="w-8 h-8 object-contain dark:invert-[0.85]" 
                  loading="lazy"
                  style={{
                    filter: 'contrast(1.2) saturate(1.2)',
                  }}
                />
              </div>
              <div className="font-medium text-base whitespace-nowrap">{name}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsMarquee; 