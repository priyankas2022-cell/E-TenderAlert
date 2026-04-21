import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
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

const ApiStatisticsPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/statistics/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error('Error fetching statistics:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <div className="statistics-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-center mt-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p>Loading statistics data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="statistics-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">Error loading data</h4>
                <p>{error}</p>
                <hr />
                <p className="mb-0">Please try refreshing the page or contact support.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="statistics-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-center mt-5">
              <p>No statistics data available</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Prepare data for charts
  const tenderLifecycleData = {
    labels: ['Published', 'Corrigendum Issued', 'Bid Submission', 'Technical Eval', 'Financial Eval', 'Awarded', 'Cancelled'],
    datasets: [
      {
        label: 'Tender Lifecycle',
        data: [
          stats.tenderLifecycle.published,
          stats.tenderLifecycle.corrigendumIssued,
          stats.tenderLifecycle.bidSubmission,
          stats.tenderLifecycle.technicalEvaluation,
          stats.tenderLifecycle.financialEvaluation,
          stats.tenderLifecycle.awarded,
          stats.tenderLifecycle.cancelled
        ],
        backgroundColor: [
          'rgba(52, 152, 219, 0.7)',    // Blue
          'rgba(243, 156, 18, 0.7)',    // Orange
          'rgba(26, 188, 156, 0.7)',    // Teal
          'rgba(155, 89, 182, 0.7)',    // Purple
          'rgba(241, 196, 15, 0.7)',    // Yellow
          'rgba(39, 174, 96, 0.7)',     // Green
          'rgba(231, 76, 60, 0.7)'      // Red
        ],
        borderColor: [
          'rgba(52, 152, 219, 1)',
          'rgba(243, 156, 18, 1)',
          'rgba(26, 188, 156, 1)',
          'rgba(155, 89, 182, 1)',
          'rgba(241, 196, 15, 1)',
          'rgba(39, 174, 96, 1)',
          'rgba(231, 76, 60, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const departmentData = {
    labels: stats.departments.map(dept => dept.name),
    datasets: [
      {
        label: 'Tender Count by Department',
        data: stats.departments.map(dept => dept.tenderCount),
        backgroundColor: stats.departments.map(dept => dept.color.replace(')', ', 0.7)').replace('rgb', 'rgba')),
        borderColor: stats.departments.map(dept => dept.color),
        borderWidth: 1
      }
    ]
  };

  const categoryData = {
    labels: stats.categoryDistribution.map(cat => `${cat.category} (${cat.percentage}%)`),
    datasets: [
      {
        data: stats.categoryDistribution.map(cat => cat.percentage),
        backgroundColor: stats.categoryDistribution.map(cat => cat.color),
        borderWidth: 1
      }
    ]
  };

  const tenderValueData = {
    labels: stats.tenderValues.map(val => val.department),
    datasets: [
      {
        label: 'Tender Value (₹ Cr)',
        data: stats.tenderValues.map(val => val.value),
        backgroundColor: stats.tenderValues.map(val => val.color.replace(')', ', 0.7)').replace('rgb', 'rgba')),
        borderColor: stats.tenderValues.map(val => val.color),
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        font: {
          size: 16
        }
      }
    }
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        font: {
          size: 16
        }
      }
    }
  };

  return (
    <div className="statistics-page">
      <div className="container-fluid">
        {/* Page Header */}
        <div className="row">
          <div className="col-12">
            <div className="page-header">
              <h1 className="page-title">
                <i className="fas fa-chart-bar me-2"></i>
                Tender Analytics Dashboard
              </h1>
              <p className="page-subtitle">
                Real-time insights from our tender tracking system
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics Dashboard */}
        <div className="row mb-4">
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-3">
            <div className="card stat-card primary">
              <div className="card-body">
                <div className="stat-icon">
                  <i className="fas fa-file-contract"></i>
                </div>
                <div className="stat-content">
                  <h3>{stats.overview.activeTenders.toLocaleString()}</h3>
                  <p>Active Tenders</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-3">
            <div className="card stat-card warning">
              <div className="card-body">
                <div className="stat-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="stat-content">
                  <h3>{stats.overview.closingSoon}</h3>
                  <p>Closing Soon (7 Days)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-3">
            <div className="card stat-card success">
              <div className="card-body">
                <div className="stat-icon">
                  <i className="fas fa-rupee-sign"></i>
                </div>
                <div className="stat-content">
                  <h3>{stats.overview.highValueTenders}</h3>
                  <p>High-Value Tenders</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-3">
            <div className="card stat-card info">
              <div className="card-body">
                <div className="stat-icon">
                  <i className="fas fa-coins"></i>
                </div>
                <div className="stat-content">
                  <h3>{stats.overview.totalEstimatedValue}</h3>
                  <p>Total Estimated Value</p>
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
                  Tender Value by Department
                </h3>
              </div>
              <div className="card-body">
                <Bar data={tenderValueData} options={chartOptions} />
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
                        <th>Total Value</th>
                        <th>Avg. Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.topAuthorities.map((authority, index) => (
                        <tr key={index}>
                          <td>{authority.authority}</td>
                          <td>{authority.tenderCount}</td>
                          <td>{authority.totalValue}</td>
                          <td>{authority.avgValue}</td>
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

export default ApiStatisticsPage;