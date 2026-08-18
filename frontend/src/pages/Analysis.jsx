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
      // Mocking response for demo:
      const response = {
        condition: 'Good',
        score: 85,
        color: 'green',
        timestamp: new Date().toLocaleString(),
        nutrients: {
          nitrogen: { value: formData.nitrogen || 45, status: 'Optimal', optimal: '40-60 mg/kg' },
          phosphorus: { value: formData.phosphorus || 20, status: 'Low', optimal: '30-50 mg/kg' },
          potassium: { value: formData.potassium || 180, status: 'Optimal', optimal: '150-250 mg/kg' }
        },
        recommendations: [
          'Apply phosphorus-rich fertilizer to reach optimal levels.',
          'Maintain current nitrogen application routine.',
          'Soil moisture retention looks good.'
        ]
      };
      
      // Simulate API delay
      setTimeout(() => {
        setResultData(response);
        setAppState('result');
      }, 2000);
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
    <div className="min-h-screen bg-soil-dark pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Soil Analysis</h1>
          <p className="text-gray-400">Enter your soil metrics for AI-powered health assessment</p>
        </div>

        <AnimatePresence mode="wait">
          {appState === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="bg-soil-card border border-soil-border rounded-2xl p-6 md:p-8">
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
                <div className="w-16 h-16 border-4 border-soil-border border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
                <h2 className="text-xl text-white font-semibold">Analyzing Soil Data...</h2>
                <p className="text-gray-400 mt-2">Applying AI models to generate insights</p>
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
                  className="bg-soil-card hover:bg-soil-border border border-soil-border text-white px-8 py-3 rounded-xl transition-colors font-medium"
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
