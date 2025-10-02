import React, { useEffect } from 'react';
import '../styles/ImageStats.css';

const ImageStats = () => {
  // Duplicate images for seamless looping
  const images = [
    { id: 1, image: '/assets/S-1.jpg' },
    { id: 2, image: '/assets/S-2.jpg' },
    { id: 3, image: '/assets/S-3.jpg' },
    { id: 4, image: '/assets/S-4.jpg' },
    { id: 5, image: '/assets/S-1.jpg' },
    { id: 6, image: '/assets/S-2.jpg' },
    { id: 7, image: '/assets/S-3.jpg' },
    { id: 8, image: '/assets/S-4.jpg' }
  ];

  // Set up the marquee effect
  useEffect(() => {
    const marquee = document.querySelector('.image-stats-marquee');
    if (!marquee) return;

    let position = 0;
    const speed = 0.5; // Adjust speed here (lower = slower)
    
    function animate() {
      position -= speed;
      if (position <= -marquee.scrollWidth / 2) {
        position = 0;
      }
      marquee.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animate);
    }
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="image-stats-section">
      <div className="image-stats-container">
        <div className="image-stats-marquee">
          {images.map((item) => (
            <div key={item.id} className="image-stat-item">
              <img 
                src={process.env.PUBLIC_URL + item.image} 
                alt=""
                className="stat-image"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageStats;