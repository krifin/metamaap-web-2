import React, { useEffect, useState } from 'react'
import './Navbar.css'
import Search from '../assets/search.svg'
import SearchPopup from './SearchPopup'
import SelectOptionDialog from './dialog/auth/SelectOptionDialog'
import SignInDialog from './dialog/auth/SignInDialog'
import SignUpDialog from './dialog/auth/SignUpDialog'
import { Link, useNavigate } from 'react-router-dom'

/* global isAuth */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, signOut } from 'firebase/auth'
import {auth} from '../firebaseConfig'; 


const Navbar = ({ onSearchToggle , show, isAuth, setIsAuth, res, setRes}) => {
  const firebaseConfig = {
  apiKey: "AIzaSyAj3H57fnV1WfeJcNRMg2NCqLtv8WsLjDQ",
  authDomain: "metamaap-proj.firebaseapp.com",
  projectId: "metamaap-proj",
  storageBucket: "metamaap-proj.appspot.com",
  messagingSenderId: "980463927463",
  appId: "1:980463927463:web:a2e7c07f36022b65571b82",
  measurementId: "G-T2GF7S0RRV"
};
  const [showConnect, setShowConnect] = React.useState(false)
  const [showLogin, setShowLogin] = React.useState(false)
  const [showSignUp, setShowSignUp] = React.useState(false)
  const [showDropdown, setShowDropdown] = useState(false);
  const [nm,setNm] = useState("YOUR PROFILE");
  const [url, setUrl] = useState("https://mindandculture.org/wordpress6/wp-content/uploads/2018/06/Fotolia_188161178_XS.jpg");
  
  
  
  const navigate = useNavigate();
  let user;
  useEffect(()=>{
    if(isAuth){
      
      console.log("res:", res);
      console.log("logged in user info :", res);
      setRes(res);
      console.log("user name:", res.displayName)
      if(res.displayName){
        setNm(res.displayName);
      }else{
        setNm("YOUR PROFILE");
      }
      if(res.photoURL){
        setUrl(res.photoURL);
      }else{
        setUrl("https://mindandculture.org/wordpress6/wp-content/uploads/2018/06/Fotolia_188161178_XS.jpg");
      }
      
      console.log("photo", res.photoURL);
  }},[isAuth])


  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };
  
  const signUserOut = () => {
    signOut(auth).then(()=>{
      localStorage.clear();
      setIsAuth(false);
      
    })
  }
  
  

  return (
    <>
      <div className={`navbar-container${show ? ' drawer' : ''}`}>
        <div className={`navbar-button${show? ' visible' : ''}`} onClick={() => { onSearchToggle(); }}>
          <img src={Search} height={25} width={25} />
        </div>
        <Link to={'/home'} className={`navbar-logo${show ? ' drawer' : ''}`} style={{color: 'white'}}>
        M E T A M A A P
        </Link>
        {!isAuth ? <div className='navbar-connect-button' onClick={() => setShowConnect(!showConnect)}>Connect</div> : 
        (
          
          <div className='navbar-connect-button-outside' style={{ cursor: 'pointer' }} >
            <div className="navbar-connect-button-inside">
            {<img src = {url} style={{height: '50px', width: '50px', borderRadius: '75%'}} alt="your image" />}
              
            <div className="navbar-connect-button" onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
              
              
              {nm}
              
            </div>
            </div>
            {showDropdown && (
              <div className="navbar-dropdown-menu" onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
              <div className="navbar-dropdown-item" onClick={()=>navigate("/dashboard")}>
                Dashboard
              </div>
              <div className="navbar-dropdown-item" onClick={()=>navigate("/about")}>
                About
              </div>
              <div className="navbar-dropdown-item" onClick={()=>navigate("/home")}>
                Add Metaverse
              </div>
              <div className="navbar-dropdown-item" onClick={()=>navigate("/home")}>
                Add NFT
              </div>
              <div className="navbar-dropdown-item" onClick={()=>navigate("/nft-transfers")}>
                NFT Transfer
              </div>
              <div className="navbar-dropdown-item" onClick={()=>navigate("/nft-transfers")}>
                Add 
              </div>
              <div className="navbar-dropdown-item" onClick={()=>navigate("/home")}>
                Event 
              </div>
              <div className="navbar-dropdown-item" onClick={()=>navigate("/home")}>
                Market Place 
              </div>
              <div className="navbar-dropdown-item" onClick={()=>navigate("/carousel")}>
                Carousel
              </div>
              <div className="navbar-dropdown-item" onClick={()=>signUserOut()}>
                Logout
              </div>
            </div>
            )}
            
          </div>
          
        )}
      </div>
      {showConnect && <SelectOptionDialog setIsAuth = {setIsAuth} setRes={setRes} setShowConnect={setShowConnect} showConnect={showConnect}/>}
      {/* {showConnect && <SelectOptionDialog onClose={() => { setShowConnect(false) }} onEmail={() => { setShowLogin(true) }} onSignUp={() => {setShowSignUp(true)}} setIsAuth = {setIsAuth}/>} */}
      {/* {showLogin && <SignInDialog onClose={() => {setShowLogin(false)}}/>} */}
      {/* {showSignUp && <SignUpDialog onClose={() => {setShowSignUp(false)}}/>} */}
    </>
  )
}

export default Navbar