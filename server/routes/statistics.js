import express from 'express';

const router = express.Router();

// Sample statistics data
const statisticsData = {
  overview: {
    activeTenders: 1247,
    closingSoon: 186,
    highValueTenders: 89,
    totalEstimatedValue: '₹4,832 Cr'
  },
  tenderLifecycle: {
    published: 1247,
    corrigendumIssued: 289,
    bidSubmission: 856,
    technicalEvaluation: 432,
    financialEvaluation: 287,
    awarded: 654,
    cancelled: 123
  },
  departments: [
    { name: 'PWD', tenderCount: 327, color: '#3498db' },
    { name: 'Health', tenderCount: 289, color: '#27ae60' },
    { name: 'Education', tenderCount: 245, color: '#f39c12' },
    { name: 'Urban Dev', tenderCount: 198, color: '#9b59b6' },
    { name: 'Agriculture', tenderCount: 167, color: '#1abc9c' },
    { name: 'Transport', tenderCount: 156, color: '#e74c3c' },
    { name: 'Energy', tenderCount: 142, color: '#f1c40f' },
    { name: 'Defense', tenderCount: 128, color: '#2980b9' },
    { name: 'IT', tenderCount: 115, color: '#d35400' },
    { name: 'Tourism', tenderCount: 98, color: '#95a5a6' }
  ],
  topAuthorities: [
    { authority: 'Ministry of Road Transport & Highways', tenderCount: 127, totalValue: '₹892 Cr', avgValue: '₹7.02 Cr' },
    { authority: 'Indian Railways', tenderCount: 98, totalValue: '₹743 Cr', avgValue: '₹7.58 Cr' },
    { authority: 'Central Public Works Department', tenderCount: 86, totalValue: '₹521 Cr', avgValue: '₹6.06 Cr' },
    { authority: 'State Water Resources Dept.', tenderCount: 72, totalValue: '₹467 Cr', avgValue: '₹6.49 Cr' },
    { authority: 'Municipal Corporation of Delhi', tenderCount: 65, totalValue: '₹389 Cr', avgValue: '₹5.98 Cr' }
  ],
  categoryDistribution: [
    { category: 'Infrastructure', percentage: 32, color: '#3498db' },
    { category: 'Healthcare', percentage: 18, color: '#27ae60' },
    { category: 'Education', percentage: 15, color: '#f39c12' },
    { category: 'IT Services', percentage: 12, color: '#9b59b6' },
    { category: 'Agriculture', percentage: 9, color: '#1abc9c' },
    { category: 'Defense', percentage: 7, color: '#e74c3c' },
    { category: 'Transport', percentage: 5, color: '#f1c40f' },
    { category: 'Others', percentage: 2, color: '#95a5a6' }
  ],
  tenderValues: [
    { department: 'Road Transport', value: 892, color: '#3498db' },
    { department: 'Railways', value: 743, color: '#27ae60' },
    { department: 'CPWD', value: 521, color: '#f39c12' },
    { department: 'Water Resources', value: 467, color: '#9b59b6' },
    { department: 'Municipal Corp', value: 389, color: '#1abc9c' },
    { department: 'Health Dept', value: 342, color: '#e74c3c' },
    { department: 'Education', value: 287, color: '#f1c40f' },
    { department: 'Energy', value: 245, color: '#2980b9' },
    { department: 'Defense', value: 198, color: '#d35400' },
    { department: 'IT', value: 156, color: '#95a5a6' }
  ]
};

// GET /api/statistics/overview
router.get('/overview', (req, res) => {
  res.json(statisticsData.overview);
});

// GET /api/statistics/lifecycle
router.get('/lifecycle', (req, res) => {
  res.json(statisticsData.tenderLifecycle);
});

// GET /api/statistics/departments
router.get('/departments', (req, res) => {
  res.json(statisticsData.departments);
});

// GET /api/statistics/authorities
router.get('/authorities', (req, res) => {
  res.json(statisticsData.topAuthorities);
});

// GET /api/statistics/categories
router.get('/categories', (req, res) => {
  res.json(statisticsData.categoryDistribution);
});

// GET /api/statistics/values
router.get('/values', (req, res) => {
  res.json(statisticsData.tenderValues);
});

// GET /api/statistics (all data)
router.get('/', (req, res) => {
  res.json(statisticsData);
});

export default router;