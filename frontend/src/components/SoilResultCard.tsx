import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CheckCircle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const SoilResultCard = ({ result }) => {
  const chartData = [
    { name: 'Nitrogen', value: result.nutrients.nitrogen.value, fill: '#22c55e' },
    { name: 'Phosphorus', value: result.nutrients.phosphorus.value, fill: '#3b82f6' },
    { name: 'Potassium', value: result.nutrients.potassium.value, fill: '#a855f7' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-soil-card border border-soil-border rounded-2xl p-6 md:p-8 w-full"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-soil-text mb-2">Analysis Result</h2>
          <div className="flex items-center gap-2 text-sm text-soil-muted">
            <Calendar className="w-4 h-4" />
            <span>{result.timestamp || new Date().toLocaleString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-soil-muted">Health Score</div>
            <div className="text-3xl font-bold text-soil-text">{result.score}/100</div>
          </div>
          <div className={`px-4 py-2 rounded-full font-semibold ${result.color === 'green' ? 'bg-green-500/20 text-green-400' : result.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
            {result.condition}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="h-64 bg-soil-bg rounded-xl p-4 border border-soil-border">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a3a24" vertical={false} />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{fill: '#1a3a24', opacity: 0.4}}
                contentStyle={{ backgroundColor: '#0f2a17', borderColor: '#1a3a24', color: '#fff', borderRadius: '8px' }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col gap-4">
          {Object.entries(result.nutrients).map(([key, data]) => (
            <div key={key} className="bg-soil-bg border border-soil-border rounded-xl p-4 flex justify-between items-center">
              <div>
                <div className="text-soil-muted text-sm capitalize">{key}</div>
                <div className="text-2xl font-bold text-soil-text">{data.value} <span className="text-sm font-normal text-soil-text0">{key === 'moisture' ? '%' : 'mg/kg'}</span></div>
              </div>
              <div className="text-right">
                <div className={`text-xs px-2 py-1 rounded-full inline-block mb-1 ${data.status === 'Optimal' ? 'bg-green-500/20 text-green-400' : data.status === 'Low' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                  {data.status}
                </div>
                <div className="text-xs text-soil-text0">Target: {data.optimal}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-soil-text mb-4">Recommendations</h3>
        <ul className="space-y-3">
          {result.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-3 text-soil-muted">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-end pt-6 border-t border-soil-border">
        <Link 
          to="/analysis"
          className="bg-primary-600 hover:bg-primary-500 text-soil-text px-6 py-2.5 rounded-xl font-medium transition-colors"
        >
          New Analysis
        </Link>
      </div>
    </motion.div>
  );
};

export default SoilResultCard;
