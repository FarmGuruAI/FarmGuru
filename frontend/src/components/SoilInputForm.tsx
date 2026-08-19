import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Beaker, ArrowRight } from 'lucide-react';

const FIELDS = [
  { name: 'nitrogen',   label: 'Nitrogen (N)',   unit: 'mg/kg', placeholder: '80',  max: 500, color: '#22c55e' },
  { name: 'phosphorus', label: 'Phosphorus (P)', unit: 'mg/kg', placeholder: '40',  max: 500, color: '#3b82f6' },
  { name: 'potassium',  label: 'Potassium (K)',  unit: 'mg/kg', placeholder: '50',  max: 500, color: '#a855f7' },
  { name: 'moisture',   label: 'Moisture',       unit: '%',     placeholder: '45',  max: 100, color: '#06b6d4' },
];

export default function SoilInputForm({ onSubmit, compact = false }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [values, setValues] = useState({
    nitrogen:   searchParams.get('nitrogen') || '',
    phosphorus: searchParams.get('phosphorus') || '',
    potassium:  searchParams.get('potassium') || '',
    moisture:   searchParams.get('moisture') || ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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
      className={`bg-card border border-border rounded-2xl shadow-sm ${compact ? 'p-4 md:p-6' : 'p-6 md:p-8'}`}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Beaker className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Soil Analysis</h2>
        </div>
        {!compact && (
          <p className="hidden md:block text-muted-foreground text-sm">
            Enter soil metrics for an instant AI-powered assessment
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {FIELDS.map(field => (
            <div key={field.name}>
              <label className="block text-foreground text-sm font-medium mb-1.5">
                {field.label}
              </label>
              <div className="relative flex items-center">
                <input
                  type="number"
                  name={field.name}
                  min="0"
                  max={field.max}
                  placeholder={field.placeholder}
                  required
                  value={values[field.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-14 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <span
                  className="absolute right-3 text-xs font-semibold px-1.5 py-0.5 rounded"
                  style={{ color: field.color, background: field.color + '18' }}
                >
                  {field.unit}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col md:flex-row md:justify-end">
          <button
            type="submit"
            className="w-full md:w-auto font-semibold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #16a34a 0%, #2563eb 100%)' }}
          >
            Analyze Soil
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
