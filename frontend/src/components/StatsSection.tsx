import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Users, Target, BarChart3 } from 'lucide-react';

const statsData = [
  { icon: FlaskConical, value: 2500, suffix: '+', label: 'Soil Analyses' },
  { icon: Users, value: 1500, suffix: '+', label: 'Happy Users' },
  { icon: Target, value: 95, suffix: '%', label: 'Model Accuracy' },
  { icon: BarChart3, value: 20, suffix: '+', label: 'Soil Parameters' },
];

const StatItem = ({ stat }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startTime = null;
          const end = stat.value;
          const duration = 2000;
          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const easeOut = Math.min(progress / duration, 1) * (2 - Math.min(progress / duration, 1));
            setCount(Math.floor(easeOut * end));
            if (progress < duration) requestAnimationFrame(step);
            else setCount(end);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stat.value]);

  const Icon = stat.icon;

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
    </div>
  );
};

export default function StatsSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="border-y border-border"
      style={{ background: 'linear-gradient(135deg, var(--secondary) 0%, var(--muted) 50%, var(--secondary) 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <StatItem key={index} stat={stat} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
