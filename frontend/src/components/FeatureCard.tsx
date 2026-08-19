import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative bg-soil-card/80 backdrop-blur-sm border border-soil-border border-l-[3px] border-l-primary-500 rounded-2xl p-6 hover:border-primary-500/50 hover:bg-soil-card transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
    >
      {/* Icon */}
      <div className="inline-flex items-center justify-center bg-primary-900/50 p-3 rounded-xl mb-4">
        <Icon className="w-6 h-6 text-primary-400" />
      </div>

      {/* Content */}
      <h3 className="text-soil-text font-semibold text-lg">
        {title}
      </h3>
      <p className="text-soil-muted text-sm mt-2 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;
