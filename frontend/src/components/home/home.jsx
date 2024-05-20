import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import "./home.css";
import Card from './card';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const chartSetting = {
  yAxis: [
    {
      label: 'event (mm)',
    },
  ],
  width: 800,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

const dataset = [
  {
    Musical: 59,
    Carnival: 47,
    Djparty: 86,
    festival: 21,
    month: 'May',
  },
  // Additional dataset entries...
];

const valueFormatter = (value) => `${value}mm`;

const BarsDataset = () => (
  <BarChart
    dataset={dataset}
    xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
    series={[
      { dataKey: 'Musical', label: 'Musical', valueFormatter },
      { dataKey: 'Carnival', label: 'Carnival', valueFormatter },
      { dataKey: 'Djparty', label: 'Djparty', valueFormatter },
      { dataKey: 'festival', label: 'festival', valueFormatter },
    ]}
    {...chartSetting}
  />
);

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const images = [
    'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/concert-band-instagram-post-template-design-2313896398b4a525c99a560923d17f61_screen.jpg?ts=1567524012',
    'https://marketplace.canva.com/EAE2uJqWJv4/1/0/1600w/canva-dimmed-photocentric-music-concert-instagram-post-Jc8iaezfNtM.jpg',
    'https://i.ytimg.com/vi/MC3_gLUESRw/maxresdefault.jpg',
    'https://img.pikbest.com/origin/09/35/91/50TpIkbEsT4eE.jpg!w700wp'
  ];

  const nextSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };

  // Automatically move to the next slide every second
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const userId = Cookies.get('userId');
    setIsUserLoggedIn(!!userId);
  }, []);

  const [ratings, setRatings] = useState([
    { stars: 5, comment: "Excellent service!", image: "https://plus.unsplash.com/premium_photo-1675080431524-3e7c85323972?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFuJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D" },
    { stars: 4, comment: "Great experience!", image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { stars: 5, comment: "Fantastic product!", image: "https://i0.wp.com/colinsbeautypages.co.uk/wp-content/uploads/2008/06/handsome-face.jpg" },
    { stars: 3, comment: "Good but could improve.", image: "https://www.shutterstock.com/image-photo/close-horizontal-front-portrait-attractive-260nw-1505922530.jpg" },
    { stars: 5, comment: "Absolutely amazing!", image: "https://t3.ftcdn.net/jpg/05/61/43/26/360_F_561432620_ghqin7jE48RP4B6JrOpCpio536LOeTVC.jpg" }
  ]);

  return (
    <div>
      <div className="video-a">
        <video src="https://videos.pexels.com/video-files/5091624/5091624-hd_1920_1080_24fps.mp4" autoPlay muted loop />
        <h1 style={{ fontFamily: 'cursive', fontSize: '4rem' }} className="centered-text">
          Movement. Music. Love.
          <center>
            <div className="social-logos">
              <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/facebook-app-round-white-icon.png" alt="" />
              <img src="https://awareak.org/wp-content/uploads/2023/07/CITYPNG.COMHD-White-Instagram-Round-Logo-Icon-PNG-1600x1200-1.png" alt="" />
              <img src="https://static-00.iconduck.com/assets.00/imo-icon-2048x1975-oerg260r.png" alt="" />
              <img src="https://ragsdalemartin.com/wp-content/uploads/2020/07/white-google-logo.png" alt="" />
            </div>
            {!isUserLoggedIn && (
              <button style={{ backgroundColor: '#E00947' }} className="register-button">
                <Link to="/register" style={{ textDecoration: 'none', color: 'white' }}>
                  Register
                </Link>
              </button>
            )}
          </center>
        </h1>
      </div>
      <div className="content-box">
        <div style={{ marginTop: '180px', marginBottom: '180px' }} className="content">
          <div className="left-content">
            <center><h1>OUR SPIRIT</h1></center>
            <center><p>We are a global community driven festival celebrating movement, music, and soul healing.</p></center>
          </div>
          <div style={{ marginLeft: '90px' }} className="right-content">
            <center><p>Booking tickets online for events, shows, and services offers a myriad of advantages.
              Firstly, the convenience it provides is unmatched. With just a few
              clicks or taps, individuals can secure their tickets from anywhere,
              anytime, eliminating the need to stand in long queues or visit
              physicaly</p></center>
          </div>
        </div>
        <hr style={{ marginBottom: '100px' }} />

        <div style={{ marginTop: '150px', marginBottom: '150px' }} className="card-one">
          <Card
            title="Musical Shows"
            description="Enjoy with us"
            image="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/online-music-show-ad-design-template-3a03ca44bd25236064b9d678170b15ba_screen.jpg?ts=1614840817"
          />
          <Card
            title="Light Services"
            description="Let's follow"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1yC-B4qZE9tIVZV959z4ZnEbZReXa1WlZb5cnP90bHQ&s"
          />
          <Card
            title="Sounds"
            description="Dj party"
            image="https://img.freepik.com/free-psd/psd-club-dj-party-flyer-social-media-post-template_505751-3273.jpg"
          />
          <Card
            title="Carnival"
            description="Family Pack"
            image="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/carnival-party-instagram-post-advertisement-design-template-41ad300f78a901319ffd6ce335342e03_screen.jpg?ts=1582404551"
          />
        </div>

        <div style={{ marginTop: '150px', marginBottom: '150px' }} className="card-one">
          <Card
            title="Musical Shows"
            description="Enjoy with us"
            image="https://storage.pixteller.com/designs/designs-images/2019-03-06/05/social-media-post-wording-music-1-5c7f3d228d3f5.png"
          />
          <Card
            title="Light Services"
            description="Let's follow"
            image="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/music-concert-instagram-post-design-template-1ffb8e6f948c0b56d8ebe874fdadcdcd_screen.jpg?ts=1690648606"
          />
          <Card
            title="Sounds"
            description="Dj party"
            image="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/music-party-social-media-templates-design-6c39fdf8125ae780da35ec09a0af438e_screen.jpg?ts=1641112731"
          />
          <Card
            title="Carnival"
            description="Family Pack"
            image="https://img.freepik.com/premium-psd/urban-live-concert-flyer-music-social-media-post-template_160623-329.jpg"
          />
        </div>

        <center>
          <div className="image-row">
            <img style={{ marginRight: '140px', maxWidth: '100%' }} src="../images/my.gif" alt="" />
            <img style={{ marginRight: '140px', maxWidth: '100%' }} src="../images/Event now.gif" alt="" />
            <img style={{ maxWidth: '100%' }} src="../images/Event now (1).gif" alt="" />
          </div>
        </center>
        <center><p style={{ fontSize: '1.5rem', marginTop: '200px', marginBottom: '200px' }}>It's a monthly event coming to SL, that aims to connect different universes and cultures, in a single space. Here you will find your most loved designers and meet new talented designers of the most varied types, styles and themes.</p></center>
      </div>

      <div className="slideshow">
        <button className="prev" onClick={prevSlide}>‹</button>
        <img src={images[currentSlide]} alt={`Slide ${currentSlide + 1}`} className="slide" />
        <button className="next" onClick={nextSlide}>›</button>
      </div>

      <div style={{ marginTop: '200px', marginBottom: '200px' }} className="content-box">
        <div className="content">
          <div className="left-content">
            <p>Event management encompasses a comprehensive
              process of planning, organizing, and executing
              various types of events, ranging from corporate
              conferences to social gatherings. At its core,
              effective event management involves understanding
              the objectives and requirements of the event, creating
              a detailed plan encompassing logistics, budgeting,
              marketing, and staffing, and coordinating all aspects
              to ensure a successful outcome.</p>
          </div>
          <div className="right-content">
            <p>Managing services involves the effective organization and
              delivery of various services to meet the needs and
              expectations of clients or customers. Whether in the
              hospitality industry, healthcare sector, or technology
              field, managing services entails understanding client
              requirements, designing service offerings to address
              those needs, and implementing strategies to deliver
              high-quality services consistently.</p>
          </div>
        </div>
        <div className="decoration-line"></div>
      </div>

      <div style={{ marginBottom: '200px' }} className="customer-ratings">
        {ratings.map((rating, index) => (
          <div key={index} className="rating-card">
            <div className="stars">
              {[...Array(rating.stars)].map((_, i) => (
                <span key={i} className="star">&#9733;</span>
              ))}
            </div>
            <img src={rating.image} alt={`Customer ${index + 1}`} className="customer-image" />
            <p className="comment">{rating.comment}</p>
          </div>
        ))}
      </div>
      <center><BarsDataset /></center>
    </div>
  );
};

export default HomePage;
