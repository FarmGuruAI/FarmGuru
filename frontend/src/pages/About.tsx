import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Cpu, LineChart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About FarmGuru</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We are dedicated to empowering farmers and agricultural professionals with cutting-edge artificial intelligence to understand their soil better, optimize crop yield, and ensure sustainable farming practices.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-2xl p-8 md:p-12 mb-20 flex flex-col md:flex-row items-center gap-8 md:gap-16"
        >
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Leaf className="text-primary w-8 h-8" />
              Our Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              To democratize advanced soil analysis technology, making it accessible to every farmer. By combining traditional agricultural knowledge with modern machine learning, we strive to provide actionable insights that improve soil health globally.
            </p>
          </div>
          <div className="w-full md:w-1/2 h-64 bg-background rounded-xl border border-border flex items-center justify-center">
            <Leaf className="w-24 h-24 text-primary-900/50" />
          </div>
        </motion.div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">How Our AI Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "1. Data Input", desc: "User inputs raw NPK (Nitrogen, Phosphorus, Potassium) values from standard soil tests.", icon: Leaf },
              { title: "2. ML Processing", desc: "Our trained Random Forest model analyzes the data patterns against thousands of historical samples.", icon: Cpu },
              { title: "3. Prediction", desc: "The AI outputs a soil condition classification along with tailored nutrient recommendations.", icon: LineChart }
            ].map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-card border border-border rounded-2xl p-6 relative"
              >
                <div className="bg-primary-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-foreground mb-8">Technology Stack</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['React 18', 'TailwindCSS v4', 'Framer Motion', 'FastAPI', 'Python', 'Scikit-learn', 'Pandas'].map((tech, i) => (
              <span key={i} className="bg-card border border-border rounded-full px-5 py-2.5 text-sm text-muted-foreground font-medium hover:border-primary/50 transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
