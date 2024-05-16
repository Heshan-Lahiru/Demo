import React, { useState } from 'react';
import './aboutus.css';

function App() {
  return (
    <div className="App">
      <Header />
      <h1>WE ARE <span style={{color:'red'}}>PROFESSIONAL & EXPERT</span><br></br> WORKERS</h1>
      <Slideshow />
      <div className="buttons">
        {/* Buttons for horizontal scrolling */}
      
      
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      
    </header>
  );
}

function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = ['https://png.pngtree.com/template/20220208/ourlarge/pngtree-carnival-fun-fair-festival-social-media-promotion-image_839928.jpg',
   'https://media.istockphoto.com/id/1389465862/photo/shot-of-a-young-businessman-working-on-his-laptop-at-his-desk.jpg?s=612x612&w=0&k=20&c=YZEk5hp1E8cv8y-xXLumH4H5zIVyyf4UdETZvsuH8Vk=', 
   'https://media.istockphoto.com/id/1830126474/photo/portrait-of-a-business-man-sitting-in-an-office.webp?b=1&s=170667a&w=0&k=20&c=76Nn5zkKOesEFIUl4_6FmwYAjtyqXXvUGKko48yBMmk=', 
   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKGLLlNFZwTm_pWmM7VhjznLUFV7d-5LhMEHtArJFQAA&s'];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };
  
  

  return (
    <div className="slideshow">
      <button className="prev" onClick={prevSlide}>‹</button>
      <img src={images[currentSlide]} alt={`Slide ${currentSlide + 1}`} className="slide" />
      
      <button className="next" onClick={nextSlide}>›</button>
    </div>
  );
}

export default App;
