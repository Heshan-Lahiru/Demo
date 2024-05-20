import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                console.log(result);
                if (result.data.message === "Login successful") {
                    console.log("Login Success");
                    alert('Login successful!');
                    // Save user data in cookies
                    Cookies.set('userId', result.data.userId);
                    Cookies.set('userName', result.data.name); // Set user name
                    Cookies.set('userEmail', result.data.email); // Set user email
                    if (email === "admin@gmail.com" && password === "1111111111") {
                        // Redirect to admin page
                        history.push("/adminhome");
                    } else {
                        // Redirect to profile page
                        history.push("/profile");
                    }
                } else {
                    setError('Incorrect email or password. Please try again.');
                    console.error("Error:", error);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <center><h2>Login</h2></center>  
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="btn-login">Login</button>
                </form>
                <p style={{ marginTop: '20px', marginLeft: '20px' }}>Don't have an account? <Link to='/register'>Register</Link></p>
            </div>
            <div className="image-s">
                <img src="https://arkca.com/assets/img/login.gif" alt="" className="login-image" />
            </div>
        </div>
    );
}

export default Login;
