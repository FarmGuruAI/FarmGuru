import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingState() {
  return (
    <div className="bg-soil-card/50 border border-soil-border rounded-2xl w-full">
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-soil-border border-t-primary-500 rounded-full animate-spin"></div>
        
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center mt-6"
        >
          <div className="text-gray-300 text-lg flex items-center">
            Analyzing your soil
            <span className="flex ml-1">
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}>.</motion.span>
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}>.</motion.span>
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}>.</motion.span>
            </span>
          </div>
          <div className="text-gray-500 text-sm mt-2">
            Our AI model is processing your NPK values
          </div>
        </motion.div>
      </div>
    </div>
  );
}
