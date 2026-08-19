import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Beaker, ArrowRight } from 'lucide-react';

export default function SoilInputForm({ onSubmit, compact = false }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [values, setValues] = useState({
    nitrogen: searchParams.get('nitrogen') || '',
    phosphorus: searchParams.get('phosphorus') || '',
    potassium: searchParams.get('potassium') || '',
    moisture: searchParams.get('moisture') || ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(values);
    } else {
      const params = new URLSearchParams(values).toString();
      navigate(`/analysis?${params}`);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-soil-card/80 backdrop-blur-sm border border-soil-border rounded-2xl ${compact ? 'p-4 md:p-6' : 'p-6 md:p-8'}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Beaker className="w-6 h-6 text-primary-400" />
          <h2 className="text-xl font-semibold text-soil-text">Quick Soil Analysis</h2>
        </div>
        {!compact && (
          <p className="hidden md:block text-soil-muted text-sm">
            Enter soil metrics to get instant condition prediction
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Nitrogen */}
          <div>
            <label className="block text-soil-muted text-sm font-medium mb-2">
              Nitrogen (N)
            </label>
            <div className="relative flex items-center">
              <input
                type="number"
                name="nitrogen"
                min="0"
                max="500"
                placeholder="80"
                required
                value={values.nitrogen}
                onChange={handleChange}
                className="bg-soil-bg border border-soil-border rounded-xl px-4 py-3 text-soil-text w-full focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 outline-none transition-all"
              />
              <span className="absolute right-4 text-soil-text0 text-sm">mg/kg</span>
            </div>
          </div>

          {/* Phosphorus */}
          <div>
            <label className="block text-soil-muted text-sm font-medium mb-2">
              Phosphorus (P)
            </label>
            <div className="relative flex items-center">
              <input
                type="number"
                name="phosphorus"
                min="0"
                max="500"
                placeholder="40"
                required
                value={values.phosphorus}
                onChange={handleChange}
                className="bg-soil-bg border border-soil-border rounded-xl px-4 py-3 text-soil-text w-full focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 outline-none transition-all"
              />
              <span className="absolute right-4 text-soil-text0 text-sm">mg/kg</span>
            </div>
          </div>

          {/* Potassium */}
          <div>
            <label className="block text-soil-muted text-sm font-medium mb-2">
              Potassium (K)
            </label>
            <div className="relative flex items-center">
              <input
                type="number"
                name="potassium"
                min="0"
                max="500"
                placeholder="50"
                required
                value={values.potassium}
                onChange={handleChange}
                className="bg-soil-bg border border-soil-border rounded-xl px-4 py-3 text-soil-text w-full focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 outline-none transition-all"
              />
              <span className="absolute right-4 text-soil-text0 text-sm">mg/kg</span>
            </div>
          </div>

          {/* Moisture */}
          <div>
            <label className="block text-soil-muted text-sm font-medium mb-2">
              Moisture
            </label>
            <div className="relative flex items-center">
              <input
                type="number"
                name="moisture"
                min="0"
                max="100"
                placeholder="45"
                required
                value={values.moisture}
                onChange={handleChange}
                className="bg-soil-bg border border-soil-border rounded-xl px-4 py-3 text-soil-text w-full focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 outline-none transition-all"
              />
              <span className="absolute right-4 text-soil-text0 text-sm">%</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row md:justify-end">
          <button
            type="submit"
            className="w-full md:w-auto bg-primary-600 hover:bg-primary-500 text-soil-text font-semibold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
          >
            Analyze Soil
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
