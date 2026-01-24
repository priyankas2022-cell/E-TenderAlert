import React, { useState, useRef, useEffect } from 'react';

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", 
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Lakshadweep", "Puducherry"
];

const statusOptions = ["Accepted", "Rejected", "Pending", "Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6", "Step 7", "Step 8"];
const categoryOptions = ["Trending", "Hot", "Warm", "Accepted"];
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

const Dashboard = ({ tenders, handleFilterChange, filter, handleAcceptTender, handleRejectTender, isTenderCompleted }) => {
  // Sample tender data to use if no tenders are provided
  const sampleTenders = [
    {
      id: 1,
      title: "Solar Power Plant Installation", 
      department: "Solar Power Plant",
      location: "Maharashtra",
      amount: "₹150 Crores",
      deadline: "2024-06-30",
      category: "Trending",
      status: "Pending",
      source: "https://www.orissatenders.in/quicksearch.aspx?st=qs&SerCat=38&SerText=Solar+Battery&tt=&si=2&tenders=Solar+Battery+tenders",
      sector: "Energy"
    },
    {
      id: 2,
      title: "Smart City Infrastructure Development",
      department: "Infrastructure",
      location: "Karnataka",
      amount: "₹300 Crores",
      deadline: "2024-07-15",
      category: "Hot",
      status: "Pending",
      source: "https://www.orissatenders.in/quicksearch.aspx?st=qs&SerCat=38&SerText=smart+city&tt=&si=2&tenders=smart+city+tenders",
      sector: "Infrastructure"
    },
    {
      id: 3,
      title: "Rural Road Construction",
      department: "Highways",
      location: "Uttar Pradesh",
      amount: "₹80 Crores",
      deadline: "2024-08-20",
      category: "Warm",
      status: "Step 1",
      source: "https://www.orissatenders.in/quicksearch.aspx?st=qs&SerCat=38&SerText=Rural+Water+Supply+Scheme&tt=&si=2&tenders=Rural+Water+Supply+Scheme+tenders",
      sector: "Infrastructure"
    },
    {
      id: 4,
      title: "EV Charging Station Setup",
      department: "EV Charger",
      location: "Gujarat",
      amount: "₹45 Crores",
      deadline: "2024-09-10",
      category: "Hot",
      status: "Pending",
      source: "https://www.orissatenders.in/quicksearch.aspx?st=qs&SerCat=38&SerText=Electric+Vehicle&tt=&si=2&tenders=Electric+Vehicle+tenders",
      sector: "Energy"
    },
    {
      id: 5,
      title: "Water Treatment Plant",
      department: "Water & Waste Management",
      location: "Tamil Nadu",
      amount: "₹120 Crores",
      deadline: "2024-10-05",
      category: "Trending",
      status: "Step 3",
      source: "https://www.orissatenders.in/quicksearch.aspx?st=qs&SerCat=38&SerText=Water&tt=&si=2&tenders=Water+tenders",
      sector: "Water & Waste Management"
    },
    {
      id: 6,
      title: "Telemedicine Equipment Supply",
      department: "Healthcare",
      location: "Delhi",
      amount: "₹65 Crores",
      deadline: "2024-11-12",
      category: "Warm",
      status: "Pending",
      source: "https://www.orissatenders.in/quicksearch.aspx?st=qs&SerCat=38&SerText=telemedicine&tt=&si=2&tenders=telemedicine+tenders",
      sector: "Healthcare"
    },
    {
      id: 7,
      title: "School Building Construction",
      department: "Education",
      location: "Rajasthan",
      amount: "₹90 Crores",
      deadline: "2024-12-25",
      category: "Warm",
      status: "Step 5",
      source: "https://www.orissatenders.in/quicksearch.aspx?st=qs&SerCat=38&SerText=Building&tt=&si=2&tenders=Building+tenders",
      sector: "Education"
    },
    {
      id: 8,
      title: "Agriculture Equipment Procurement",
      department: "Agriculture",
      location: "Punjab",
      amount: "₹75 Crores",
      deadline: "2024-05-30",
      category: "Hot",
      status: "Pending",
      source: "https://www.orissatenders.in/quicksearch.aspx?st=qs&SerCat=38&SerText=Agriculture+Tool&tt=&si=2&tenders=Agriculture+Tool+tenders",
      sector: "Agriculture"
    }
  ];
  
  // Use provided tenders or fallback to sample data
  const allTenders = tenders && tenders.length > 0 ? tenders : sampleTenders;
  const [showFilters, setShowFilters] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTenders, setFilteredTenders] = useState(allTenders);  // Initialize with allTenders
  const filterRef = useRef(null);
  const searchInputRef = useRef(null);

  // Local state for tracking accepted tenders for immediate UI feedback
  const [acceptedTenders, setAcceptedTenders] = useState(new Set());

  // Effect to handle filtering and search
  useEffect(() => {
    let filtered = [...allTenders]; // Use allTenders instead of props tenders
    
    // Apply search filter - enhanced to search across all relevant fields with improved matching
    if (searchTerm) {
      const term = searchTerm.toLowerCase().trim();
      
      // If search term is empty after trimming, don't filter
      if (term.length > 0) {
        filtered = filtered.filter(tender => {
          // Normalize and prepare fields for comparison
          const title = tender.title.toLowerCase();
          const department = tender.department.toLowerCase();
          const location = tender.location.toLowerCase();
          const category = tender.category.toLowerCase();
          const status = tender.status.toLowerCase();
          
          // Split search term into words for more flexible matching
          const searchWords = term.split(/\s+/).filter(word => word.length > 0);
          
          // Check if any search word matches any field
          return searchWords.some(word => 
            title.includes(word) ||
            department.includes(word) ||
            location.includes(word) ||
            category.includes(word) ||
            status.includes(word) ||
            // Also check if the full term matches any field (for phrases)
            title.includes(term) ||
            department.includes(term) ||
            location.includes(term) ||
            category.includes(term) ||
            status.includes(term)
          );
        });
      }
    }
    
    // Apply department filter
    if (selectedDepartment) {
      filtered = filtered.filter(tender => tender.department === selectedDepartment);
    }

    // Apply status filter
    if (selectedStatus) {
      filtered = filtered.filter(tender => getStatusDisplayName(tender.status) === selectedStatus);
    }

    // Apply state filter
    if (selectedState) {
      filtered = filtered.filter(tender => tender.location === selectedState);
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(tender => getCategoryDisplayName(tender.category) === selectedCategory);
    }

    // Apply sector filter
    if (selectedSector) {
      filtered = filtered.filter(tender => tender.sector === selectedSector);
    }
    
    setFilteredTenders(filtered);
    
    // Update parent component with current search term
    if (handleFilterChange) {
      handleFilterChange({
        searchTerm: searchTerm,
        department: selectedDepartment,
        status: selectedStatus,
        location: selectedState,
        priority: selectedCategory,
        sector: selectedSector
      });
    }
  }, [searchTerm, selectedDepartment, selectedStatus, selectedState, selectedCategory, selectedSector, allTenders, handleFilterChange]); // Use allTenders in dependency array

  // Apply filters function
  const handleApplyFilters = () => {
    let filtered = [...allTenders]; // Use allTenders instead of props tenders

    // Apply department filter
    if (selectedDepartment) {
      filtered = filtered.filter(tender => tender.department === selectedDepartment);
    }

    // Apply status filter
    if (selectedStatus) {
      filtered = filtered.filter(tender => getStatusDisplayName(tender.status) === selectedStatus);
    }

    // Apply state filter
    if (selectedState) {
      filtered = filtered.filter(tender => tender.location === selectedState);
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(tender => getCategoryDisplayName(tender.category) === selectedCategory);
    }

    // Apply sector filter
    if (selectedSector) {
      filtered = filtered.filter(tender => tender.sector === selectedSector);
    }

    setFilteredTenders(filtered);
  };

  // Reset filters function
  const handleResetFilters = () => {
    setSelectedState('');
    setSelectedStatus('');
    setSelectedCategory('');
    setSelectedDepartment('');
    setSelectedSector('');
    setSearchTerm('');
    
    // Reset to all tenders
    setFilteredTenders(allTenders);  // Use allTenders instead of props tenders
    
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

  // Helper function to get display name for status
  const getStatusDisplayName = (status) => {
    if (!status) return '';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Helper function to get display name for category
  const getCategoryDisplayName = (category) => {
    if (!category) return '';
    return category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search button click
  const handleSearchClick = (e) => {
    // Prevent any default button behavior that might clear the input
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    // The search is already happening via useEffect when searchTerm changes
    // This ensures search runs when button is clicked
  };

  return (
    <>
      <section id="dashboard" className="dashboard">
        <div className="container">
          <div className="section-title">
            <h2>Tender Dashboard</h2>
            <p>Discover relevant tenders based on your business keywords</p>
          </div>

          {/* Enhanced Search Bar */}
          <div className="search-container animate__animated animate__fadeInUp">
            <div className="row">
              <div className="col-md-12">
                <div className="search-input-container">
                  <input 
                    type="text" 
                    className="form-control search-input" 
                    placeholder="search tenders by keywords, department or location" 
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
                          <option key={index} value={category}>{category}</option>
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
                      <div className="d-grid gap-2">
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
          <div className="row" id="tender-container">
            {filteredTenders.length > 0 ? (
              filteredTenders.map(tender => {
                // Check if this tender has been locally marked as accepted by user action
                const isLocallyAccepted = acceptedTenders.has(tender.id);
                
                return (
                <div key={tender.id} className={`col-lg-6 mb-4 tender-card ${tender.status} animate__animated animate__fadeInUp`}>
                  <div className="tender-header">
                    <div>
                      <div className="tender-title">{tender.title}</div>
                      <div className="tender-department">{tender.department}</div>
                    </div>
                    <span className={`tender-status status-${tender.originalStatus || tender.status}`}>{getStatusDisplayName(tender.originalStatus || tender.status)}</span>
                  </div>
                  <div className="tender-body">
                    <div className="tender-details">
                      <div className="tender-detail">
                        <i className="fas fa-map-marker-alt"></i> {tender.location}
                      </div>
                      <div className="tender-detail">
                        <i className="fas fa-rupee-sign"></i> {tender.amount}
                      </div>
                      <div className="tender-detail">
                        <i className="fas fa-calendar-alt"></i> Deadline: {tender.deadline}
                      </div>
                      <div className="tender-detail">
                        <i className="fas fa-tag"></i> Category: {getCategoryDisplayName(tender.category)}
                      </div>
                      <div className="tender-detail">
                        <i className="fas fa-info-circle"></i> Status: {getStatusDisplayName(tender.status)}
                      </div>
                    </div>
                    <div className="tender-actions">
                      <a href={tender.source} target="_blank" className="btn btn-outline-primary">
                        <i className="fas fa-external-link-alt me-2"></i> Source
                      </a>
                      {isLocallyAccepted && isTenderCompleted(tender) ? (
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
                            // Immediately mark as accepted in local state for instant UI feedback
                            setAcceptedTenders(prev => new Set([...prev, tender.id]));
                            
                            // Call the parent function to update the main state
                            handleAcceptTender(tender.id);
                            
                            // Show success feedback
                            const tenderCard = document.querySelector(`[data-tender-id="${tender.id}"]`);
                            if (tenderCard) {
                              tenderCard.classList.add('accept-animation');
                              setTimeout(() => {
                                tenderCard.classList.remove('accept-animation');
                              }, 1000);
                            }
                          }}
                          data-tender-id={tender.id}
                        >
                          <i className="fas fa-check me-2"></i> Accept
                        </button>
                      )}

                      <button className="btn btn-reject" onClick={() => {
                        if (window.confirm(`Are you sure you want to reject "${tender.title}"?`)) {
                          handleRejectTender(tender.id);
                          
                          // Also remove from local accepted tenders if it was there
                          setAcceptedTenders(prev => {
                            const newSet = new Set(prev);
                            newSet.delete(tender.id);
                            return newSet;
                          });
                        }
                      }}>
                        <i className="fas fa-times me-2"></i> Reject
                      </button>
                    </div>
                  </div>
                </div>
                )})
            ) : (
              <div className="col-12">
                <div className="no-results">
                  <h4>No tenders found matching your criteria</h4>
                  <p>Try adjusting your filters or search terms</p>
                  <button className="btn btn-outline-primary" onClick={handleResetFilters}>
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      

    </>
  );
};

export default Dashboard;