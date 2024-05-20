import React from "react";
import { Link } from "react-router-dom";
import "./category.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="image-container">
        <img
          src="./images/my.gif"
          alt="Nature"
          className="image"
        />
      </div>


      <div className="card-container" style={{marginTop:'100px', marginBottom:'100px'}}>
        <div className="card" style={{width:'1200px'}}>
          <div className="card-image">
            <img
              src="https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif"
              alt="Nature"
              className="image"
            />
          </div>
          <div className="card-details">
            <h2>Sound Services</h2>
            <p>Every Weding Items You can rent or book.</p>
            <p>Author: Team1</p>
            <Link to="/details">View Details</Link>
          </div>
        </div>
       
      </div>


      <div className="card-container">
        <div className="card" style={{width:'1200px'}}>
          <div className="card-image">
            <img
              src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/75581f44224795.581dafaf495f7.gif"
              alt="Nature"
              className="image"
            />
          </div>
          <div className="card-details">
            <h2>Stage Services</h2>
            <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Author: John Doe</p>
            <Link to="/details">View Details</Link>
          </div>
        </div>
       
      </div>


      <div className="card-container">
        <div className="card" style={{width:'1200px'}}>
          <div className="card-image">
            <img
              src="https://i.pinimg.com/originals/0b/53/ac/0b53aceccc92d2a6374157f5c8582365.gif"
              alt="Nature"
              className="image"
            />
          </div>
          <div className="card-details">
            <h2>Light Services</h2>
            <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Author: John Doe</p>
            <Link to="/details">View Details</Link>
          </div>
        </div>
       
      </div>

    </div>
  );
};

export default Home;
