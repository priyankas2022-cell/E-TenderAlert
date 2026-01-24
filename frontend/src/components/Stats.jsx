import React, { useEffect } from 'react';

const Stats = () => {
  // Counter animation effect
  useEffect(() => {
    const animateCounters = () => {
      const counters = document.querySelectorAll('.counter');
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        if (!isNaN(target)) {
          const increment = target / 100;
          let current = 0;

          const updateCounter = () => {
            if (current < target) {
              current += increment;
              counter.innerText = Math.ceil(current);
              setTimeout(updateCounter, 20);
            } else {
              counter.innerText = target;
            }
          };

          updateCounter();
        }
      });
    };

    // Animate counters when component mounts
    animateCounters();
  }, []);

  return (
    <section id="stats" className="stats">
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb-4">
            <div className="stat-card animate__animated animate__fadeInUp">
              <i className="fas fa-file-contract"></i>
              <h3 className="counter" data-target="1247">1,247</h3>
              <p>Active Tenders</p>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="stat-card animate__animated animate__fadeInUp animate__delay-1s">
              <i className="fas fa-check-circle"></i>
              <h3 className="counter" data-target="342">342</h3>
              <p>Tenders Won</p>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="stat-card animate__animated animate__fadeInUp animate__delay-2s">
              <i className="fas fa-chart-line"></i>
              <h3 className="counter" data-target="98">98%</h3>
              <p>Success Rate</p>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="stat-card animate__animated animate__fadeInUp animate__delay-3s">
              <i className="fas fa-clock"></i>
              <h3 className="counter" data-target="24">24</h3>
              <p>Hours Saved/Month</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;