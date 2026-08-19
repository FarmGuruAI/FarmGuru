import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FlaskConical, HeartPulse, Clock } from 'lucide-react';
import { getHistory, getStats } from '../services/api';

const Dashboard = () => {
  const [recentHistory, setRecentHistory] = useState([]);
  const [stats, setStats] = useState({ totalAnalyses: 0, averageHealth: 0 });
  const [trendData, setTrendData] = useState([]);
  const [npkAvgData, setNpkAvgData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const historyData = await getHistory();
        const statsData = await getStats();
        
        setRecentHistory(historyData);
        setStats(statsData);

        // Process history into chart data
        if (historyData && historyData.length > 0) {
          // Trend data (reverse to show chronological order)
          const trend = historyData.slice(0, 10).reverse().map(item => ({
            name: item.date,
            score: item.score
          }));
          setTrendData(trend);

          // Averages for NPK
          let totalN = 0, totalP = 0, totalK = 0;
          historyData.forEach(item => {
            totalN += Number(item.nitrogen || 0);
            totalP += Number(item.phosphorus || 0);
            totalK += Number(item.potassium || 0);
          });
          const count = historyData.length;
          setNpkAvgData([
            { name: 'Nitrogen', value: Math.round(totalN / count) },
            { name: 'Phosphorus', value: Math.round(totalP / count) },
            { name: 'Potassium', value: Math.round(totalK / count) },
          ]);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Track your soil analysis history</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-6 flex items-center gap-4">
            <div className="bg-blue-500/20 p-4 rounded-xl text-blue-400">
              <FlaskConical className="w-8 h-8" />
            </div>
            <div>
              <div className="text-muted-foreground text-sm">Total Analyses</div>
              <div className="text-3xl font-bold text-foreground">{stats.totalAnalyses || 0}</div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border rounded-2xl p-6 flex items-center gap-4">
            <div className="bg-green-500/20 p-4 rounded-xl text-green-400">
              <HeartPulse className="w-8 h-8" />
            </div>
            <div>
              <div className="text-muted-foreground text-sm">Average Health</div>
              <div className="text-3xl font-bold text-foreground">{stats.averageHealth || 0}%</div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card border border-border rounded-2xl p-6 flex items-center gap-4">
            <div className="bg-purple-500/20 p-4 rounded-xl text-purple-400">
              <Clock className="w-8 h-8" />
            </div>
            <div>
              <div className="text-muted-foreground text-sm">Last Analysis</div>
              <div className="text-3xl font-bold text-foreground">
                {recentHistory.length > 0 ? recentHistory[0].date : 'Never'}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card border border-border rounded-2xl p-6 h-96 flex flex-col">
            <h2 className="text-xl font-bold text-foreground mb-6">Analysis Trend</h2>
            <div className="flex-1 min-h-0">
              {trendData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="name" stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }} />
                    <Line type="monotone" dataKey="score" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">No data available yet</div>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card border border-border rounded-2xl p-6 h-96 flex flex-col">
            <h2 className="text-xl font-bold text-foreground mb-6">Average NPK Levels</h2>
            <div className="flex-1 min-h-0">
              {npkAvgData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={npkAvgData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="name" stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }} cursor={{ fill: 'var(--border)' }} />
                    <Bar dataKey="value" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">No data available yet</div>
              )}
            </div>
          </motion.div>
        </div>

        {/* History Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-card border border-border rounded-2xl p-6 overflow-hidden mt-8">
          <h2 className="text-xl font-bold text-foreground mb-6">Recent Analyses</h2>
          {recentHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border text-muted-foreground text-sm">
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
                    <tr key={row.id || i} className={`${i % 2 === 0 ? 'bg-background/50' : ''} text-foreground`}>
                      <td className="py-4 px-4">{row.date}</td>
                      <td className="py-4 px-4 text-green-400">{row.nitrogen || row.n}</td>
                      <td className="py-4 px-4 text-blue-400">{row.phosphorus || row.p}</td>
                      <td className="py-4 px-4 text-purple-400">{row.potassium || row.k}</td>
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
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {isLoading ? 'Loading data...' : 'No analyses have been run yet. Head over to the Analysis tab to get started!'}
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default Dashboard;
