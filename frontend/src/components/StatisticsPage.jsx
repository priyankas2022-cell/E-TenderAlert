import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const StatisticsPage = () => {
  // Mock data for demonstration
  const [stats, setStats] = useState({
    totalTracked: 1247,
    activeTenders: 342,
    closingSoon: 24,
    highValueTenders: 89,
    estimatedOpportunityValue: "₹2,450 Cr",
    tenderLifecycle: {
      published: 1247,
      corrigendum: 156,
      bidSubmission: 342,
      technicalEvaluation: 89,
      financialEvaluation: 67,
      awarded: 234,
      cancelled: 45
    },
    departmentStats: {
      topAuthorities: [
        { name: "Ministry of New and Renewable Energy", count: 127, value: "₹420 Cr" },
        { name: "PWD - Public Works Department", count: 98, value: "₹310 Cr" },
        { name: "Railway Ministry", count: 87, value: "₹280 Cr" },
        { name: "NHAI - National Highway Authority", count: 76, value: "₹210 Cr" },
        { name: "Municipal Corporation", count: 65, value: "₹180 Cr" }
      ],
      tenderByDepartment: [
        { name: "Solar Power", count: 127, value: "₹420 Cr" },
        { name: "Construction", count: 234, value: "₹380 Cr" },
        { name: "IT Services", count: 89, value: "₹190 Cr" },
        { name: "Healthcare", count: 67, value: "₹150 Cr" },
        { name: "Education", count: 54, value: "₹120 Cr" }
      ]
    },
    categoryDistribution: [
      { name: "Solar Power Plant", value: 127 },
      { name: "Resco", value: 98 },
      { name: "Street Light", value: 87 },
      { name: "Highmast", value: 76 },
      { name: "Homo Lighting System", value: 65 },
      { name: "Pump Solarization", value: 54 },
      { name: "Module Supply", value: 43 }
    ]
  });

  // Calculate total for percentage calculations
  const totalCategoryValue = stats.categoryDistribution.reduce((sum, item) => sum + item.value, 0);
  
  // Data pipeline visualization data
  const pipelineStages = [
    { name: "Data Collection", icon: "fas fa-database", description: "Gathering tender data from various sources" },
    { name: "Data Processing", icon: "fas fa-cogs", description: "Cleaning and structuring tender information" },
    { name: "Analysis", icon: "fas fa-chart-line", description: "Analyzing trends and patterns" },
    { name: "Alert Generation", icon: "fas fa-bell", description: "Creating alerts for relevant tenders" },
    { name: "User Notification", icon: "fas fa-envelope", description: "Sending notifications to users" }
  ];

  // Chart data configurations with names and percentages
  const tenderLifecycleData = {
    labels: ['Published', 'Corrigendum', 'Bid Submission', 'Technical Eval', 'Financial Eval', 'Awarded', 'Cancelled'],
    datasets: [
      {
        label: 'Tender Lifecycle',
        data: [
          stats.tenderLifecycle.published,
          stats.tenderLifecycle.corrigendum,
          stats.tenderLifecycle.bidSubmission,
          stats.tenderLifecycle.technicalEvaluation,
          stats.tenderLifecycle.financialEvaluation,
          stats.tenderLifecycle.awarded,
          stats.tenderLifecycle.cancelled
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(201, 203, 207, 0.7)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(201, 203, 207, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const departmentData = {
    labels: stats.departmentStats.tenderByDepartment.map(dept => dept.name),
    datasets: [
      {
        label: 'Tender Count by Department',
        data: stats.departmentStats.tenderByDepartment.map(dept => dept.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  // Enhanced category data with percentages
  const categoryData = {
    labels: stats.categoryDistribution.map(cat => `${cat.name} (${((cat.value / totalCategoryValue) * 100).toFixed(1)}%)`),
    datasets: [
      {
        data: stats.categoryDistribution.map(cat => cat.value),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384'
        ]
      }
    ]
  };

  const tenderValueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Tender Value (Crores)',
        data: [120, 190, 130, 195, 220, 250],
        fill: false,
        borderColor: '#4BC0C0',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e2e8f0' // Light text for better contrast on dark background
        }
      },
      title: {
        display: true,
        font: {
          size: 16
        },
        color: '#e2e8f0' // Light text for better contrast on dark background
      }
    }
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#e2e8f0' // Light text for better contrast on dark background
        }
      },
      title: {
        display: true,
        font: {
          size: 16
        },
        color: '#e2e8f0' // Light text for better contrast on dark background
      }
    }
  };

  return (
    <div className="statistics-page">
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div className="container-fluid">
        {/* Page Header */}
        <div className="row">
          <div className="col-12">
            <div className="page-header" style={{ 
              backgroundImage: 'url("/stats_heading_background.jpeg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              padding: '40px 20px',
              borderRadius: '10px',
              textAlign: 'center',
              color: '#fff',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              marginBottom: '30px'
            }}>
              <h1 className="page-title" style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginBottom: '15px',
                color: '#fff',
                textShadow: '0 2px 4px rgba(0,0,0,0.7)'
              }}>
                Tender Analytics Dashboard
              </h1>
              <p className="page-subtitle" style={{
                fontSize: '1.2rem',
                maxWidth: '700px',
                margin: '0 auto',
                color: '#ffffff',
                textShadow: 'none',
                fontWeight: '500',
                opacity: '1'
              }}>
                Comprehensive insights into tender tracking and performance metrics
              </p>
            </div>
          </div>
        </div>

        {/* Data Pipeline Visualization */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card dashboard-card" style={{ 
              background: 'rgba(30, 30, 46, 0.6)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(52, 152, 219, 0.3)',
              boxShadow: 'none'
            }}>
              <div className="card-header" style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                border: 'none',
                textAlign: 'center'
              }}>
                <h3 className="card-title" style={{ 
                  fontSize: '1.5rem',
                  margin: '0'
                }}>
                  <i className="fas fa-project-diagram me-2"></i>
                  Data Pipeline
                </h3>
              </div>
              <div className="card-body">
                <div className="pipeline-container" style={{ 
                  boxShadow: 'none', 
                  border: '1px solid rgba(52, 152, 219, 0.3)',
                  background: 'rgba(30, 30, 46, 0.6)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  borderRadius: '15px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  padding: '1rem 0'
                }}>
                  {pipelineStages.map((stage, index) => (
                    <div className="pipeline-stage" key={index} style={{ 
                      boxShadow: 'none', 
                      border: '1px solid rgba(52, 152, 219, 0.3)',
                      background: 'rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(5px)',
                      WebkitBackdropFilter: 'blur(5px)',
                      borderRadius: '8px'
                    }}>
                      <div className="pipeline-info">
                        <h4>{stage.name}</h4>
                        <p>{stage.description}</p>
                      </div>
                      {index < pipelineStages.length - 1 && (
                        <div className="pipeline-arrow" style={{ 
                          animation: 'pulse 2s infinite',
                          color: '#3498db',
                          textShadow: '0 0 8px rgba(52, 152, 219, 0.7)'
                        }}>
                          <i className="fas fa-arrow-right"></i>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Dashboard */}
        <div className="row mb-4">
          <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12 mb-3">
            <div className="card stat-card primary" style={{ transition: 'none', transform: 'none', cursor: 'default' }}>
              <div className="card-body" style={{ textAlign: 'center' }}>
                <div className="stat-icon">
                  <i className="fas fa-binoculars"></i>
                </div>
                <div className="stat-content" style={{ color: '#00008B' }}>
                  <h3 style={{ color: '#00008B', textAlign: 'center' }}>{stats.totalTracked}</h3>
                  <p style={{ color: '#00008B', textAlign: 'center' }}>Total Tenders Tracked</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12 mb-3">
            <div className="card stat-card success" style={{ transition: 'none', transform: 'none', cursor: 'default' }}>
              <div className="card-body" style={{ textAlign: 'center' }}>
                <div className="stat-icon">
                  <i className="fas fa-bullseye"></i>
                </div>
                <div className="stat-content" style={{ color: '#00008B' }}>
                  <h3 style={{ color: '#00008B', textAlign: 'center' }}>{stats.activeTenders}</h3>
                  <p style={{ color: '#00008B', textAlign: 'center' }}>Active Tenders</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12 mb-3">
            <div className="card stat-card warning" style={{ transition: 'none', transform: 'none', cursor: 'default' }}>
              <div className="card-body" style={{ textAlign: 'center' }}>
                <div className="stat-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="stat-content" style={{ color: '#00008B' }}>
                  <h3 style={{ color: '#00008B', textAlign: 'center' }}>{stats.closingSoon}</h3>
                  <p style={{ color: '#00008B', textAlign: 'center' }}>Closing Soon (7 Days)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12 mb-3">
            <div className="card stat-card danger" style={{ transition: 'none', transform: 'none', cursor: 'default' }}>
              <div className="card-body" style={{ textAlign: 'center' }}>
                <div className="stat-icon">
                  <i className="fas fa-rupee-sign"></i>
                </div>
                <div className="stat-content" style={{ color: '#00008B' }}>
                  <h3 style={{ color: '#00008B', textAlign: 'center' }}>{stats.highValueTenders}</h3>
                  <p style={{ color: '#00008B', textAlign: 'center' }}>High-Value Tenders</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-xl-4 col-lg-8 col-md-12 col-sm-12 mb-3">
            <div className="card stat-card info" style={{ transition: 'none', transform: 'none', cursor: 'default' }}>
              <div className="card-body" style={{ textAlign: 'center' }}>
                <div className="stat-icon">
                  <i className="fas fa-coins"></i>
                </div>
                <div className="stat-content" style={{ color: '#00008B' }}>
                  <h3 style={{ color: '#00008B', textAlign: 'center' }}>{stats.estimatedOpportunityValue}</h3>
                  <p style={{ color: '#00008B', textAlign: 'center' }}>Total Estimated Opportunity Value</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="row mb-4">
          {/* Tender Lifecycle Breakdown */}
          <div className="col-lg-6 col-md-12 mb-4">
            <div className="card dashboard-card">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="fas fa-sync-alt me-2"></i>
                  Tender Lifecycle Breakdown
                </h3>
              </div>
              <div className="card-body">
                <Bar data={tenderLifecycleData} options={chartOptions} />
              </div>
            </div>
          </div>
          
          {/* Category Distribution */}
          <div className="col-lg-6 col-md-12 mb-4">
            <div className="card dashboard-card">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="fas fa-chart-pie me-2"></i>
                  Project Category Distribution
                </h3>
              </div>
              <div className="card-body">
                <Pie data={categoryData} options={pieChartOptions} />
              </div>
            </div>
          </div>
        </div>

        {/* Department Statistics */}
        <div className="row mb-4">
          <div className="col-lg-6 col-md-12 mb-4">
            <div className="card dashboard-card">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="fas fa-building me-2"></i>
                  Tender Count by Department
                </h3>
              </div>
              <div className="card-body">
                <Bar data={departmentData} options={chartOptions} />
              </div>
            </div>
          </div>
          
          <div className="col-lg-6 col-md-12 mb-4">
            <div className="card dashboard-card">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="fas fa-chart-line me-2"></i>
                  Tender Value Trend
                </h3>
              </div>
              <div className="card-body">
                <Line data={tenderValueData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>

        {/* Department Tables */}
        <div className="row mb-4">
          <div className="col-lg-6 col-md-12 mb-4">
            <div className="card dashboard-card">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="fas fa-trophy me-2"></i>
                  Top Issuing Authorities
                </h3>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Authority</th>
                        <th>Tender Count</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.departmentStats.topAuthorities.map((authority, index) => (
                        <tr key={index}>
                          <td>{authority.name}</td>
                          <td>{authority.count}</td>
                          <td>{authority.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6 col-md-12 mb-4">
            <div className="card dashboard-card">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="fas fa-list me-2"></i>
                  Department-wise Tender Distribution
                </h3>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Department</th>
                        <th>Tender Count</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.departmentStats.tenderByDepartment.map((dept, index) => (
                        <tr key={index}>
                          <td>{dept.name}</td>
                          <td>{dept.count}</td>
                          <td>{dept.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;