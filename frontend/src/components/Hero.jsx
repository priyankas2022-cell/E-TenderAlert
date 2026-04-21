import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import '../HeroNextGen.css';
import '../HeroNextGen2.css';
import abtImg from '../assets/abt_img.jpg';

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const Hero = () => {
  const [statsCounter, setStatsCounter] = useState({ tenders: 0, departments: 0, value: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setStatsCounter(prev => ({
        tenders: prev.tenders < 12000 ? prev.tenders + 200 : 12000,
        departments: prev.departments < 800 ? prev.departments + 15 : 800,
        value: prev.value < 5 ? prev.value + 0.1 : 5
      }));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage(prev => (prev + 1) % 5); // Cycle through 5 stages
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    // Stage cycler: sync timeline + pipeline
    const points = document.querySelectorAll('.timeline-point');
    const pipeline = document.getElementById('smartPipeline');
    const stages = pipeline ? pipeline.querySelectorAll('[data-stage]') : [];
      
    // Update visualization based on active stage
    points.forEach((p, i) => {
      p.classList.toggle('active', i <= activeStage);
    });
      
    stages.forEach((stage, i) => {
      const node = stage.querySelector('.flow-node');
      const title = stage.querySelector('.stage-title');
      if (node && title) {
        node.classList.toggle('active', i === activeStage);
        title.classList.toggle('stage-active', i === activeStage);
      }
    });
  }, [activeStage]);
    
  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
    
  return (
    <section className="hero-next-gen">
      {/* 1. Hero Section - Intelligence First */}
      <div className="hero-intelligence">
        {/* Animated Data Background */}
        <div className="data-wave-background">
          <div className="wave-line wave-1"></div>
          <div className="wave-line wave-2"></div>
          <div className="wave-line wave-3"></div>
          <div className="tender-node node-1"></div>
          <div className="tender-node node-2"></div>
          <div className="tender-node node-3"></div>
          <div className="tender-node node-4"></div>
          <div className="tender-node node-5"></div>
          <div className="data-flow flow-1"></div>
          <div className="data-flow flow-2"></div>
          <div className="data-flow flow-3"></div>
        </div>

        <div className="container">
          <div className="hero-intelligence-content">
            <div className="hero-badge-enterprise">
              <span className="badge-dot"></span>
              <span>AI-Powered Tender Intelligence</span>
            </div>

            <h1 className="hero-headline-main">
              Never Miss a Tender<br />
              <span className="gradient-text-ai">That Matters.</span>
            </h1>

            <p className="hero-subtext-enterprise">
              AI-driven alerts across <strong>Central, State, PSU & Urban Local Body</strong> tenders—delivered in real time.
            </p>

            <div className="hero-cta-primary">
              <Link to="/register" className="btn-enterprise btn-primary-ai">
                <i className="fas fa-bell"></i>
                <span>Get Tender Alerts</span>
              </Link>
              <button className="btn-enterprise btn-secondary-ai" onClick={() => scrollToSection('dashboard')}>
                <i className="fas fa-chart-line"></i>
                <span>View Live Dashboard</span>
              </button>
            </div>

            {/* Floating Stat Chips */}
            <div className="floating-stat-chips">
              <div className="stat-chip chip-1">
                <div className="stat-chip-icon">
                  <i className="fas fa-file-contract"></i>
                </div>
                <div className="stat-chip-content">
                  <div className="stat-chip-number">{statsCounter.tenders.toLocaleString()}+</div>
                  <div className="stat-chip-label">Active Tenders</div>
                </div>
              </div>
              <div className="stat-chip chip-2">
                <div className="stat-chip-icon">
                  <i className="fas fa-building"></i>
                </div>
                <div className="stat-chip-content">
                  <div className="stat-chip-number">{statsCounter.departments}+</div>
                  <div className="stat-chip-label">Departments</div>
                </div>
              </div>
              <div className="stat-chip chip-3">
                <div className="stat-chip-icon">
                  <i className="fas fa-rupee-sign"></i>
                </div>
                <div className="stat-chip-content">
                  <div className="stat-chip-number">₹{statsCounter.value.toFixed(1)}+ Lakh Cr</div>
                  <div className="stat-chip-label">Opportunities</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Live Tender Intelligence Strip */}
      <div className="live-tender-strip">
        <div className="container-fluid">
          <div className="strip-header">
            <h3><i className="fas fa-pulse"></i> Live Tender Intelligence</h3>
            <span className="live-indicator">LIVE</span>
          </div>
          
          {/* New Keyword Badges Section - above cards */}
          <div className="keyword-badges-container mb-6">
            <div className="keyword-badges-track-left">
              {['solar power plant', 'RESCO', 'Street Lights', 'Highmast', 'Home lighting system', 'Pump solarization', 'module supply', 'EV Charger', 'Bess', 'Drone', 'Cold Storage', 'Bio Fuel', 'Green Ammonia', 'Green Hydrogen', 'Electrolyser', 'Carbon capture', 'Bio fuel', 'Methanol', 'Ethanol', 'CBG', 'Fuel cell', 'TESS'].map((keyword, index) => (
                <div key={index} className="keyword-badge">{keyword}</div>
              ))}
              {/* Duplicate for continuous effect */}
              {['solar power plant', 'RESCO', 'Street Lights', 'Highmast', 'Home lighting system', 'Pump solarization', 'module supply', 'EV Charger', 'Bess', 'Drone', 'Cold Storage', 'Bio Fuel', 'Green Ammonia', 'Green Hydrogen', 'Electrolyser', 'Carbon capture', 'Bio fuel', 'Methanol', 'Ethanol', 'CBG', 'Fuel cell', 'TESS'].map((keyword, index) => (
                <div key={`duplicate-${index}`} className="keyword-badge">{keyword}</div>
              ))}
            </div>
          </div>
          
          <div className="tender-scroll-container">
            <div className="tender-scroll-track">
              <div className="tender-mini-card closing-today">
                <div className="tender-mini-badge">Closing Today</div>
                <h4>Construction of 100 KM Highway</h4>
                <div className="tender-mini-meta">
                  <span><i className="fas fa-building"></i> NHAI</span>
                  <span><i className="fas fa-rupee-sign"></i> ₹450 Cr</span>
                  <span className="urgent"><i className="fas fa-clock"></i> 6 hrs left</span>
                </div>
              </div>
              <div className="tender-mini-card high-value">
                <div className="tender-mini-badge">High Value EPC</div>
                <h4>Solar Power Plant - 500 MW</h4>
                <div className="tender-mini-meta">
                  <span><i className="fas fa-building"></i> MNRE</span>
                  <span><i className="fas fa-rupee-sign"></i> ₹2,500 Cr</span>
                  <span><i className="fas fa-calendar"></i> 15 days</span>
                </div>
              </div>
              <div className="tender-mini-card corrigendum">
                <div className="tender-mini-badge">Corrigendum</div>
                <h4>Metro Rail Extension Phase-II</h4>
                <div className="tender-mini-meta">
                  <span><i className="fas fa-building"></i> DMRC</span>
                  <span><i className="fas fa-rupee-sign"></i> ₹1,200 Cr</span>
                  <span><i className="fas fa-info-circle"></i> Updated 2h ago</span>
                </div>
              </div>
              <div className="tender-mini-card new-tender">
                <div className="tender-mini-badge">New (24h)</div>
                <h4>Smart City Infrastructure</h4>
                <div className="tender-mini-meta">
                  <span><i className="fas fa-building"></i> MoHUA</span>
                  <span><i className="fas fa-rupee-sign"></i> ₹850 Cr</span>
                  <span><i className="fas fa-clock"></i> 30 days</span>
                </div>
              </div>
              {/* Duplicate for infinite scroll effect */}
              <div className="tender-mini-card closing-today">
                <div className="tender-mini-badge">Closing Today</div>
                <h4>Water Supply Pipeline Network</h4>
                <div className="tender-mini-meta">
                  <span><i className="fas fa-building"></i> PWD</span>
                  <span><i className="fas fa-rupee-sign"></i> ₹320 Cr</span>
                  <span className="urgent"><i className="fas fa-clock"></i> 4 hrs left</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Moving Icons Section */}
          <div className="moving-icons-container mt-8">
            <div className="moving-icons-track">
              {[
                { keyword: 'solar power plant', icon: 'sun' },
                { keyword: 'RESCO', icon: 'chart-line' },
                { keyword: 'Street Lights', icon: 'street-view' },
                { keyword: 'Highmast', icon: 'lightbulb' },
                { keyword: 'Home lighting system', icon: 'home' },
                { keyword: 'Pump solarization', icon: 'water' },
                { keyword: 'module supply', icon: 'cubes' },
                { keyword: 'EV Charger', icon: 'charging-station' },
                { keyword: 'Bess', icon: 'battery-full' },
                { keyword: 'Drone', icon: 'drone' },
                { keyword: 'Cold Storage', icon: 'snowflake' },
                { keyword: 'Bio Fuel', icon: 'leaf' },
                { keyword: 'Green Ammonia', icon: 'flask' },
                { keyword: 'Green Hydrogen', icon: 'water' },
                { keyword: 'Electrolyser', icon: 'cogs' },
                { keyword: 'Carbon capture', icon: 'industry' },
                { keyword: 'Bio fuel', icon: 'leaf' },
                { keyword: 'Methanol', icon: 'flask' },
                { keyword: 'Ethanol', icon: 'flask' },
                { keyword: 'CBG', icon: 'seedling' },
                { keyword: 'Fuel cell', icon: 'battery-half' },
                { keyword: 'TESS', icon: 'battery-full' }
              ].map((item, index) => (
                <div key={index} className="moving-icon">
                  <i className={`fas fa-${item.icon}`}></i>
                </div>
              ))}
              {/* Duplicate for continuous effect */}
              {[
                { keyword: 'solar power plant', icon: 'sun' },
                { keyword: 'RESCO', icon: 'chart-line' },
                { keyword: 'Street Lights', icon: 'street-view' },
                { keyword: 'Highmast', icon: 'lightbulb' },
                { keyword: 'Home lighting system', icon: 'home' },
                { keyword: 'Pump solarization', icon: 'water' },
                { keyword: 'module supply', icon: 'cubes' },
                { keyword: 'EV Charger', icon: 'charging-station' },
                { keyword: 'Bess', icon: 'battery-full' },
                { keyword: 'Drone', icon: 'drone' },
                { keyword: 'Cold Storage', icon: 'snowflake' },
                { keyword: 'Bio Fuel', icon: 'leaf' },
                { keyword: 'Green Ammonia', icon: 'flask' },
                { keyword: 'Green Hydrogen', icon: 'water' },
                { keyword: 'Electrolyser', icon: 'cogs' },
                { keyword: 'Carbon capture', icon: 'industry' },
                { keyword: 'Bio fuel', icon: 'leaf' },
                { keyword: 'Methanol', icon: 'flask' },
                { keyword: 'Ethanol', icon: 'flask' },
                { keyword: 'CBG', icon: 'seedling' },
                { keyword: 'Fuel cell', icon: 'battery-half' },
                { keyword: 'TESS', icon: 'battery-full' }
              ].map((item, index) => (
                <div key={`duplicate-${index}`} className="moving-icon">
                  <i className={`fas fa-${item.icon}`}></i>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Smart Data Pipeline */}
      <div className="smart-data-pipeline">
        <div className="container">
          <div className="section-header-ai">
            <h2>AI Engine</h2>
          </div>
          <div className="flex flex-1 gap-10">
            {/* Left Column: Radar Chart & Metrics */}
            <div className="w-2/5 flex flex-col gap-8">
              <div className="glass-panel p-8 flex-1 fade-in-up delay-100 flex flex-col border-2 border-cyan-500 shadow-2xl shadow-cyan-500/30">
                <h3 className="title-font text-3xl text-white mb-8 flex items-center">
                  <i className="fas fa-chart-radar text-cyan-400 mr-4 text-3xl"></i>
                  <span className="text-2xl font-bold">System Performance</span>
                </h3>

                <div className="chart-container flex-1 h-96">
                  <Radar 
                    data={{
                      labels: ['Discovery Speed', 'Accuracy', 'Source Coverage', 'Relevance', 'Reliability'],
                      datasets: [{
                        label: 'Smart Pipeline',
                        data: [95, 88, 98, 92, 97],
                        backgroundColor: 'rgba(0, 255, 255, 0.2)',
                        borderColor: '#00ffff',
                        pointBackgroundColor: '#00ffff',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#00ffff',
                        borderWidth: 2
                      }, {
                        label: 'Manual Process',
                        data: [30, 65, 35, 55, 70],
                        backgroundColor: 'rgba(148, 163, 184, 0.1)',
                        borderColor: '#94a3b8',
                        pointBackgroundColor: '#94a3b8',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#94a3b8',
                        borderWidth: 1,
                        borderDash: [5, 5]
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      elements: { line: { tension: 0.3 } },
                      scales: {
                        r: {
                          angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                          grid: { color: 'rgba(255, 255, 255, 0.1)' },
                          pointLabels: {
                            color: '#e2e8f0',
                            font: { size: 14, family: 'Inter', weight: '600' }
                          },
                          ticks: { display: false, backdropColor: 'transparent' },
                          suggestedMin: 0,
                          suggestedMax: 100
                        }
                      },
                      plugins: {
                        legend: {
                          labels: { color: '#cbd5e1', font: { family: 'Inter', size: 12, weight: '600' } },
                          position: 'bottom'
                        }
                      }
                    }}
                  />
                </div>

                <div className="mt-8 grid grid-cols-2 gap-8">
                  <div className="bg-gray-800 bg-opacity-50 p-8 rounded-xl border border-cyan-500 shadow-lg shadow-cyan-500/30">
                    <div className="text-cyan-400 text-lg uppercase font-bold tracking-wider mb-3">Avg Latency</div>
                    <div className="text-white text-4xl font-bold title-font">1.2s</div>
                  </div>
                  <div className="bg-gray-800 bg-opacity-50 p-8 rounded-xl border border-cyan-500 shadow-lg shadow-cyan-500/30">
                    <div className="text-cyan-400 text-lg uppercase font-bold tracking-wider mb-3">Portal Coverage</div>
                    <div className="text-white text-4xl font-bold title-font">1000+</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Flow Diagram & Timeline */}
            <div className="w-3/5 flex flex-col gap-8">
              <div className="glass-panel p-10 fade-in-up delay-200 flex-1 flex flex-col justify-center border-2 border-cyan-500 shadow-2xl shadow-cyan-500/30">
                <h3 className="title-font text-3xl text-white mb-12 flex items-center">
                  <i className="fas fa-network-wired text-cyan-400 mr-4 text-3xl"></i>
                  <span className="text-2xl font-bold">Smart Data Pipeline (Live)</span>
                </h3>

                {/* Visual Nodes (5-Step Smart Data Pipeline) */}
                <div className="flex items-center justify-between px-6 mb-20" id="smartPipeline">
                  {/* 1: Data Collection */}
                  <div className="flex flex-col items-center relative" data-stage="0">
                    <div className={`flow-node ${activeStage === 0 ? 'active' : ''}`}>
                      <i className="fas fa-spider text-4xl text-cyan-400"></i>
                      <span className="node-badge">1</span>
                      {activeStage === 0 && <div className="pulse-ring"></div>}
                    </div>
                    <p className={`mt-4 text-center text-xl font-bold stage-title ${activeStage === 0 ? 'stage-active' : 'text-white'}`}>Data Collection</p>
                    <p className="mt-2 w-48 text-center text-lg text-white font-medium">Crawling 1000+ Government & PSU portals</p>
                  </div>

                  <div className="flow-line"></div>

                  {/* 2: Data Cleaning */}
                  <div className="flex flex-col items-center relative" data-stage="1">
                    <div className={`flow-node ${activeStage === 1 ? 'active' : ''}`}>
                      <i className="fas fa-broom text-4xl text-blue-400"></i>
                      <span className="node-badge">2</span>
                    </div>
                    <p className={`mt-4 text-center text-xl font-bold stage-title ${activeStage === 1 ? 'stage-active' : 'text-white'}`}>Data Cleaning</p>
                    <p className="mt-2 w-48 text-center text-lg text-white font-medium">Deduplication, validation & normalization</p>
                  </div>

                  <div className="flow-line"></div>

                  {/* 3: AI Classification */}
                  <div className="flex flex-col items-center relative" data-stage="2">
                    <div className={`flow-node ${activeStage === 2 ? 'active' : ''}`}>
                      <i className="fas fa-brain text-4xl text-purple-400"></i>
                      <span className="node-badge">3</span>
                    </div>
                    <p className={`mt-4 text-center text-xl font-bold stage-title ${activeStage === 2 ? 'stage-active' : 'text-white'}`}>AI Classification</p>
                    <p className="mt-2 w-48 text-center text-lg text-white font-medium">Sector, value, location & work type tagging</p>
                  </div>

                  <div className="flow-line"></div>

                  {/* 4: Smart Matching */}
                  <div className="flex flex-col items-center relative" data-stage="3">
                    <div className={`flow-node ${activeStage === 3 ? 'active' : ''}`}>
                      <i className="fas fa-bullseye text-4xl text-yellow-300"></i>
                      <span className="node-badge">4</span>
                    </div>
                    <p className={`mt-4 text-center text-xl font-bold stage-title ${activeStage === 3 ? 'stage-active' : 'text-white'}`}>Smart Matching</p>
                    <p className="mt-2 w-48 text-center text-lg text-white font-medium">Profile-based tender relevance scoring</p>
                  </div>

                  <div className="flow-line"></div>

                  {/* 5: Instant Alerts */}
                  <div className="flex flex-col items-center relative" data-stage="4">
                    <div className={`flow-node ${activeStage === 4 ? 'active' : ''}`}>
                      <i className="fas fa-bell text-4xl text-green-400"></i>
                      <span className="node-badge">5</span>
                    </div>
                    <p className={`mt-4 text-center text-xl font-bold stage-title ${activeStage === 4 ? 'stage-active' : 'text-white'}`}>Instant Alerts</p>
                    <p className="mt-2 w-48 text-center text-lg text-white font-medium">Email, SMS & dashboard notifications</p>
                  </div>
                </div>

                {/* Timeline Animation */}
                <div className="mt-10 px-8">
                  <div className="flex justify-between text-base text-white mb-3 font-mono font-bold">
                    <span>0s</span>
                    <span>0.4s</span>
                    <span>0.9s</span>
                    <span>1.4s</span>
                    <span>2.0s</span>
                  </div>

                  <div className="timeline-track">
                    <div className="timeline-progress"></div>
                    <div className={`timeline-point ${activeStage >= 0 ? 'active' : ''}`} style={{left: '0%'}}></div>
                    <div className={`timeline-point ${activeStage >= 1 ? 'active' : ''}`} style={{left: '25%'}}></div>
                    <div className={`timeline-point ${activeStage >= 2 ? 'active' : ''}`} style={{left: '50%'}}></div>
                    <div className={`timeline-point ${activeStage >= 3 ? 'active' : ''}`} style={{left: '75%'}}></div>
                    <div className={`timeline-point ${activeStage >= 4 ? 'active' : ''}`} style={{left: '100%'}}></div>
                  </div>

                  <div className="flex justify-between mt-4 text-base text-cyan-400 font-bold">
                    <span>Collect</span>
                    <span>Clean</span>
                    <span>Classify</span>
                    <span>Match</span>
                    <span>Alert</span>
                  </div>
                </div>
              </div>

              {/* Info Cards */}
              <div className="flex gap-6 fade-in-up delay-300">
                <button 
                  className="flex-1 glass-panel p-6 flex items-center space-x-6 hover:border-cyan-400 transition-colors border-2 border-cyan-500 shadow-2xl shadow-cyan-500/20 cursor-pointer" 
                  onClick={() => window.open('https://tender.sieplindia.co.in/', '_blank')}
                >
                  <div className="w-16 h-16 rounded-full bg-cyan-900 bg-opacity-50 flex items-center justify-center border border-cyan-700">
                    <i className="fas fa-file-alt text-cyan-400 text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-white">Generate Synopsis</h4>
                    <p className="text-sm text-gray-400 mt-2">Click to generate tender synopsis and view details.</p>
                  </div>
                </button>

                <div className="flex-1 glass-panel p-6 flex items-center space-x-6 hover:border-purple-400 transition-colors border-2 border-purple-500 shadow-2xl shadow-purple-500/20">
                  <div className="w-16 h-16 rounded-full bg-purple-900 bg-opacity-50 flex items-center justify-center border border-purple-700">
                    <i className="fas fa-bolt text-purple-400 text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-white">Instant Alerts</h4>
                    <p className="text-sm text-gray-400 mt-2">Triggers within seconds of publication (Email, SMS & Dashboard).</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* 6. Industry Coverage Grid */}
      <div className="industry-coverage-section">
        <div className="container">
          <div className="section-header-ai">
            <h2>Industry Coverage</h2>
            <p>Comprehensive tender intelligence across critical sectors</p>
          </div>

          <div className="industry-coverage-layout">
            <div className="industry-cards-container">
              <div className="industry-grid">
                <div className="industry-card infrastructure">
                  <div className="industry-icon">
                    <i className="fas fa-road"></i>
                  </div>
                  <h4>Infrastructure & Roads</h4>
                  <p>Highways, bridges, flyovers</p>
                </div>

                <div className="industry-card water">
                  <div className="industry-icon">
                    <i className="fas fa-tint"></i>
                  </div>
                  <h4>Water & Sewerage</h4>
                  <p>Treatment plants, pipelines</p>
                </div>

                <div className="industry-card power">
                  <div className="industry-icon">
                    <i className="fas fa-bolt"></i>
                  </div>
                  <h4>Power & Renewable Energy</h4>
                  <p>Solar, wind, transmission</p>
                </div>

                <div className="industry-card railways">
                  <div className="industry-icon">
                    <i className="fas fa-train"></i>
                  </div>
                  <h4>Railways & Metro</h4>
                  <p>Track laying, stations, signaling</p>
                </div>

                <div className="industry-card smart-cities">
                  <div className="industry-icon">
                    <i className="fas fa-city"></i>
                  </div>
                  <h4>Smart Cities & Housing</h4>
                  <p>Urban development, PMAY</p>
                </div>

                <div className="industry-card oil-gas">
                  <div className="industry-icon">
                    <i className="fas fa-gas-pump"></i>
                  </div>
                  <h4>Oil, Gas & Chemicals</h4>
                  <p>Refineries, pipelines, storage</p>
                </div>
              </div>
            </div>
            
            <div className="industry-image-container">
              <img src={abtImg} alt="Industry Coverage" />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;