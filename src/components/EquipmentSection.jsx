import React from 'react';
import '../styles/EquipmentSection.css';

const equipmentData = [
  {
    id: 1,
    title: 'Commercial Espresso Machines',
    description: 'High-performance espresso machines designed for busy cafes and restaurants. Built for durability and precision.',
    features: ['Multi-group configurations', 'Energy efficient', 'Easy maintenance']
  },
  {
    id: 2,
    title: 'Grinders & Brewers',
    description: 'Professional-grade grinders and brewers for consistent extraction and perfect flavor profiles.',
    features: ['Precision grinding', 'High capacity', 'Durable construction']
  },
  {
    id: 3,
    title: 'Water Filtration Systems',
    description: 'Essential water treatment solutions to protect your equipment and enhance coffee quality.',
    features: ['Scale prevention', 'Taste optimization', 'Equipment longevity']
  },
  
];

const EquipmentSection = () => {
  return (
    <section id="equipment" className="equipment-section">
      <div className="container">
        <div className="section-header">
          <h2>Premium Coffee Equipment</h2>
          <p>Industry-leading coffee equipment from top manufacturers, backed by our expert support and maintenance services.</p>
        </div>
        
        <div className="equipment-grid">
          {equipmentData.map((item) => (
            <div key={item.id} className="equipment-card">
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul className="features-list">
                  {item.features.map((feature, index) => (
                    <li key={index}>
                      <span className="feature-icon">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="btn outline">Learn More</button>
              </div>
            </div>
          ))}
        </div>
        
       
      </div>
    </section>
  );
};

export default EquipmentSection;
