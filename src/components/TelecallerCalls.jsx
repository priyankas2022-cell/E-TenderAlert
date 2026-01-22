import React, { useState, useEffect } from 'react';

const TelecallerCalls = () => {
  const [calls, setCalls] = useState([]);
  const [filteredCalls, setFilteredCalls] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCall, setSelectedCall] = useState(null);

  // Sample call data
  useEffect(() => {
    const sampleCalls = [
      {
        id: 1,
        leadName: "ABC Construction",
        contact: "9876543210",
        date: "2024-01-15",
        duration: "12:30",
        status: "Connected",
        recording: "recording_1.mp3",
        transcript: "Hello, this is ABC Construction. We are interested in the solar tender you mentioned. Can you provide more details?",
        notes: "Interested in solar projects, asked for detailed specifications",
        outcome: "Follow-up scheduled"
      },
      {
        id: 2,
        leadName: "XYZ Infrastructure",
        contact: "9123456789",
        date: "2024-01-14",
        duration: "08:45",
        status: "Missed",
        recording: "recording_2.mp3",
        transcript: "Call not answered. Left a voicemail requesting callback.",
        notes: "Call not answered, left voicemail",
        outcome: "Callback scheduled"
      },
      {
        id: 3,
        leadName: "PQR Developers",
        contact: "8765432109",
        date: "2024-01-13",
        duration: "15:20",
        status: "Connected",
        recording: "recording_3.mp3",
        transcript: "Good morning! Yes, we are looking for tender opportunities in infrastructure. What do you have?",
        notes: "Active interest in infrastructure tenders, requested weekly updates",
        outcome: "Added to weekly updates"
      },
      {
        id: 4,
        leadName: "LMN Power Solutions",
        contact: "7654321098",
        date: "2024-01-12",
        duration: "10:15",
        status: "Connected",
        recording: "recording_4.mp3",
        transcript: "We are interested in renewable energy projects. Can you share the tender details for the solar plant?",
        notes: "Interested in renewable energy projects, requested tender documents",
        outcome: "Documents sent"
      },
      {
        id: 5,
        leadName: "STU Building Materials",
        contact: "6543210987",
        date: "2024-01-11",
        duration: "05:30",
        status: "Disconnected",
        recording: "recording_5.mp3",
        transcript: "Not interested at the moment. Please don't call again.",
        notes: "Not interested, marked as cold lead",
        outcome: "Marked as cold lead"
      }
    ];
    setCalls(sampleCalls);
    setFilteredCalls(sampleCalls);
  }, []);

  // Filter calls based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = calls.filter(call => 
        call.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        call.contact.includes(searchTerm) ||
        call.transcript.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCalls(filtered);
    } else {
      setFilteredCalls(calls);
    }
  }, [searchTerm, calls]);

  const handlePlayRecording = (recording) => {
    // In a real app, this would play the actual recording
    alert(`Playing recording: ${recording}`);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Connected': return 'success';
      case 'Missed': return 'warning';
      case 'Disconnected': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <div className="telecaller-calls-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-header">
              <h2 className="header-title">Call Records</h2>
              <p className="header-subtitle">Manage and review all your telecaller interactions</p>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <div className="search-box">
              <input
                type="text"
                className="form-control"
                placeholder="Search calls by lead name, contact, or transcript..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6 text-end">
            <div className="stats-cards">
              <div className="stat-card">
                <h4>{calls.length}</h4>
                <p>Total Calls</p>
              </div>
              <div className="stat-card">
                <h4>{calls.filter(c => c.status === 'Connected').length}</h4>
                <p>Connected</p>
              </div>
              <div className="stat-card">
                <h4>{calls.filter(c => c.status === 'Missed').length}</h4>
                <p>Missed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="calls-list">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Lead Name</th>
                          <th>Contact</th>
                          <th>Date</th>
                          <th>Duration</th>
                          <th>Status</th>
                          <th>Outcome</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCalls.map((call) => (
                          <tr key={call.id} className={selectedCall?.id === call.id ? 'selected' : ''}>
                            <td>{call.leadName}</td>
                            <td>{call.contact}</td>
                            <td>{call.date}</td>
                            <td>{call.duration}</td>
                            <td>
                              <span className={`badge bg-${getStatusColor(call.status)}`}>
                                {call.status}
                              </span>
                            </td>
                            <td>{call.outcome}</td>
                            <td>
                              <button 
                                className="btn btn-sm btn-outline-primary me-2"
                                onClick={() => setSelectedCall(call)}
                              >
                                View Details
                              </button>
                              <button 
                                className="btn btn-sm btn-outline-success"
                                onClick={() => handlePlayRecording(call.recording)}
                              >
                                Play Recording
                              </button>
                            </td>
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

        {selectedCall && (
          <div className="row mt-4">
            <div className="col-12">
              <div className="call-details-card card">
                <div className="card-header">
                  <h5>Call Details - {selectedCall.leadName}</h5>
                  <button 
                    className="btn-close"
                    onClick={() => setSelectedCall(null)}
                  ></button>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="detail-item">
                        <label>Lead Name:</label>
                        <p>{selectedCall.leadName}</p>
                      </div>
                      <div className="detail-item">
                        <label>Contact:</label>
                        <p>{selectedCall.contact}</p>
                      </div>
                      <div className="detail-item">
                        <label>Date:</label>
                        <p>{selectedCall.date}</p>
                      </div>
                      <div className="detail-item">
                        <label>Duration:</label>
                        <p>{selectedCall.duration}</p>
                      </div>
                      <div className="detail-item">
                        <label>Status:</label>
                        <p>
                          <span className={`badge bg-${getStatusColor(selectedCall.status)}`}>
                            {selectedCall.status}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="detail-item">
                        <label>Recording:</label>
                        <div>
                          <button 
                            className="btn btn-sm btn-outline-success me-2"
                            onClick={() => handlePlayRecording(selectedCall.recording)}
                          >
                            Play Recording
                          </button>
                          <a href="#" className="btn btn-sm btn-outline-info">Download</a>
                        </div>
                      </div>
                      <div className="detail-item">
                        <label>Transcript:</label>
                        <p className="transcript-text">{selectedCall.transcript}</p>
                      </div>
                      <div className="detail-item">
                        <label>Notes:</label>
                        <p>{selectedCall.notes}</p>
                      </div>
                      <div className="detail-item">
                        <label>Outcome:</label>
                        <p>{selectedCall.outcome}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .telecaller-calls-page {
          padding: 20px;
          background-color: #f8f9fa;
          min-height: 100vh;
          color: #212529;
        }
        
        .page-header {
          margin-bottom: 30px;
          padding: 25px;
          background-color: #007bff;
          color: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .header-title {
          color: white;
          margin-bottom: 10px;
          font-weight: 600;
          font-size: 1.75rem;
        }
        
        .header-subtitle {
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          font-size: 1.1rem;
        }
        
        .search-box {
          margin-bottom: 20px;
        }
        
        .search-box input {
          border-radius: 8px;
          padding: 12px 15px;
          border: 1px solid #ced4da;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          font-size: 1rem;
          color: #495057;
        }
        
        .stats-cards {
          display: flex;
          gap: 15px;
          justify-content: flex-end;
        }
        
        .stat-card {
          background: white;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          text-align: center;
          min-width: 100px;
          border: 1px solid #e9ecef;
        }
        
        .stat-card h4 {
          margin: 0;
          color: #007bff;
          font-size: 1.5rem;
          font-weight: 600;
        }
        
        .stat-card p {
          margin: 0;
          color: #495057;
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .calls-list .card {
          border: 1px solid #e9ecef;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          border-radius: 8px;
        }
        
        .table th {
          border-top: none;
          border-bottom: 2px solid #dee2e6;
          font-weight: 600;
          color: #495057;
          background-color: #f8f9fa;
          padding: 12px 15px;
        }
        
        .table td {
          vertical-align: middle;
          border-top: 1px solid #e9ecef;
          padding: 12px 15px;
          color: #212529;
        }
        
        .table tr:hover {
          background-color: #f8f9fa;
          transition: background-color 0.2s ease;
        }
        
        .table tr.selected {
          background-color: #e3f2fd;
        }
        
        .badge {
          padding: 6px 12px;
          border-radius: 12px;
          font-weight: 500;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.5px;
        }
        
        .btn-outline-primary, .btn-outline-success {
          border-radius: 6px;
          padding: 6px 12px;
          font-size: 0.875rem;
          font-weight: 500;
        }
        
        .call-details-card {
          border: 1px solid #e9ecef;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          border-radius: 8px;
        }
        
        .call-details-card .card-header {
          background: #007bff;
          color: white;
          border-radius: 8px 8px 0 0 !important;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
        }
        
        .detail-item {
          margin-bottom: 20px;
        }
        
        .detail-item label {
          font-weight: 600;
          color: #495057;
          display: block;
          margin-bottom: 5px;
          font-size: 0.9rem;
        }
        
        .detail-item p {
          margin: 0;
          color: #212529;
          line-height: 1.6;
          font-size: 0.95rem;
        }
        
        .transcript-text {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 6px;
          border-left: 4px solid #007bff;
          font-style: italic;
          line-height: 1.6;
          color: #212529;
          font-size: 0.95rem;
        }
        
        @media (max-width: 768px) {
          .stats-cards {
            justify-content: flex-start;
          }
          
          .table-responsive {
            font-size: 0.875rem;
          }
          
          .detail-item {
            margin-bottom: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default TelecallerCalls;