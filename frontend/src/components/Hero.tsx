import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, BrainCircuit, TestTubes, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const Hero = () => {
  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center bg-background overflow-hidden">
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
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent dark:from-black/90 dark:via-black/60" />
      <div className="absolute bottom-0 left-0 right-0 z-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:px-8 flex items-center">
        <motion.div 
          className="max-w-2xl w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm shadow-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-xs tracking-widest uppercase font-semibold">
              AI-POWERED SOIL ANALYSIS
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 variants={itemVariants} className="flex flex-col gap-2">
            <span className="text-white dark:text-foreground font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight">
              Analyze Your Soil.
            </span>
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight pb-2">
              Grow Smarter.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={itemVariants} className="text-gray-300 dark:text-muted-foreground text-lg md:text-xl max-w-lg mt-6 leading-relaxed">
            AI-powered soil analysis to understand nutrient conditions and make smarter agricultural decisions, right from your fields.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-10">
            <Button asChild size="lg" className="rounded-full px-8 py-6 text-base shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
              <Link to="/analysis">
                Start Soil Analysis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={handleScroll}
              className="rounded-full px-8 py-6 text-base bg-transparent border-gray-500 text-gray-200 hover:bg-white/10 hover:text-white dark:border-border dark:text-foreground dark:hover:bg-accent"
            >
              How It Works
            </Button>
          </motion.div>

          {/* Feature Badges */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap gap-6 mt-14">
            <div className="flex items-center gap-2 text-sm text-gray-300 dark:text-muted-foreground font-medium">
              <BrainCircuit className="w-5 h-5 text-primary" />
              <span>AI Powered Predictions</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300 dark:text-muted-foreground font-medium">
              <TestTubes className="w-5 h-5 text-primary" />
              <span>NPK & Moisture Analysis</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300 dark:text-muted-foreground font-medium">
              <Lightbulb className="w-5 h-5 text-primary" />
              <span>Smart Recommendations</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

