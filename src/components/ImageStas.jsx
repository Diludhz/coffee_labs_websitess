import React, { useRef, useEffect, useCallback } from 'react';
import '../styles/ImageStas.css';

const ImageStats = () => {
  const marqueeRef = useRef(null);
  const requestRef = useRef();
  const animationRef = useRef({ position: 0, speed: 1 });
  // Original images
  const imageSet = [
    { id: 1, image: '/assets/S-1.jpg' },
    { id: 2, image: '/assets/S-2.jpg' },
    { id: 3, image: '/assets/S-3.jpg' },
    { id: 4, image: '/assets/S-4.jpg' }
  ];

  // Duplicate images for seamless looping (2 sets for smooth continuous scroll)
  const images = [...imageSet, ...imageSet];

  // Animation loop
  const animate = useCallback(() => {
    if (!marqueeRef.current) return;
    
    const { position, speed } = animationRef.current;
    const newPosition = position - speed;
    
    // Reset position when scrolled one full width
    if (newPosition <= -marqueeRef.current.scrollWidth / 2) {
      animationRef.current.position = 0;
    } else {
      animationRef.current.position = newPosition;
    }
    
    marqueeRef.current.style.transform = `translateX(${animationRef.current.position}px)`;
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  // Initialize animation
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    
    // Handle window resize
    const handleResize = () => {
      if (marqueeRef.current) {
        // Adjust speed based on viewport width for better responsiveness
        animationRef.current.speed = window.innerWidth < 768 ? 0.5 : 1;
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    
    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [animate]);

  return (
    <>
      <div className="image-stats-container">
        <div ref={marqueeRef} className="image-stats-marquee">
          {images.map((item, index) => (
            <div key={`${item.id}-${index}`} className="image-stat-item">
              <img 
                src={process.env.PUBLIC_URL + item.image} 
                alt={`Partner ${item.id}`}
                className="stat-image"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageStats;