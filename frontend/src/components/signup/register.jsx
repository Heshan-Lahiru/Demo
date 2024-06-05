import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import "./register.css"

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (event) => {
    const allowedChars = /^[A-Za-z\s]+$/;
    if (allowedChars.test(event.target.value)) {
      setName(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:3001/register', { name, email, password })
      .then(result => {
        console.log(result);
        if (result.data === "Already registered") {
          alert("E-mail already registered! Please Login to proceed.");
          window.location.href = "/register";
        } else {
          alert("Registered successfully! Please Login to proceed.");
          window.location.href = "/login";
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputName">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              id="exampleInputName"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">
              <strong>Email Id</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              id="exampleInputEmail1"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-register">Register</button>
        </form>
        <p style={{ marginTop: '20px', marginLeft: '20px' }}>Already have an account? <Link to='/login'>Login</Link></p>
      </div>
      <div className="image-x">
        <img src="https://content.app-sources.com/s/84415124583454871/uploads/CROME-Digital_Website_Images__Files/the_crome_images_web_1-0550972.gif" alt="" className="register-image" />
      </div>
    </div>
  );
};

export default Register;
