import React, { useState, useEffect } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  Edit,
  Call,
  Visibility,
  Today,
  PersonAdd,
  Search,
  FilterList,
  Close,
  PeopleAlt,
  AddCircleOutline,
  CalendarToday,
  CheckCircleOutline
} from '@mui/icons-material';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [followUpFilter, setFollowUpFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);

  // Sample lead data
  useEffect(() => {
    const sampleLeads = [
      {
        id: 1,
        leadId: 'L001',
        name: 'Rajesh Kumar',
        phone: '9876543210',
        email: 'rajesh@example.com',
        location: 'Mumbai, Maharashtra',
        productInterest: 'Solar Panel Installation',
        leadSource: 'Website',
        status: 'Contacted',
        assignedTelecaller: 'John Doe',
        lastContacted: '2024-01-15',
        nextFollowUp: '2024-01-20',
        notes: 'Interested in residential solar solutions. Asked for detailed quote.',
        callHistory: [
          { date: '2024-01-15', outcome: 'Connected', notes: 'Initial contact made, interested in quote' },
          { date: '2024-01-10', outcome: 'Follow-up', notes: 'Sent proposal, waiting for response' }
        ]
      },
      {
        id: 2,
        leadId: 'L002',
        name: 'Priya Sharma',
        phone: '9123456789',
        email: 'priya@example.com',
        location: 'Bangalore, Karnataka',
        productInterest: 'EV Charging Stations',
        leadSource: 'Ad',
        status: 'Interested',
        assignedTelecaller: 'Jane Smith',
        lastContacted: '2024-01-14',
        nextFollowUp: '2024-01-18',
        notes: 'Looking for commercial EV charging solutions for office building.',
        callHistory: [
          { date: '2024-01-14', outcome: 'Connected', notes: 'Detailed discussion about requirements' }
        ]
      },
      {
        id: 3,
        leadId: 'L003',
        name: 'Vikram Singh',
        phone: '8765432109',
        email: 'vikram@example.com',
        location: 'Delhi, Delhi',
        productInterest: 'Wind Energy Systems',
        leadSource: 'Referral',
        status: 'New',
        assignedTelecaller: 'John Doe',
        lastContacted: '2024-01-13',
        nextFollowUp: '2024-01-16',
        notes: 'New lead from referral, needs initial contact.',
        callHistory: []
      },
      {
        id: 4,
        leadId: 'L004',
        name: 'Anita Desai',
        phone: '7654321098',
        email: 'anita@example.com',
        location: 'Pune, Maharashtra',
        productInterest: 'Solar Street Lights',
        leadSource: 'Manual',
        status: 'Follow-up',
        assignedTelecaller: 'Jane Smith',
        lastContacted: '2024-01-12',
        nextFollowUp: '2024-01-15',
        notes: 'Follow-up required, previously showed interest.',
        callHistory: [
          { date: '2024-01-12', outcome: 'Connected', notes: 'Interested but needs budget confirmation' },
          { date: '2024-01-08', outcome: 'Call Back', notes: 'Busy, scheduled for later' }
        ]
      },
      {
        id: 5,
        leadId: 'L005',
        name: 'Suresh Patel',
        phone: '6543210987',
        email: 'suresh@example.com',
        location: 'Ahmedabad, Gujarat',
        productInterest: 'Solar Water Pumps',
        leadSource: 'Website',
        status: 'Converted',
        assignedTelecaller: 'John Doe',
        lastContacted: '2024-01-11',
        nextFollowUp: null,
        notes: 'Converted to customer, project in progress.',
        callHistory: [
          { date: '2024-01-11', outcome: 'Converted', notes: 'Finalized deal, contract signed' },
          { date: '2024-01-09', outcome: 'Negotiation', notes: 'Price negotiation completed' }
        ]
      },
      {
        id: 6,
        leadId: 'L006',
        name: 'Kavita Reddy',
        phone: '5432109876',
        email: 'kavita@example.com',
        location: 'Hyderabad, Telangana',
        productInterest: 'Solar Inverters',
        leadSource: 'Ad',
        status: 'Not Interested',
        assignedTelecaller: 'Jane Smith',
        lastContacted: '2024-01-10',
        nextFollowUp: null,
        notes: 'Not interested in current solutions.',
        callHistory: [
          { date: '2024-01-10', outcome: 'Not Interested', notes: 'No interest in solar products' }
        ]
      }
    ];
    setLeads(sampleLeads);
    setFilteredLeads(sampleLeads);
  }, []);

  // Filter leads based on search and filters
  useEffect(() => {
    let filtered = leads;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    // Follow-up filter
    if (followUpFilter !== 'all') {
      if (followUpFilter === 'today') {
        const today = new Date().toISOString().split('T')[0];
        filtered = filtered.filter(lead => lead.nextFollowUp === today);
      } else if (followUpFilter === 'overdue') {
        const today = new Date();
        filtered = filtered.filter(lead => 
          lead.nextFollowUp && new Date(lead.nextFollowUp) < today
        );
      }
    }

    setFilteredLeads(filtered);
  }, [searchTerm, statusFilter, followUpFilter, leads]);

  const handleCall = (phone) => {
    alert(`Calling ${phone}...`);
  };

  const handleViewDetails = (lead) => {
    setSelectedLead(lead);
    setOpenDetails(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'default';
      case 'Contacted': return 'info';
      case 'Interested': return 'success';
      case 'Follow-up': return 'warning';
      case 'Converted': return 'success';
      case 'Not Interested': return 'error';
      default: return 'default';
    }
  };

  const getLeadSourceColor = (source) => {
    switch (source) {
      case 'Website': return 'primary';
      case 'Ad': return 'secondary';
      case 'Referral': return 'success';
      case 'Manual': return 'info';
      default: return 'default';
    }
  };

  const getSummaryData = () => {
    return {
      totalLeads: leads.length,
      newLeads: leads.filter(lead => lead.status === 'New').length,
      followUpsToday: leads.filter(lead => lead.nextFollowUp === new Date().toISOString().split('T')[0]).length,
      convertedLeads: leads.filter(lead => lead.status === 'Converted').length
    };
  };

  const summary = getSummaryData();

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1e293b', fontWeight: 500 }}>
            Leads
          </Typography>
          <Typography variant="h6" sx={{ color: '#64748b', mb: 3 }}>
            Manage and track potential customers
          </Typography>
        </Grid>
      </Grid>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)', 
            borderRadius: '18px', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            padding: '24px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': { 
              transform: 'translateY(-4px)', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.01)' 
            }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ 
                backgroundColor: 'rgba(2, 132, 199, 0.1)', 
                borderRadius: '12px', 
                p: 1.5,
                mr: 2
              }}>
                <PeopleAlt sx={{ color: '#0284C7', fontSize: 24 }} />
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(30, 41, 59, 0.8)', fontWeight: 500, fontSize: '0.875rem', mb: 1 }}>
              Total Leads
            </Typography>
            <Typography variant="h4" sx={{ color: '#1e293b', fontWeight: 'bold', fontSize: '2rem' }}>
              {summary.totalLeads}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #ECFDF5 0%, #BBF7D0 100%)', 
            borderRadius: '18px', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            padding: '24px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': { 
              transform: 'translateY(-4px)', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.01)' 
            }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ 
                backgroundColor: 'rgba(22, 163, 74, 0.1)', 
                borderRadius: '12px', 
                p: 1.5,
                mr: 2
              }}>
                <AddCircleOutline sx={{ color: '#16A34A', fontSize: 24 }} />
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(30, 41, 59, 0.8)', fontWeight: 500, fontSize: '0.875rem', mb: 1 }}>
              New Leads
            </Typography>
            <Typography variant="h4" sx={{ color: '#1e293b', fontWeight: 'bold', fontSize: '2rem' }}>
              {summary.newLeads}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #FFF7ED 0%, #FED7AA 100%)', 
            borderRadius: '18px', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            padding: '24px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': { 
              transform: 'translateY(-4px)', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.01)' 
            }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ 
                backgroundColor: 'rgba(234, 88, 12, 0.1)', 
                borderRadius: '12px', 
                p: 1.5,
                mr: 2
              }}>
                <CalendarToday sx={{ color: '#EA580C', fontSize: 24 }} />
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(30, 41, 59, 0.8)', fontWeight: 500, fontSize: '0.875rem', mb: 1 }}>
              Follow-ups Today
            </Typography>
            <Typography variant="h4" sx={{ color: '#1e293b', fontWeight: 'bold', fontSize: '2rem' }}>
              {summary.followUpsToday}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #F5F3FF 0%, #DDD6FE 100%)', 
            borderRadius: '18px', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            padding: '24px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': { 
              transform: 'translateY(-4px)', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.01)' 
            }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ 
                backgroundColor: 'rgba(124, 58, 237, 0.1)', 
                borderRadius: '12px', 
                p: 1.5,
                mr: 2
              }}>
                <CheckCircleOutline sx={{ color: '#7C3AED', fontSize: 24 }} />
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(30, 41, 59, 0.8)', fontWeight: 500, fontSize: '0.875rem', mb: 1 }}>
              Converted Leads
            </Typography>
            <Typography variant="h4" sx={{ color: '#1e293b', fontWeight: 'bold', fontSize: '2rem' }}>
              {summary.convertedLeads}
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and Search */}
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
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search Leads"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: '#94a3b8' }} />,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: '#f8fafc',
                  '&:hover': {
                    backgroundColor: 'white',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'white',
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                displayEmpty
                sx={{
                  borderRadius: '12px',
                  backgroundColor: '#f8fafc',
                  '&:hover': {
                    backgroundColor: 'white',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'white',
                  },
                }}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="New">New</MenuItem>
                <MenuItem value="Contacted">Contacted</MenuItem>
                <MenuItem value="Interested">Interested</MenuItem>
                <MenuItem value="Follow-up">Follow-up</MenuItem>
                <MenuItem value="Converted">Converted</MenuItem>
                <MenuItem value="Not Interested">Not Interested</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <Select
                value={followUpFilter}
                onChange={(e) => setFollowUpFilter(e.target.value)}
                displayEmpty
                sx={{
                  borderRadius: '12px',
                  backgroundColor: '#f8fafc',
                  '&:hover': {
                    backgroundColor: 'white',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'white',
                  },
                }}
              >
                <MenuItem value="all">All Follow-ups</MenuItem>
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="overdue">Overdue</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Leads Table */}
      <Grid item xs={12}>
        <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
          <CardHeader
            title="Leads List"
            action={
              <Button variant="contained" startIcon={<PersonAdd />}>
                Add Lead
              </Button>
            }
            sx={{ backgroundColor: '#1a237e', color: 'white' }}
          />
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
                    <TableCell><Typography variant="subtitle2" fontWeight="bold">Lead ID</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight="bold">Name</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight="bold">Phone</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight="bold">Email</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight="bold">Location</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight="bold">Product Interest</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight="bold">Lead Source</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight="bold">Status</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight="bold">Assigned</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight="bold">Last Contacted</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight="bold">Next Follow-up</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2" fontWeight="bold">Actions</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id} hover>
                      <TableCell>{lead.leadId}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: '#1a237e', mr: 1, width: 32, height: 32 }}>
                            {lead.name.charAt(0)}
                          </Avatar>
                          {lead.name}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          size="small" 
                          onClick={() => handleCall(lead.phone)}
                          sx={{ color: '#1a237e' }}
                        >
                          <Phone fontSize="small" />
                        </IconButton>
                        {lead.phone}
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" sx={{ color: '#1a237e' }}>
                          <Email fontSize="small" />
                        </IconButton>
                        {lead.email}
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" sx={{ color: '#1a237e' }}>
                          <LocationOn fontSize="small" />
                        </IconButton>
                        {lead.location}
                      </TableCell>
                      <TableCell>{lead.productInterest}</TableCell>
                      <TableCell>
                        <Chip 
                          label={lead.leadSource} 
                          size="small" 
                          color={getLeadSourceColor(lead.leadSource)}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={lead.status} 
                          size="small" 
                          color={getStatusColor(lead.status)}
                          variant="filled"
                        />
                      </TableCell>
                      <TableCell>{lead.assignedTelecaller}</TableCell>
                      <TableCell>{lead.lastContacted}</TableCell>
                      <TableCell>
                        {lead.nextFollowUp ? lead.nextFollowUp : '-'}
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          size="small" 
                          onClick={() => handleCall(lead.phone)}
                          title="Call Lead"
                          sx={{ color: '#4caf50' }}
                        >
                          <Call />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={() => handleViewDetails(lead)}
                          title="View Details"
                          sx={{ color: '#2196f3' }}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          title="Edit Lead"
                          sx={{ color: '#ff9800' }}
                        >
                          <Edit />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Lead Details Dialog */}
      <Dialog 
        open={openDetails} 
        onClose={() => setOpenDetails(false)} 
        maxWidth="md" 
        fullWidth
      >
        {selectedLead && (
          <>
            <DialogTitle sx={{ backgroundColor: '#1a237e', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: '#1a237e', mr: 2, width: 40, height: 40 }}>
                  {selectedLead.name.charAt(0)}
                </Avatar>
                {selectedLead.name}
              </Box>
              <IconButton onClick={() => setOpenDetails(false)} sx={{ color: 'white' }}>
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Tabs value={0} sx={{ mb: 2 }}>
                <Tab label="Details" />
                <Tab label="Call History" />
                <Tab label="Notes" />
              </Tabs>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Lead Information</Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Lead ID" secondary={selectedLead.leadId} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Name" secondary={selectedLead.name} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Phone" secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Phone sx={{ mr: 1, fontSize: 16 }} />
                          {selectedLead.phone}
                        </Box>
                      } />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Email" secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Email sx={{ mr: 1, fontSize: 16 }} />
                          {selectedLead.email}
                        </Box>
                      } />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Location" secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationOn sx={{ mr: 1, fontSize: 16 }} />
                          {selectedLead.location}
                        </Box>
                      } />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Product Interest" secondary={selectedLead.productInterest} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Lead Source" secondary={
                        <Chip 
                          label={selectedLead.leadSource} 
                          size="small" 
                          color={getLeadSourceColor(selectedLead.leadSource)}
                          variant="outlined"
                        />
                      } />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Lead Status</Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Status" secondary={
                        <Chip 
                          label={selectedLead.status} 
                          size="small" 
                          color={getStatusColor(selectedLead.status)}
                          variant="filled"
                        />
                      } />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Assigned Telecaller" secondary={selectedLead.assignedTelecaller} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Last Contacted" secondary={selectedLead.lastContacted} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Next Follow-up" secondary={selectedLead.nextFollowUp || '-'} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Notes" secondary={selectedLead.notes} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="h6" gutterBottom>Call History</Typography>
              {selectedLead.callHistory.length > 0 ? (
                <List>
                  {selectedLead.callHistory.map((call, index) => (
                    <ListItem key={index} sx={{ border: '1px solid #e0e0e0', borderRadius: 1, mb: 1 }}>
                      <ListItemText 
                        primary={`${call.date} - ${call.outcome}`} 
                        secondary={call.notes}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="textSecondary">No call history available</Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDetails(false)}>Close</Button>
              <Button variant="contained" color="primary">Update Status</Button>
              <Button variant="contained" color="success">Schedule Follow-up</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Leads;