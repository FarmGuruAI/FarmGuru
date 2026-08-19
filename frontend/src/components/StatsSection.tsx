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
          let start = 0;
          const end = stat.value;
          const duration = 2000;
          let startTime = null;

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            
            // Ease out quad
            const easeOut = percentage * (2 - percentage);
            setCount(Math.floor(easeOut * end));

            if (progress < duration) {
              requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [stat.value]);

  const Icon = stat.icon;

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <Icon className="w-8 h-8 text-primary-400 mb-4" />
      <div className="text-3xl md:text-4xl font-bold text-soil-text mb-1">
        {count}{stat.suffix}
      </div>
      <div className="text-soil-muted text-sm">{stat.label}</div>
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
      className="bg-gradient-to-r from-soil-card via-primary-950/30 to-soil-card border-y border-soil-border"
    >
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <StatItem key={index} stat={stat} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
