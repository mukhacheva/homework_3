import React, { useState, useEffect } from 'react';

import img1 from '../img/img_1.jpg';
import img2 from '../img/img_2.jpg';
import img3 from '../img/img_3.jpg';

import '../styles/content_slider.css'; 

const contentImages = [img1, img2, img3];

function ContentSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % contentImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + contentImages.length) % contentImages.length);
  };

return (
    <section className="content-slider">
      <div className="slider-container">
        {contentImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`content-${index}`}
            className={`slider-image ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>
  
    </section>
  );
};
export default ContentSlider;