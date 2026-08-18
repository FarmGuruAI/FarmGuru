import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Mock response for development (no backend needed)
const generateMockResult = (nitrogen, phosphorus, potassium) => {
  const total = nitrogen + phosphorus + potassium;
  let condition, score, color;

  if (total > 200) {
    condition = 'Good';
    score = Math.min(92, 70 + Math.random() * 25);
    color = '#22c55e';
  } else if (total > 100) {
    condition = 'Moderate';
    score = 45 + Math.random() * 25;
    color = '#eab308';
  } else {
    condition = 'Poor';
    score = 15 + Math.random() * 30;
    color = '#ef4444';
  }

  return {
    condition,
    score: Math.round(score),
    color,
    nutrients: {
      nitrogen: { value: nitrogen, status: nitrogen > 50 ? 'Sufficient' : 'Deficient', optimal: '40-80 mg/kg' },
      phosphorus: { value: phosphorus, status: phosphorus > 30 ? 'Sufficient' : 'Deficient', optimal: '25-50 mg/kg' },
      potassium: { value: potassium, status: potassium > 40 ? 'Sufficient' : 'Deficient', optimal: '30-60 mg/kg' },
    },
    recommendations: [
      nitrogen < 40 ? 'Consider adding nitrogen-rich fertilizers like urea or ammonium sulfate.' : 'Nitrogen levels are adequate for most crops.',
      phosphorus < 25 ? 'Apply phosphorus supplements such as superphosphate.' : 'Phosphorus levels support healthy root development.',
      potassium < 30 ? 'Add potassium-rich fertilizers like potash.' : 'Potassium levels are sufficient for crop growth.',
      'Consider crop rotation to maintain long-term soil health.',
    ],
    timestamp: new Date().toISOString(),
  };
};

export const analyzeSoil = async ({ nitrogen, phosphorus, potassium }) => {
  try {
    const response = await apiClient.post('/predict', {
      nitrogen: Number(nitrogen),
      phosphorus: Number(phosphorus),
      potassium: Number(potassium),
    });
    return response.data;
  } catch (error) {
    console.warn('Backend unavailable, using mock data:', error.message);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    return generateMockResult(Number(nitrogen), Number(phosphorus), Number(potassium));
  }
};

export const getHistory = async () => {
  try {
    const response = await apiClient.get('/history');
    return response.data;
  } catch (error) {
    console.warn('Backend unavailable, using mock history:', error.message);
    await new Promise(resolve => setTimeout(resolve, 800));
    return [
      { id: 1, nitrogen: 80, phosphorus: 40, potassium: 50, condition: 'Good', score: 85, date: '2026-08-15' },
      { id: 2, nitrogen: 30, phosphorus: 20, potassium: 25, condition: 'Poor', score: 32, date: '2026-08-14' },
      { id: 3, nitrogen: 55, phosphorus: 35, potassium: 45, condition: 'Moderate', score: 62, date: '2026-08-13' },
      { id: 4, nitrogen: 90, phosphorus: 45, potassium: 60, condition: 'Good', score: 91, date: '2026-08-12' },
      { id: 5, nitrogen: 40, phosphorus: 25, potassium: 30, condition: 'Moderate', score: 48, date: '2026-08-11' },
    ];
  }
};

export const getStats = async () => {
  try {
    const response = await apiClient.get('/stats');
    return response.data;
  } catch (error) {
    console.warn('Backend unavailable, using mock stats:', error.message);
    return {
      totalAnalyses: 2500,
      totalUsers: 1500,
      accuracy: 95,
      parameters: 20,
    };
  }
};

export default apiClient;
