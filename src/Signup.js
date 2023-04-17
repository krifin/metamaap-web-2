import React, { useEffect, useState } from "react";
import "./signup.css";
import { NavLink } from "react-router-dom";
import AOS from 'aos';

const Signup = () => {
  const [name, setName] = useState("");  
  const [email, setEmail] = useState("");
  // const [isError, setIsError] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  // const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Your form submission logic here
  };
  
  useEffect(() => {
    AOS.init({
      duration : 2000
    });
  }, []);
  

  return (
    <div className="signup-form">
    {/* <div style={{position: 'fixed', top: '2rem', marginLeft: 300, background: "white", padding:"100"}}>
      {isError}
    </div> */}
    
      <div className="signup-form-left">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
          <label>Name:</label>
            <input
              type="text"
              placeholder="Enter the admin name"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
          <label> Email:</label> 
            <input
              type="text"
              placeholder="Enter the email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number:</label> 
            <input
              type="number"
              placeholder="Enter the phone number"
              value={name}
              name="phone"
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="signup-form-right">
        {/* figure tag actually compresses and resizes the image as necessary */}
        <figure>
        <img data-aos={"fade-left"} src="metaverse_img-removebg-preview.png" alt="not available"></img>
        </figure>
        Already registered? <NavLink to="/login" className={"signin-link"}>Click here</NavLink> 
      </div>
    </div>
  );
};

export default Signup;
