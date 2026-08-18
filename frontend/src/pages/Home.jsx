import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, TestTubes, HeartPulse, Lightbulb } from 'lucide-react';
import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import SoilInputForm from '../components/SoilInputForm';
import FeatureCard from '../components/FeatureCard';

const Home = () => {
  return (
    <div className="min-h-screen bg-soil-dark">
      <Hero />
      <StatsSection />
      
      {/* Quick Analysis Section */}
      <section className="py-16 md:py-20 bg-soil-dark">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Quick Analysis</h2>
            <p className="text-gray-400">Enter your soil data for instant insights</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <SoilInputForm />
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-16 md:py-20 bg-[#0a150f]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-gray-400">Comprehensive soil analysis tools</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={Droplets}
              title="Moisture Analysis"
              description="Understand soil moisture conditions for better agricultural planning."
              index={0}
            />
            <FeatureCard 
              icon={TestTubes}
              title="NPK Analysis"
              description="Analyze essential soil nutrients required for healthy crop growth."
              index={1}
            />
            <FeatureCard 
              icon={HeartPulse}
              title="Soil Health Score"
              description="Get a simplified soil health assessment from your analysis."
              index={2}
            />
            <FeatureCard 
              icon={Lightbulb}
              title="Smart Recommendations"
              description="Receive practical recommendations based on soil conditions."
              index={3}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-20 bg-soil-dark">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-gray-400">Simple steps to analyze your soil</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-5 left-[12%] right-[12%] border-t-2 border-dashed border-soil-border z-0"></div>
            
            {[
              { title: "Enter NPK Values", desc: "Input Nitrogen, Phosphorus and Potassium levels." },
              { title: "AI Analysis", desc: "Our AI model analyzes soil condition and nutrient balance." },
              { title: "Get Results", desc: "Receive detailed soil health report and recommendations." },
              { title: "Take Action", desc: "Improve soil health and maximize crop productivity." }
            ].map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-10 h-10 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center mb-6 ring-4 ring-soil-dark">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
