import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./category.css";

const Home = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:3001/getServices");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  return (
    <div className="home-container">
      <div className="image-container">
        <img src="https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg" alt="Nature" className="image" />
      </div>

<div style={{marginTop:'100px'}}> <center>
<h1>Why you Book Our Services</h1>
      <hr>
      </hr>
      <br>
      </br>
     <p>Services play a crucial role in enhancing our daily lives and driving economic growth. They offer convenience, expertise, and efficiency, enabling individuals and businesses to focus on their core activities. From healthcare and education to financial services and technology support, these offerings improve quality of life, foster innovation, and create employment opportunities. The value of services lies in their ability to meet diverse needs, adapt to changing demands, and provide solutions that drive progress and well-being.</p><br></br>
     </center>
</div>
      <div  className="card-container">
        {services.map((service) => (
          <div style={{width:'800px', marginTop:'120px',marginBottom:'120px'}} className="card" key={service._id}>
            <div className="card-image">
              <img style={{width:'400px'}} src={`./images/event/${service.image}`} alt="Nature" className="image" />
            </div>
            <div className="card-details">
              <h2>{service.name}</h2>
              <p>{service.details}</p>
              
              <Link to={`/details/${service._id}`}>View All</Link>

            </div>
          </div>
        ))}
      </div>
     
    </div>
  );
};

export default Home;
