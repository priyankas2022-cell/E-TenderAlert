import React, { useState, useRef, useEffect, useMemo } from 'react';
import apiClient from '../api/client';
import PaginationControls from './PaginationControls';
import { FALLBACK_TENDERS } from '../utils/fallbackData';


const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Lakshadweep", "Puducherry"
];

const statusOptions = ["Active", "Closed", "Cancelled", "Awarded"];
const categoryOptions = ["Trending", "Hot", "Warm", "Pending"];
const departmentOptions = [
  "Solar Power Plant", "RESCO", "Street Lights", "Highmast", "Home Lighting System",
  "Pump Polarization", "Module Supply", "EV Charger", "BESS", "Drone",
  "Carbon Capture", "Cold Storage", "Bio Fuel", "Green Ammonia", "Green Hydrogen",
  "Electrolyser", "Methanol", "Ethanol", "CBG", "TESS", "Fuel Cell"
];

const sectorOptions = [
  "Infrastructure", "Energy", "Telecommunications", "Transportation", "Healthcare",
  "Education", "Agriculture", "Manufacturing", "IT Services", "Banking & Finance",
  "Oil & Gas", "Mining", "Water & Waste Management", "Defense", "Space"
];

const Dashboard = ({ handleFilterChange, filter, handleAcceptTender, handleRejectTender, isTenderCompleted, acceptedTenderIds = [] }) => {

  // State for tenders and API status - Initialize with fallback data
  const [tenderList, setTenderList] = useState(FALLBACK_TENDERS);
  const [loading, setLoading] = useState(false); // Start with false since we have fallback data
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(FALLBACK_TENDERS.length);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // Local state for tracking accepted tenders for immediate UI feedback
  // Initialize from localStorage and parent props
  const [acceptedTenders, setAcceptedTenders] = useState(() => {
    const saved = localStorage.getItem('acceptedTenders');
    const savedSet = saved ? new Set(JSON.parse(saved)) : new Set();
    // Merge with parent-provided accepted IDs
    acceptedTenderIds.forEach(id => savedSet.add(id));
    return savedSet;
  });

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const searchInputRef = useRef(null);
  const dateInputRef = useRef(null);

  // Fetch tenders from API
  useEffect(() => {
    const fetchTendersFromApi = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {
          page: currentPage,
          page_size: ITEMS_PER_PAGE,
          search: searchTerm,
          status: selectedStatus.toUpperCase(),
          temperature: selectedCategory.toUpperCase(),
          department: selectedDepartment,
          location: selectedState,
          sector: selectedSector,
        };

        // Clean up empty params
        Object.keys(params).forEach(key => {
          if (!params[key]) delete params[key];
        });

        console.log('Fetching tenders from API with params:', params);
        const data = await apiClient.getTenders(params);
        console.log('API Response:', data);
        setTenderList(data.results || []);
        setTotalCount(data.count || 0);
        console.log('Tender list updated with', data.results?.length || 0, 'items');
      } catch (err) {
        console.error("Error fetching tenders:", err);
        console.log('Using fallback tenders:', FALLBACK_TENDERS.length, 'items');
        setError("Offline Mode: Backend connection failed. Showing fallback tenders.");
        
        // Filter fallback tenders based on search term (including tender_id)
        let filteredTenders = FALLBACK_TENDERS;
        
        // Filter by search term
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          filteredTenders = filteredTenders.filter(tender => {
            return (
              (tender.title && tender.title.toLowerCase().includes(searchLower)) ||
              (tender.department && tender.department.toLowerCase().includes(searchLower)) ||
              (tender.location && tender.location.toLowerCase().includes(searchLower)) ||
              (tender.tender_id && tender.tender_id.toLowerCase().includes(searchLower)) ||
              (tender.id && tender.id.toLowerCase().includes(searchLower)) ||
              (tender.bid_deadline && tender.bid_deadline.toLowerCase().includes(searchLower))
            );
          });
        }
        
        // Filter by selected date
        if (selectedDate) {
          filteredTenders = filteredTenders.filter(tender => {
            return tender.bid_deadline && tender.bid_deadline.includes(selectedDate);
          });
        }
        
        setTenderList(filteredTenders);
        setTotalCount(filteredTenders.length);
      } finally {
        setLoading(false);
      }
    };

    fetchTendersFromApi();
  }, [currentPage, searchTerm, selectedDepartment, selectedStatus, selectedState, selectedCategory, selectedSector, selectedDate]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDepartment, selectedStatus, selectedCategory, selectedState, selectedSector, selectedDate]);

  // Sync with parent-provided accepted tender IDs
  useEffect(() => {
    if (acceptedTenderIds.length > 0) {
      setAcceptedTenders(prev => {
        const newSet = new Set(prev);
        acceptedTenderIds.forEach(id => newSet.add(id));
        return newSet;
      });
    }
  }, [acceptedTenderIds]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  // Handle date selection
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Trigger calendar click
  const handleCalendarClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  // Apply filters function
  const handleApplyFilters = () => {
    setCurrentPage(1);
  };

  // Reset filters function
  const handleResetFilters = () => {
    setSelectedState('');
    setSelectedStatus('');
    setSelectedCategory('');
    setSelectedDepartment('');
    setSelectedSector('');
    setSearchTerm('');
    setSelectedDate('');
    setCurrentPage(1);

    // Update parent filter
    if (handleFilterChange) {
      handleFilterChange({
        state: '',
        status: '',
        category: '',
        department: '',
        sector: '',
        searchTerm: ''
      });
    }
  };

  // Handle search button click
  const handleSearchClick = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
  };

  // Helper function to get display name for status
  const getStatusDisplayName = (status) => {
    if (!status) return '';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  // Helper function to get display name for category/temperature
  const getCategoryDisplayName = (category) => {
    if (!category) return '';
    if (category === 'HOT') return 'Hot';
    if (category === 'WARM') return 'Warm';
    if (category === 'TRENDING') return 'Trending';
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  };

  return (
    <>
      <section id="dashboard" className="dashboard">
        <div className="container">
          <div className="section-title">
            <h2>Tender Dashboard</h2>
            <p>Discover relevant tenders based on your business keywords</p>
          </div>

          {/* Offline Mode Banner */}
          {error && (
            <div style={{
              backgroundColor: '#fff3cd',
              border: '1px solid #ffc107',
              borderRadius: '8px',
              padding: '12px 20px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fas fa-exclamation-triangle" style={{ color: '#856404', fontSize: '1.2rem' }}></i>
                <span style={{ color: '#856404', fontWeight: '500' }}>
                  {error} - Displaying {tenderList.length} sample tenders
                </span>
              </div>
              <button
                onClick={() => window.location.reload()}
                style={{
                  backgroundColor: '#856404',
                  color: 'white',
                  border: 'none',
                  padding: '6px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}
              >
                <i className="fas fa-sync-alt"></i> Retry
              </button>
            </div>
          )}

          {/* Enhanced Search Bar */}
          <div className="search-container animate__animated animate__fadeInUp">
            <div className="row">
              <div className="col-md-12">
                <div className="search-input-container">
                  <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Search tenders by keywords, department, location, Tender ID or Date"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    ref={searchInputRef}
                  />
                  {searchTerm && (
                    <button
                      className="btn clear-btn"
                      type="button"
                      onClick={() => {
                        setSearchTerm('');
                        // Also reset filtered tenders to show all when clearing search
                        let filtered = [...allTenders];

                        // Apply other filters if they exist
                        if (selectedDepartment) {
                          filtered = filtered.filter(tender => tender.department === selectedDepartment);
                        }
                        if (selectedStatus) {
                          filtered = filtered.filter(tender => getStatusDisplayName(tender.status) === selectedStatus);
                        }
                        if (selectedState) {
                          filtered = filtered.filter(tender => tender.location === selectedState);
                        }
                        if (selectedCategory) {
                          filtered = filtered.filter(tender => getCategoryDisplayName(tender.category) === selectedCategory);
                        }
                        if (selectedSector) {
                          filtered = filtered.filter(tender => tender.sector === selectedSector);
                        }

                        setFilteredTenders(filtered);
                      }}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                  <button className="btn search-btn" type="button" onClick={handleSearchClick} onMouseDown={(e) => e.preventDefault()}><i className="fas fa-search"></i> Search</button>
                </div>

                {/* Filter Controls - Visible Inline Beside Search */}
                <div className="filter-controls mt-3">
                  <div className="row g-2">
                    <div className="col-md-2">
                      <label><i className="fas fa-building"></i> Department</label>
                      <select
                        className="form-control filter-select"
                        value={selectedDepartment}
                        onChange={(e) => {
                          setSelectedDepartment(e.target.value);
                          // Auto-apply filter when selection changes
                          handleApplyFilters();
                        }}
                        aria-label="Filter by department"
                      >
                        <option value="">All</option>
                        {departmentOptions.map((dept, index) => (
                          <option key={index} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-2">
                      <label><i className="fas fa-flag"></i> Status</label>
                      <select
                        className="form-control filter-select"
                        value={selectedStatus}
                        onChange={(e) => {
                          setSelectedStatus(e.target.value);
                          // Auto-apply filter when selection changes
                          handleApplyFilters();
                        }}
                        aria-label="Filter by status"
                      >
                        <option value="">All</option>
                        {statusOptions.map((status, index) => (
                          <option key={index} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-2">
                      <label><i className="fas fa-map-marker-alt"></i> Location</label>
                      <select
                        className="form-control filter-select"
                        value={selectedState}
                        onChange={(e) => {
                          setSelectedState(e.target.value);
                          // Auto-apply filter when selection changes
                          handleApplyFilters();
                        }}
                        aria-label="Filter by location"
                      >
                        <option value="">All</option>
                        {indianStates.map((state, index) => (
                          <option key={index} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-2">
                      <label><i className="fas fa-star"></i> Priority</label>
                      <select
                        className="form-control filter-select"
                        value={selectedCategory}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          // Auto-apply filter when selection changes
                          handleApplyFilters();
                        }}
                        aria-label="Filter by priority"
                      >
                        <option value="">All</option>
                        {categoryOptions.map((category, index) => (
                          <option key={index} value={category.toUpperCase()}>{category}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-2">
                      <label><i className="fas fa-industry"></i> Sector</label>
                      <select
                        className="form-control filter-select"
                        value={selectedSector}
                        onChange={(e) => {
                          setSelectedSector(e.target.value);
                          // Auto-apply filter when selection changes
                          handleApplyFilters();
                        }}
                        aria-label="Filter by sector"
                      >
                        <option value="">All</option>
                        {sectorOptions.map((sector, index) => (
                          <option key={index} value={sector}>{sector}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-2">
                      <label>&nbsp;</label> {/* Spacer for alignment */}
                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-outline-primary" 
                          onClick={handleCalendarClick}
                          title="Filter by date"
                          style={{
                            borderColor: selectedDate ? '#007bff' : '#6c757d',
                            color: selectedDate ? '#007bff' : '#6c757d',
                            position: 'relative'
                          }}
                        >
                          <i className="fas fa-calendar-alt"></i>
                        </button>
                        <input
                          type="date"
                          ref={dateInputRef}
                          value={selectedDate}
                          onChange={handleDateChange}
                          style={{
                            position: 'absolute',
                            opacity: 0,
                            width: '1px',
                            height: '1px',
                            pointerEvents: 'none'
                          }}
                        />
                        {selectedDate && (
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => setSelectedDate('')}
                            title="Clear date filter"
                            style={{ padding: '0.375rem 0.75rem' }}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        )}
                        <button className="btn btn-outline-secondary" onClick={handleResetFilters}>
                          <i className="fas fa-redo"></i> Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tender Cards */}
          <div className="row" id="tender-container" style={{ minHeight: '400px', position: 'relative' }}>
            {loading ? (
              // Loading Skeletons
              Array.from({ length: 6 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="col-lg-6 mb-4">
                  <div className="tender-card" style={{ height: '350px', background: '#f8f9fa' }}>
                    <div className="p-4">
                      <div className="skeleton-line" style={{ width: '70%', height: '24px', background: '#e9ecef', marginBottom: '15px' }}></div>
                      <div className="skeleton-line" style={{ width: '40%', height: '16px', background: '#e9ecef', marginBottom: '25px' }}></div>
                      <div className="skeleton-line" style={{ width: '90%', height: '14px', background: '#e9ecef', marginBottom: '10px' }}></div>
                      <div className="skeleton-line" style={{ width: '90%', height: '14px', background: '#e9ecef', marginBottom: '10px' }}></div>
                      <div className="skeleton-line" style={{ width: '90%', height: '14px', background: '#e9ecef', marginBottom: '10px' }}></div>
                      <div className="mt-4 flex gap-2">
                        <div className="skeleton-btn" style={{ width: '100px', height: '40px', background: '#e9ecef' }}></div>
                        <div className="skeleton-btn" style={{ width: '100px', height: '40px', background: '#e9ecef' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : tenderList.length > 0 ? (
              tenderList.map(tender => {
                const isLocallyAccepted = acceptedTenders.has(tender.id);
                const displayStatus = (tender.status || 'PENDING').toUpperCase();
                const displayTemperature = (tender.temperature || 'PENDING').toUpperCase();

                return (
                  <div key={tender.id} data-tender-id={tender.id} className={`col-lg-6 mb-4 tender-card ${displayStatus.toLowerCase()} animate__animated animate__fadeInUp`} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="tender-header">
                      <div style={{ flex: 1 }}>
                        <div className="tender-title" title={tender.title}>{tender.title}</div>
                        <div className="tender-department">{tender.department || 'N/A'}</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
                        <span className={`tender-status status-${displayStatus.toLowerCase()}`}>{getStatusDisplayName(displayStatus)}</span>
                        <span className={`badge temperature-${displayTemperature.toLowerCase()}`} style={{
                          fontSize: '10px',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          backgroundColor: displayTemperature === 'HOT' ? '#ff4d4d' : displayTemperature === 'WARM' ? '#ffa500' : '#3498db',
                          color: 'white'
                        }}>
                          {displayTemperature}
                        </span>
                      </div>
                    </div>
                    <div className="tender-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div className="tender-details" style={{ flex: 1 }}>
                        <div className="tender-detail">
                          <i className="fas fa-hashtag"></i> Tender ID: {tender.tender_id || 'N/A'}
                        </div>
                        <div className="tender-detail">
                          <i className="fas fa-map-marker-alt"></i> {tender.location || 'N/A'}
                        </div>
                        <div className="tender-detail">
                          <i className="fas fa-rupee-sign"></i> {tender.estimated_value ? `₹${Number(tender.estimated_value).toLocaleString('en-IN')}` : 'Contact for value'}
                        </div>
                        <div className="tender-detail">
                          <i className="fas fa-calendar-alt"></i> Deadline: {tender.bid_deadline ? new Date(tender.bid_deadline).toLocaleDateString() : 'N/A'}
                        </div>
                        <div className="tender-detail">
                          <i className="fas fa-tag"></i> Category: {tender.category || 'General'}
                        </div>
                      </div>
                      <div className="tender-actions" style={{ marginTop: 'auto' }}>
                        <a href={tender.source_url || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
                          <i className="fas fa-external-link-alt me-2"></i> Source
                        </a>
                        {isLocallyAccepted && isTenderCompleted && isTenderCompleted(tender) ? (
                          <button className="btn btn-accept bid-completed" disabled>
                            <i className="fas fa-check-circle me-2"></i> Bid Applied Successfully
                          </button>
                        ) : isLocallyAccepted ? (
                          <button className="btn btn-accept accepted-state" disabled>
                            <i className="fas fa-check me-2"></i> Accepted
                          </button>
                        ) : (
                          <button
                            className="btn btn-accept"
                            onClick={() => {
                              setAcceptedTenders(prev => new Set([...prev, tender.id]));
                              if (handleAcceptTender) handleAcceptTender(tender.id);

                              // Show success feedback
                              const tenderCard = document.querySelector(`[data-tender-id="${tender.id}"]`);
                              if (tenderCard) {
                                tenderCard.classList.add('accept-animation');
                                setTimeout(() => {
                                  tenderCard.classList.remove('accept-animation');
                                }, 1000);
                              }
                            }}
                          >
                            <i className="fas fa-check me-2"></i> Accept
                          </button>
                        )}
                        <button className="btn btn-reject" onClick={() => {
                          if (window.confirm(`Are you sure you want to reject this tender?`)) {
                            if (handleRejectTender) handleRejectTender(tender.id);
                          }
                        }}>
                          <i className="fas fa-times me-2"></i> Reject
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="col-12">
                <div className="no-results text-center py-5">
                  <i className="fas fa-search-minus fa-3x mb-3 text-muted"></i>
                  <h4>No tenders found matching your criteria</h4>
                  <p>Try adjusting your filters or search terms</p>
                  <button className="btn btn-outline-primary" onClick={handleResetFilters}>
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </div>
      </section>


    </>
  );
};

export default Dashboard;