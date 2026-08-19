import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SoilInputForm from '../components/SoilInputForm';
import SoilResultCard from '../components/SoilResultCard';
import LoadingState from '../components/LoadingState';
import { analyzeSoil } from '../services/api';

const Analysis = () => {
  const [appState, setAppState] = useState('input'); // 'input', 'loading', 'result'
  const [resultData, setResultData] = useState(null);

  const handleAnalyze = async (formData) => {
    setAppState('loading');
    try {
      // Call the actual backend via the api service
      const response = await analyzeSoil(formData);
      
      setResultData(response);
      setAppState('result');
    } catch (error) {
      console.error(error);
      setAppState('input');
    }
  };

  const handleReset = () => {
    setResultData(null);
    setAppState('input');
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Soil Analysis</h1>
          <p className="text-muted-foreground">Enter your soil metrics for AI-powered health assessment</p>
        </div>

        <AnimatePresence mode="wait">
          {appState === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                <SoilInputForm onSubmit={handleAnalyze} />
              </div>
            </motion.div>
          )}

          {appState === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center py-20"
            >
              {/* Fallback inline loading state in case LoadingState is not fully implemented */}
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-border border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                <h2 className="text-xl text-foreground font-semibold">Analyzing Soil Data...</h2>
                <p className="text-muted-foreground mt-2">Applying AI models to generate insights</p>
              </div>
            </motion.div>
          )}

          {appState === 'result' && resultData && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <SoilResultCard result={resultData} />
              <div className="mt-8 flex justify-center">
                <button 
                  onClick={handleReset}
                  className="bg-card hover:bg-secondary border border-border text-foreground px-8 py-3 rounded-xl transition-colors font-medium"
                >
                  Start New Analysis
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Analysis;
