import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, BrainCircuit, TestTubes, Lightbulb } from 'lucide-react';
import heroImage from '../assets/soil-analysis-hero.jpg';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Hero = () => {
  const handleScroll = (e) => {
    e.preventDefault();
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center bg-soil-bg overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 z-0 h-40 bg-gradient-to-t from-soil-dark via-soil-dark/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:px-8 flex items-center">
        <motion.div 
          className="max-w-2xl w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-primary-900/60 border border-primary-500/30 px-4 py-1.5 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-primary-400 text-xs tracking-widest uppercase font-semibold">
              AI-POWERED SOIL ANALYSIS
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 variants={itemVariants} className="flex flex-col gap-2">
            <span className="text-soil-text font-extrabold text-5xl md:text-6xl lg:text-7xl leading-tight">
              Analyze Your Soil.
            </span>
            <span className="bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent font-extrabold text-5xl md:text-6xl lg:text-7xl leading-tight pb-2">
              Grow Smarter.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={itemVariants} className="text-soil-muted text-lg max-w-lg mt-6">
            AI-powered soil analysis to understand nutrient conditions and make smarter agricultural decisions.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link 
              to="/analysis"
              className="inline-flex justify-center items-center gap-2 bg-primary-600 hover:bg-primary-500 text-soil-text px-8 py-3.5 rounded-xl font-semibold transition-colors"
            >
              Start Soil Analysis
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button 
              onClick={handleScroll}
              className="inline-flex justify-center items-center gap-2 border border-gray-600 hover:border-primary-500 text-gray-200 px-8 py-3.5 rounded-xl font-semibold transition-colors"
            >
              How It Works
            </button>
          </motion.div>

          {/* Feature Badges */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap gap-6 mt-12">
            <div className="flex items-center gap-2 text-sm text-soil-muted font-medium">
              <BrainCircuit className="w-5 h-5 text-primary-500" />
              <span>AI Powered Predictions</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-soil-muted font-medium">
              <TestTubes className="w-5 h-5 text-primary-500" />
              <span>NPK & Moisture Analysis</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-soil-muted font-medium">
              <Lightbulb className="w-5 h-5 text-primary-500" />
              <span>Smart Recommendations</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
