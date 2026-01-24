import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  IconButton,
  Chip,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  LinearProgress
} from '@mui/material';
import {
  Phone,
  Link,
  PhoneDisabled,
  CalendarToday,
  Verified,
  TrendingUp,
  AccessTime,
  AssignmentTurnedIn,
  Person,
  ArrowDropDown,
  MoreVert,
  PersonAdd,
  CalendarMonth,
  Done,
  BarChart,
  WatchLater,
  HourglassEmpty,
  ThumbsUpDown,
  DoneAll
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart as RechartsBarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('daily');
  const [selectedTelecaller, setSelectedTelecaller] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [timeRange, setTimeRange] = useState('daily'); // For calls trend toggle

  // Mock data for KPI cards
  const [kpiData, setKpiData] = useState({
    totalCalls: 0,
    connectedCalls: 0,
    missedCalls: 0,
    followUpsScheduled: 0,
    leadsConverted: 0,
    conversionRate: 0
  });

  // Mock data for call analytics
  const [callAnalytics, setCallAnalytics] = useState({
    avgDuration: 0,
    successRate: 0
  });

  // Mock data for lead analytics
  const [leadAnalytics, setLeadAnalytics] = useState({
    totalAssigned: 0,
    contacted: 0,
    pending: 0,
    interested: 0,
    notInterested: 0
  });

  // Mock data for follow-up analytics
  const [followUpAnalytics, setFollowUpAnalytics] = useState({
    dueToday: 0,
    completed: 0,
    missed: 0
  });

  // Mock data for charts
  const [callsOverTime, setCallsOverTime] = useState([]);
  const [leadStatusData, setLeadStatusData] = useState([]);
  const [conversionFunnelData, setConversionFunnelData] = useState([]);
  const [followupPerformance, setFollowupPerformance] = useState([]);
  const [activityInsights, setActivityInsights] = useState({});
  const [detailedAnalytics, setDetailedAnalytics] = useState([]);
  const [dailyActivityTrend, setDailyActivityTrend] = useState([]);

  // Simulate loading data
  useEffect(() => {
    const loadData = () => {
      // Simulate API call delay
      setTimeout(() => {
        setKpiData({
          totalCalls: 142,
          connectedCalls: 86,
          missedCalls: 56,
          followUpsScheduled: 45,
          leadsConverted: 28,
          conversionRate: 19.7
        });

        setCallAnalytics({
          avgDuration: 4.2,
          successRate: 60.5
        });

        setLeadAnalytics({
          totalAssigned: 150,
          contacted: 120,
          pending: 30,
          interested: 75,
          notInterested: 45
        });

        setFollowUpAnalytics({
          dueToday: 18,
          completed: 25,
          missed: 7
        });

        setCallsOverTime([
          { period: 'Mon', calls: 20 },
          { period: 'Tue', calls: 35 },
          { period: 'Wed', calls: 28 },
          { period: 'Thu', calls: 42 },
          { period: 'Fri', calls: 37 },
          { period: 'Sat', calls: 18 },
          { period: 'Sun', calls: 12 }
        ]);

        setDailyActivityTrend([
          { day: 'Mon', activity: 65 },
          { day: 'Tue', activity: 80 },
          { day: 'Wed', activity: 70 },
          { day: 'Thu', activity: 85 },
          { day: 'Fri', activity: 75 },
          { day: 'Sat', activity: 50 },
          { day: 'Sun', activity: 40 }
        ]);

        setLeadStatusData([
          { name: 'New', value: 45 },
          { name: 'Contacted', value: 32 },
          { name: 'Follow-up', value: 28 },
          { name: 'Converted', value: 12 },
          { name: 'Not Interested', value: 15 }
        ]);

        setConversionFunnelData([
          { stage: 'Leads', value: 150 },
          { stage: 'Contacted', value: 120 },
          { stage: 'Follow-up', value: 65 },
          { stage: 'Converted', value: 28 }
        ]);

        setFollowupPerformance([
          { period: 'Mon', completed: 8, missed: 2 },
          { period: 'Tue', completed: 12, missed: 1 },
          { period: 'Wed', completed: 10, missed: 3 },
          { period: 'Thu', completed: 15, missed: 0 },
          { period: 'Fri', completed: 7, missed: 4 },
          { period: 'Sat', completed: 3, missed: 1 },
          { period: 'Sun', completed: 2, missed: 2 }
        ]);

        setActivityInsights({
          bestTime: '10 AM - 12 PM',
          avgDuration: '4.2 min',
          responseRate: '61%',
          productivityScore: 85
        });

        setDetailedAnalytics([
          { id: 1, date: '2023-05-01', telecaller: 'John Doe', callsMade: 15, connectedCalls: 10, followUpsDone: 3, leadsConverted: 1 },
          { id: 2, date: '2023-05-02', telecaller: 'Jane Smith', callsMade: 12, connectedCalls: 8, followUpsDone: 2, leadsConverted: 0 },
          { id: 3, date: '2023-05-03', telecaller: 'Bob Johnson', callsMade: 18, connectedCalls: 14, followUpsDone: 5, leadsConverted: 2 },
          { id: 4, date: '2023-05-04', telecaller: 'Alice Williams', callsMade: 22, connectedCalls: 16, followUpsDone: 4, leadsConverted: 1 },
          { id: 5, date: '2023-05-05', telecaller: 'Charlie Brown', callsMade: 14, connectedCalls: 9, followUpsDone: 2, leadsConverted: 0 }
        ]);
      }, 800);
    };

    loadData();
  }, []);

  // Handle filter changes
  useEffect(() => {
    // In a real app, this would trigger API calls with the selected filters
    console.log('Filters updated:', { dateRange, selectedTelecaller, selectedStatus });
  }, [dateRange, selectedTelecaller, selectedStatus]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6B6B'];

  // Toggle time range for calls chart
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    // Update the chart data based on the selected range
    if (range === 'daily') {
      setCallsOverTime([
        { period: 'Mon', calls: 20 },
        { period: 'Tue', calls: 35 },
        { period: 'Wed', calls: 28 },
        { period: 'Thu', calls: 42 },
        { period: 'Fri', calls: 37 },
        { period: 'Sat', calls: 18 },
        { period: 'Sun', calls: 12 }
      ]);
    } else if (range === 'weekly') {
      setCallsOverTime([
        { period: 'Week 1', calls: 180 },
        { period: 'Week 2', calls: 210 },
        { period: 'Week 3', calls: 195 },
        { period: 'Week 4', calls: 220 }
      ]);
    } else if (range === 'monthly') {
      setCallsOverTime([
        { period: 'Jan', calls: 750 },
        { period: 'Feb', calls: 820 },
        { period: 'Mar', calls: 780 },
        { period: 'Apr', calls: 850 }
      ]);
    }
  };

  const StatCard = ({ title, value, icon, gradient, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <Card sx={{ 
        background: gradient, 
        borderRadius: '20px', 
        boxShadow: '10px 10px 20px #d1d9e6, -10px -10px 20px #ffffff',
        padding: '24px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': { 
          transform: 'translateY(-8px)', 
          boxShadow: '15px 15px 30px #d1d9e6, -15px -15px 30px #ffffff' 
        }
      }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h3" component="div" sx={{ fontSize: '2rem', fontWeight: 'bold', color: '#0F172A', mb: 1 }}>
                {typeof value === 'number' && value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 600 }}>
                {title}
              </Typography>
            </Box>
            <Box sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.2)', 
              borderRadius: '50%', 
              p: 1.5,
              backdropFilter: 'blur(10px)'
            }}>
              {icon}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Box sx={{ 
      padding: 3, 
      backgroundColor: '#F2F6FB', 
      minHeight: '100vh',
      fontFamily: 'Inter, sans-serif',
      color: '#0F172A'
    }}>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" sx={{ color: '#0F172A', fontWeight: 600, mb: 1 }}>
            Telecaller Analytics
          </Typography>
          <Typography variant="h6" sx={{ color: '#64748B' }}>
            Performance insights and lead conversion overview
          </Typography>
        </Grid>
      </Grid>

      {/* Breadcrumbs */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ color: '#64748B' }}>
          Dashboard / Telecaller / Analytics
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard 
            title="Total Calls" 
            value={kpiData.totalCalls} 
            icon={<Phone sx={{ fontSize: 30, color: '#2563EB' }} />} 
            gradient="linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)"
            delay={0.1}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard 
            title="Connected" 
            value={kpiData.connectedCalls} 
            icon={<Link sx={{ fontSize: 30, color: '#16A34A' }} />} 
            gradient="linear-gradient(135deg, #ECFDF5 0%, #BBF7D0 100%)"
            delay={0.2}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard 
            title="Missed" 
            value={kpiData.missedCalls} 
            icon={<PhoneDisabled sx={{ fontSize: 30, color: '#F59E0B' }} />} 
            gradient="linear-gradient(135deg, #FEF3C7 0%, #FCD34D 100%)"
            delay={0.3}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard 
            title="Follow-ups" 
            value={kpiData.followUpsScheduled} 
            icon={<CalendarMonth sx={{ fontSize: 30, color: '#7C3AED' }} />} 
            gradient="linear-gradient(135deg, #F5F3FF 0%, #DDD6FE 100%)"
            delay={0.4}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard 
            title="Converted" 
            value={kpiData.leadsConverted} 
            icon={<Done sx={{ fontSize: 30, color: '#0D9488' }} />} 
            gradient="linear-gradient(135deg, #F0FDF4 0%, #A7F3D0 100%)"
            delay={0.5}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StatCard 
            title="Rate" 
            value={`${kpiData.conversionRate}%`} 
            icon={<TrendingUp sx={{ fontSize: 30, color: '#DB2777' }} />} 
            gradient="linear-gradient(135deg, #FAF5FF 0%, #EDE9FE 100%)"
            delay={0.6}
          />
        </Grid>
      </Grid>

      {/* Filters and Controls */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 2, 
          borderRadius: '16px', 
          backgroundColor: 'white',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
          mb: 3
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Date Range</InputLabel>
              <Select
                value={dateRange}
                label="Date Range"
                onChange={(e) => setDateRange(e.target.value)}
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Telecaller</InputLabel>
              <Select
                value={selectedTelecaller}
                label="Telecaller"
                onChange={(e) => setSelectedTelecaller(e.target.value)}
              >
                <MenuItem value="all">All Telecallers</MenuItem>
                <MenuItem value="john">John Doe</MenuItem>
                <MenuItem value="jane">Jane Smith</MenuItem>
                <MenuItem value="bob">Bob Johnson</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedStatus}
                label="Status"
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="converted">Converted</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                size="small" 
                variant={timeRange === 'daily' ? 'contained' : 'outlined'} 
                onClick={() => handleTimeRangeChange('daily')}
                sx={{ borderRadius: '12px' }}
              >
                Day
              </Button>
              <Button 
                size="small" 
                variant={timeRange === 'weekly' ? 'contained' : 'outlined'} 
                onClick={() => handleTimeRangeChange('weekly')}
                sx={{ borderRadius: '12px' }}
              >
                Week
              </Button>
              <Button 
                size="small" 
                variant={timeRange === 'monthly' ? 'contained' : 'outlined'} 
                onClick={() => handleTimeRangeChange('monthly')}
                sx={{ borderRadius: '12px' }}
              >
                Month
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Left Column - Charts */}
        <Grid item xs={12} lg={8}>
          {/* Calls Over Time Chart */}
          <Card sx={{ 
            borderRadius: '20px', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            mb: 3,
            p: 2,
            backgroundColor: 'white'
          }}>
            <CardHeader 
              title="Calls Trend" 
              action={
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button 
                    size="small" 
                    variant={timeRange === 'daily' ? 'contained' : 'outlined'} 
                    onClick={() => handleTimeRangeChange('daily')}
                    sx={{ borderRadius: '12px' }}
                  >
                    Daily
                  </Button>
                  <Button 
                    size="small" 
                    variant={timeRange === 'weekly' ? 'contained' : 'outlined'} 
                    onClick={() => handleTimeRangeChange('weekly')}
                    sx={{ borderRadius: '12px' }}
                  >
                    Weekly
                  </Button>
                  <Button 
                    size="small" 
                    variant={timeRange === 'monthly' ? 'contained' : 'outlined'} 
                    onClick={() => handleTimeRangeChange('monthly')}
                    sx={{ borderRadius: '12px' }}
                  >
                    Monthly
                  </Button>
                </Box>
              }
            />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={callsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="period" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0'
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="calls" 
                    stroke="#2563EB" 
                    strokeWidth={3} 
                    dot={{ r: 5, fill: '#2563EB' }}
                    activeDot={{ r: 8, stroke: '#2563EB', strokeWidth: 2 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Lead Status Distribution */}
          <Card sx={{ 
            borderRadius: '20px', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            mb: 3,
            p: 2,
            backgroundColor: 'white'
          }}>
            <CardHeader title="Lead Status Distribution" />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={leadStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {leadStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0'
                    }} 
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Other Charts and Insights */}
        <Grid item xs={12} lg={4}>
          {/* Conversion Funnel - Using BarChart instead of FunnelChart since it doesn't exist in recharts */}
          <Card sx={{ 
            borderRadius: '20px', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            mb: 3,
            p: 2,
            backgroundColor: 'white'
          }}>
            <CardHeader title="Conversion Funnel" />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart
                  layout="vertical"
                  data={conversionFunnelData}
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" stroke="#64748b" />
                  <YAxis dataKey="stage" type="category" stroke="#64748b" width={80} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0'
                    }} 
                  />
                  <Bar dataKey="value" fill="#7C3AED" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Follow-up Performance */}
          <Card sx={{ 
            borderRadius: '20px', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            mb: 3,
            p: 2,
            backgroundColor: 'white'
          }}>
            <CardHeader title="Follow-up Performance" />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart
                  data={followupPerformance}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="period" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="completed" fill="#16A34A" name="Completed" />
                  <Bar dataKey="missed" fill="#EF4444" name="Missed" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Activity Insights */}
          <Card sx={{ 
            borderRadius: '20px', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            p: 2,
            backgroundColor: 'white'
          }}>
            <CardHeader title="Insights & Metrics" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#F1F5F9', borderRadius: '12px' }}>
                    <AccessTime sx={{ fontSize: 30, color: '#2563EB', mb: 1 }} />
                    <Typography variant="body2" sx={{ color: '#64748B' }}>Best Time</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{activityInsights.bestTime || '--'}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#F1F5F9', borderRadius: '12px' }}>
                    <WatchLater sx={{ fontSize: 30, color: '#16A34A', mb: 1 }} />
                    <Typography variant="body2" sx={{ color: '#64748B' }}>Avg Duration</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{callAnalytics.avgDuration || 0} min</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#F1F5F9', borderRadius: '12px' }}>
                    <ThumbsUpDown sx={{ fontSize: 30, color: '#F59E0B', mb: 1 }} />
                    <Typography variant="body2" sx={{ color: '#64748B' }}>Success Rate</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{callAnalytics.successRate || 0}%</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#F1F5F9', borderRadius: '12px' }}>
                    <BarChart sx={{ fontSize: 30, color: '#8B5CF6', mb: 1 }} />
                    <Typography variant="body2" sx={{ color: '#64748B' }}>Productivity</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{activityInsights.productivityScore || '--'}%</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Additional Analytics Sections */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {/* Lead Analytics */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            borderRadius: '20px', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            p: 2,
            backgroundColor: 'white'
          }}>
            <CardHeader title="Lead Analytics" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#E0F2FE', borderRadius: '12px' }}>
                    <PersonAdd sx={{ fontSize: 30, color: '#2563EB', mb: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{leadAnalytics.totalAssigned}</Typography>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>Assigned</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#DCFCE7', borderRadius: '12px' }}>
                    <DoneAll sx={{ fontSize: 30, color: '#16A34A', mb: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{leadAnalytics.contacted}</Typography>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>Contacted</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#FEF3C7', borderRadius: '12px' }}>
                    <HourglassEmpty sx={{ fontSize: 30, color: '#F59E0B', mb: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{leadAnalytics.pending}</Typography>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>Pending</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#FEE2E2', borderRadius: '12px' }}>
                    <PhoneDisabled sx={{ fontSize: 30, color: '#EF4444', mb: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{leadAnalytics.notInterested}</Typography>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>Not Interested</Typography>
                  </Box>
                </Grid>
              </Grid>
              
              {/* Interested vs Not Interested Chart */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>Interested vs Not Interested Leads</Typography>
                <ResponsiveContainer width="100%" height={150}>
                  <RechartsBarChart
                    layout="horizontal"
                    data={[
                      { name: 'Interested', value: leadAnalytics.interested },
                      { name: 'Not Interested', value: leadAnalytics.notInterested }
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" stroke="#64748b" />
                    <YAxis dataKey="name" type="category" stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0'
                      }} 
                    />
                    <Bar dataKey="value" fill="#16A34A" name="Count" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Follow-up Analytics */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            borderRadius: '20px', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            p: 2,
            backgroundColor: 'white'
          }}>
            <CardHeader title="Follow-up Analytics" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#E0F2FE', borderRadius: '12px' }}>
                    <CalendarToday sx={{ fontSize: 30, color: '#2563EB', mb: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{followUpAnalytics.dueToday}</Typography>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>Due Today</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#DCFCE7', borderRadius: '12px' }}>
                    <Done sx={{ fontSize: 30, color: '#16A34A', mb: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{followUpAnalytics.completed}</Typography>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>Completed</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#FEE2E2', borderRadius: '12px' }}>
                    <PhoneDisabled sx={{ fontSize: 30, color: '#EF4444', mb: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{followUpAnalytics.missed}</Typography>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>Missed</Typography>
                  </Box>
                </Grid>
              </Grid>
              
              {/* Daily Activity Trend */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>Daily Activity Trend</Typography>
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={dailyActivityTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" stroke="#64748b" />
                    <YAxis stroke="#64748b" domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="activity" 
                      stroke="#7C3AED" 
                      strokeWidth={2} 
                      dot={{ r: 4, fill: '#7C3AED' }}
                      activeDot={{ r: 6, stroke: '#7C3AED', strokeWidth: 2 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Detailed Analytics Table */}
      <Card sx={{ 
        borderRadius: '20px', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        mt: 3,
        backgroundColor: 'white'
      }}>
        <CardHeader title="Detailed Analytics" />
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Telecaller Name</TableCell>
                  <TableCell>Calls Made</TableCell>
                  <TableCell>Connected Calls</TableCell>
                  <TableCell>Follow-ups Done</TableCell>
                  <TableCell>Leads Converted</TableCell>
                  <TableCell>Performance Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detailedAnalytics.map((row) => (
                  <TableRow key={row.id} sx={{ '&:hover': { backgroundColor: '#f8fafc' } }}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.telecaller}</TableCell>
                    <TableCell>{row.callsMade}</TableCell>
                    <TableCell>{row.connectedCalls}</TableCell>
                    <TableCell>{row.followUpsDone}</TableCell>
                    <TableCell>{row.leadsConverted}</TableCell>
                    <TableCell>
                      <Chip 
                        label={`${Math.round((row.leadsConverted / row.callsMade) * 100)}%`} 
                        size="small" 
                        sx={{ 
                          backgroundColor: '#E0F2FE', 
                          color: '#0284C7',
                          fontWeight: 'bold'
                        }} 
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Analytics;