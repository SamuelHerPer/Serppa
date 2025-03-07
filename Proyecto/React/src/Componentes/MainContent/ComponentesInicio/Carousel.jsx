import React, { useState } from 'react';
import './Carousel.css';

const Carousel = ({ children }) => {

  // Se declaran los estados necesarios en ámbito local.
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para ir a la anterior diapositiva.
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? children.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // Función para ir a la siguiente diapositiva.
  const goToNext = () => {
    const isLastSlide = currentIndex === children.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Pinta un carrusel con flechas y en el contenido de cada dia positiva pinta lo que le entra como hijo a la hora de llamarlo.
  return (
    <div className="carousel">
      <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
      {React.Children.map(children, (child, index) => (
          <div className="carousel-item" key={index}>
            {child}
          </div>
        ))}
      </div>
      <button className="carousel-button prev" onClick={goToPrevious}>
        &#10094;
      </button>
      <button className="carousel-button next" onClick={goToNext}>
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
