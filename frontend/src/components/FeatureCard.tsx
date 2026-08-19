import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative bg-card border border-border border-l-4 border-l-primary rounded-2xl p-6 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 group"
    >
      {/* Icon */}
      <div className="inline-flex items-center justify-center bg-primary/10 p-3 rounded-xl mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>

      {/* Content */}
      <h3 className="text-foreground font-semibold text-lg">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;
