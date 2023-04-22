// import React, { useEffect, useState } from "react";
// import "./signup.css";
// import { NavLink } from "react-router-dom";
// import AOS from 'aos';

// const Signup = () => {
//   const [name, setName] = useState("");  
//   const [email, setEmail] = useState("");
//   // const [isError, setIsError] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   // const [passwordConfirm, setPasswordConfirm] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Your form submission logic here
//   };
  
//   useEffect(() => {
//     AOS.init({
//       duration : 2000
//     });
//   }, []);
  

//   return (
//     <div className="signup-form">
//     {/* <div style={{position: 'fixed', top: '2rem', marginLeft: 300, background: "white", padding:"100"}}>
//       {isError}
//     </div> */}
    
//       <div className="signup-form-left">
//         <h2>Sign Up</h2>
//         <form onSubmit={handleSubmit} autoComplete="off">
//           <div className="form-group">
//           <label>Name:</label>
//             <input
//               type="text"
//               placeholder="Enter the admin name"
//               value={name}
//               name="name"
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//           <label> Email:</label> 
//             <input
//               type="text"
//               placeholder="Enter the email"
//               value={email}
//               name="email"
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Phone Number:</label> 
//             <input
//               type="number"
//               placeholder="Enter the phone number"
//               value={name}
//               name="phone"
//               onChange={(e) => setName(e.target.value)}
//               autoComplete="off"
//               required
//             />
//           </div>
          
//           <div className="form-group">
//             <label>Password:</label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               name="password"
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Sign Up</button>
//         </form>
//       </div>
//       <div className="signup-form-right">
//         {/* figure tag actually compresses and resizes the image as necessary */}
//         <figure>
//         <img data-aos={"fade-left"} src="metaverse_img-removebg-preview.png" alt="not available"></img>
//         </figure>
//         Already registered? <NavLink to="/login" className={"signin-link"}>Click here</NavLink> 
//       </div>
//     </div>
//   );
// };

// export default Signup;

import { Link } from "react-router-dom";

const Login = () => {
    const googleAuth = () =>{
        window.open(
            `${process.env.REACT_APP_BACKEND_URL}/auth/google/callback`,
            //self means that opening the prompt in the same page
            "_self"
        )
    }
    return ( 
    <div className="container">
        <h1>Signup form</h1>
        <div className="form_container">
            <div className="left">
                <figure>
                <img className="img" src="metaverse_world-removebg-preview.png" alt="login"></img>
                </figure>
            </div>
            <div className="right">
                <h2 className="form_heading">Members Log in</h2>
                <input type="text" className="input" placeholder="email"></input>
                <input type="passoword" className="input" placeholder="passoword"></input>
                <button className="btn">Login</button>
                <p className="text">or</p>
                <button className="google_btn" onClick={googleAuth}>
                    <figure>
                        <img src="metaverse_img-removebg-preview.png" alt="google icon"></img>
                        <span>Sign in with google</span>
                    </figure>
                </button>
                <p className="text">New here? <Link to ="/signup">Sign up</Link></p>
            </div>
        </div>
    </div> );
}
 
export default Login;