import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import "./home.css";
import axios from 'axios';

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
    Musical: 45,
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

  const [ratings, setRatings] = useState([]);

  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // Fetch user count from the server
    fetch()
      .then(response => response.json())
      .then(data => setUserCount(data.userCount))
      .catch(error => console.error('Error fetching user count:', error));
  }, []);


  useEffect(() => {
    // Fetch ratings data from backend when component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getratings');
        setRatings(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  
  const imagess = [
    'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/concert-band-instagram-post-template-design-2313896398b4a525c99a560923d17f61_screen.jpg?ts=1567524012',
    'https://marketplace.canva.com/EAE2uJqWJv4/1/0/1600w/canva-dimmed-photocentric-music-concert-instagram-post-Jc8iaezfNtM.jpg',
    'https://i.ytimg.com/vi/MC3_gLUESRw/maxresdefault.jpg',
    'https://img.pikbest.com/origin/09/35/91/50TpIkbEsT4eE.jpg!w700wp'
  ];

  const nextSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide === imagess.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide === 0 ? imagess.length - 1 : prevSlide - 1));
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



  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:3001/images');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };
  const getRandomSubset = (arr, size) => {
    const shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, size);
};

let displayRatings = [];
if (ratings.length <= 6) {
    // If the length is less than or equal to 6, display all ratings
    displayRatings = ratings;
} else {
    // If the length is greater than 6, randomly select 6 ratings
    displayRatings = getRandomSubset(ratings, 6);
}


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
              <button style={{ backgroundColor: '#E00947' }} className="register-button1">
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
        <a href='/event'>
          <Card
            title="Musical Shows"
            description="Enjoy with us"
            image="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/online-music-show-ad-design-template-3a03ca44bd25236064b9d678170b15ba_screen.jpg?ts=1614840817"
          /></a>
         <a href='/category'>  <Card
            title="Light Services"
            description="Let's follow"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1yC-B4qZE9tIVZV959z4ZnEbZReXa1WlZb5cnP90bHQ&s"
          /></a>
         <a href='/category'>   <Card
            title="Sounds"
            description="Dj party"
            image="https://img.freepik.com/free-psd/psd-club-dj-party-flyer-social-media-post-template_505751-3273.jpg"
          /></a>
          
        </div>

        <div style={{ marginTop: '150px', marginBottom: '150px' }} className="card-one">
        <a href='/event'>    <Card
            title="Musical Shows"
            description="Enjoy with us"
            image="https://storage.pixteller.com/designs/designs-images/2019-03-06/05/social-media-post-wording-music-1-5c7f3d228d3f5.png"
          /></a>
        <a href='/category'>    <Card
            title="Light Services"
            description="Let's follow"
            image="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/music-concert-instagram-post-design-template-1ffb8e6f948c0b56d8ebe874fdadcdcd_screen.jpg?ts=1690648606"
          /></a>
         <a href='/category'>   <Card
            title="Sounds"
            description="Dj party"
            image="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/music-party-social-media-templates-design-6c39fdf8125ae780da35ec09a0af438e_screen.jpg?ts=1641112731"
          /></a>
         
        </div>


        <center>
          <p style={{marginBottom:'130px'}}>You Can Upload Post for your Event Call to us (0764165833)</p>
          <div className="image-row">
          {images.map((image, index) => (
          <img style={{ maxWidth: '100%',marginRight:'70px' }} key={index} src={`./images/event/${image.filename}`} alt={`Image ${index}`} />
        ))}
                 </div>
        </center>


        <center><p style={{ fontSize: '1.5rem', marginTop: '200px', marginBottom: '200px' }}>It's a monthly event coming to SL, that aims to connect different universes and cultures, in a single space. Here you will find your most loved designers and meet new talented designers of the most varied types, styles and themes.</p></center>
      </div>

      <div className="slideshow">
       
        <img src={imagess[currentSlide]} alt={`Slide ${currentSlide + 1}`} className="slide" />
      
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
            {displayRatings.map((rating, index) => (
                <div key={index} className="rating-card" style={{margin:'20px'}}>
                    <div className="stars">
                        {rating.stars}
                        <span className="star">&#9733;</span>
                    </div>
                    <img src={`./images/event/${rating.image}`} alt="Rating Image" style={{ width: '100px', height: '100px' }} />
                    <p className="comment">{rating.eventName}</p>
                </div>
            ))}
        </div>
      <center>
        <div class="BarsDataset">
        <BarsDataset />
        </div>
        
        </center>
    </div>
  );
};

export default HomePage;
