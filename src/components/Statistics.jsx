import React from 'react';
import '../styles/Statistics.css';

const Statistics = () => {
  const stats = [
    { number: '1200+', label: 'Business Partners' },
    { number: '8000+', label: 'Products Available' },
    { number: '25+', label: 'Years Experience' },
    { number: '150+', label: 'Brands Distributed' }
  ];

  return (
    <section className="statistics-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
