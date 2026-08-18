import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FlaskConical, HeartPulse, Clock } from 'lucide-react';

const Dashboard = () => {
  const trendData = [
    { name: 'Jan', score: 65 },
    { name: 'Feb', score: 68 },
    { name: 'Mar', score: 72 },
    { name: 'Apr', score: 70 },
    { name: 'May', score: 76 },
    { name: 'Jun', score: 82 },
  ];

  const npkAvgData = [
    { name: 'Nitrogen', value: 45 },
    { name: 'Phosphorus', value: 30 },
    { name: 'Potassium', value: 180 },
  ];

  const recentHistory = [
    { id: 1, date: '2023-06-15', n: 45, p: 30, k: 180, condition: 'Good', score: 82 },
    { id: 2, date: '2023-05-20', n: 42, p: 25, k: 175, condition: 'Moderate', score: 76 },
    { id: 3, date: '2023-04-10', n: 38, p: 20, k: 160, condition: 'Moderate', score: 70 },
    { id: 4, date: '2023-03-05', n: 30, p: 15, k: 140, condition: 'Poor', score: 55 },
    { id: 5, date: '2023-02-01', n: 35, p: 18, k: 150, condition: 'Moderate', score: 65 },
  ];

  return (
    <div className="min-h-screen bg-soil-dark pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Track your soil analysis history</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-soil-card border border-soil-border rounded-2xl p-6 flex items-center gap-4">
            <div className="bg-blue-500/20 p-4 rounded-xl text-blue-400">
              <FlaskConical className="w-8 h-8" />
            </div>
            <div>
              <div className="text-gray-400 text-sm">Total Analyses</div>
              <div className="text-3xl font-bold text-white">24</div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-soil-card border border-soil-border rounded-2xl p-6 flex items-center gap-4">
            <div className="bg-green-500/20 p-4 rounded-xl text-green-400">
              <HeartPulse className="w-8 h-8" />
            </div>
            <div>
              <div className="text-gray-400 text-sm">Average Health</div>
              <div className="text-3xl font-bold text-white">72%</div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-soil-card border border-soil-border rounded-2xl p-6 flex items-center gap-4">
            <div className="bg-purple-500/20 p-4 rounded-xl text-purple-400">
              <Clock className="w-8 h-8" />
            </div>
            <div>
              <div className="text-gray-400 text-sm">Last Analysis</div>
              <div className="text-3xl font-bold text-white">Today</div>
            </div>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-soil-card border border-soil-border rounded-2xl p-6 h-96 flex flex-col">
            <h2 className="text-xl font-bold text-white mb-6">Analysis Trend</h2>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a3a24" vertical={false} />
                  <XAxis dataKey="name" stroke="#9ca3af" tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f2a17', borderColor: '#1a3a24', color: '#fff' }} />
                  <Line type="monotone" dataKey="score" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-soil-card border border-soil-border rounded-2xl p-6 h-96 flex flex-col">
            <h2 className="text-xl font-bold text-white mb-6">Average NPK Levels</h2>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={npkAvgData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a3a24" vertical={false} />
                  <XAxis dataKey="name" stroke="#9ca3af" tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f2a17', borderColor: '#1a3a24', color: '#fff' }} cursor={{ fill: '#1a3a24' }} />
                  <Bar dataKey="value" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* History Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-soil-card border border-soil-border rounded-2xl p-6 overflow-hidden mt-8">
          <h2 className="text-xl font-bold text-white mb-6">Recent Analyses</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-soil-border text-gray-400 text-sm">
                  <th className="py-4 px-4 font-medium">Date</th>
                  <th className="py-4 px-4 font-medium">N (mg/kg)</th>
                  <th className="py-4 px-4 font-medium">P (mg/kg)</th>
                  <th className="py-4 px-4 font-medium">K (mg/kg)</th>
                  <th className="py-4 px-4 font-medium">Condition</th>
                  <th className="py-4 px-4 font-medium">Score</th>
                </tr>
              </thead>
              <tbody>
                {recentHistory.map((row, i) => (
                  <tr key={row.id} className={`${i % 2 === 0 ? 'bg-soil-dark/50' : ''} text-white`}>
                    <td className="py-4 px-4">{row.date}</td>
                    <td className="py-4 px-4 text-green-400">{row.n}</td>
                    <td className="py-4 px-4 text-blue-400">{row.p}</td>
                    <td className="py-4 px-4 text-purple-400">{row.k}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        row.condition === 'Good' ? 'bg-green-500/20 text-green-400' :
                        row.condition === 'Moderate' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {row.condition}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-bold">{row.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Dashboard;
