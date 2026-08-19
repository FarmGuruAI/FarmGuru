import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CheckCircle, Calendar, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const NUTRIENT_COLORS = {
  nitrogen: '#22c55e',
  phosphorus: '#3b82f6',
  potassium: '#a855f7',
  moisture: '#06b6d4',
};

const SoilResultCard = ({ result }) => {
  const chartData = Object.entries(result.nutrients)
    .filter(([key]) => key !== 'moisture')
    .map(([key, data]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: data.value,
      fill: NUTRIENT_COLORS[key] || '#22c55e'
    }));

  const conditionStyle =
    result.condition === 'Good'
      ? { bg: 'rgba(34,197,94,0.12)', color: '#16a34a', border: '#86efac' }
      : result.condition === 'Moderate'
      ? { bg: 'rgba(234,179,8,0.12)', color: '#92400e', border: '#fcd34d' }
      : { bg: 'rgba(239,68,68,0.12)', color: '#b91c1c', border: '#fca5a5' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-6 md:p-8 w-full shadow-sm"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Analysis Result</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{result.timestamp || new Date().toLocaleString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs text-muted-foreground mb-0.5">Health Score</div>
            <div className="text-4xl font-black text-foreground">{result.score}<span className="text-lg text-muted-foreground">/100</span></div>
          </div>
          <div
            className="px-4 py-2 rounded-full font-semibold text-sm"
            style={{ background: conditionStyle.bg, color: conditionStyle.color, border: `1px solid ${conditionStyle.border}` }}
          >
            {result.condition}
          </div>
        </div>
      </div>

      {/* Chart + Nutrient Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="h-64 bg-muted/30 rounded-xl p-4 border border-border">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: 'var(--muted)', opacity: 0.5 }}
                contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)', borderRadius: '8px', fontSize: '12px' }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col gap-3">
          {Object.entries(result.nutrients).map(([key, data]) => {
            const color = NUTRIENT_COLORS[key] || '#22c55e';
            const statusStyle =
              data.status === 'Sufficient'
                ? { bg: 'rgba(34,197,94,0.1)', color: '#16a34a' }
                : { bg: 'rgba(239,68,68,0.1)', color: '#b91c1c' };
            return (
              <div key={key} className="bg-background border border-border rounded-xl p-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 rounded-full" style={{ background: color }} />
                  <div>
                    <div className="text-muted-foreground text-xs capitalize font-medium">{key}</div>
                    <div className="text-xl font-bold text-foreground">{data.value} <span className="text-xs font-normal text-muted-foreground">{key === 'moisture' ? '%' : 'mg/kg'}</span></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs px-2 py-0.5 rounded-full font-medium mb-1" style={statusStyle}>
                    {data.status}
                  </div>
                  <div className="text-xs text-muted-foreground">Target: {data.optimal}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Leaf className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">AI Recommendations</h3>
        </div>
        <ul className="space-y-3">
          {result.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
              <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-foreground text-sm leading-relaxed">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-end pt-6 border-t border-border">
        <Link
          to="/analysis"
          className="text-white font-semibold px-6 py-2.5 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-primary/20"
          style={{ background: 'linear-gradient(135deg, #16a34a 0%, #2563eb 100%)' }}
        >
          New Analysis
        </Link>
      </div>
    </motion.div>
  );
};

export default SoilResultCard;
