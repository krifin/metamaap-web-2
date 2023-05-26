import React, { useState } from 'react'
import './AuthDialog.css'
import Google from '../../../assets/png/google.png'
import Metamask from '../../../assets/png/metamask.png'
import Email from '../../../assets/png/email.png'

import useFirebase from '../../../adaptors/useFirebase'
import SignInDialog from './SignInDialog'
import { useNavigate } from 'react-router-dom'
import {signInWithPopup} from 'firebase/auth'
import { signOut } from 'firebase/auth'
import {auth, provider} from '../../../firebaseConfig'
import firebase from 'firebase/compat/app';
import {signInWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth'
import 'firebase/compat/auth';



const SelectOptionDialog2 = ({ setIsAuth, setRes, setShowConnect2, showConnect2 }) => {
  // let navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser)=>{
    setUser(currentUser);
    console.log("currentUser:", currentUser);
    setRes(currentUser)
  })
  const emailLogin = async () => {
    console.log('email login clicked');
    try{
        const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(user);
        setIsAuth(true);
    } catch (error){
        console.log(error);
    }
  }
  
  return (
    <div className='dialog'>
      
      <div className="dialog-box2">
        <div className='dialog-header'>
          <div className='dialog-title'>M E T A M A A P</div>
          <div className='dialog-cross' onClick={()=>{setShowConnect2(false)}}><img src="cross.png" alt="cross icon" style={{height: '20px', width: '20px' ,marginTop: '20px', marginLeft: '30px'}} /></div>
        </div>
        
        <div className='options2'>
          <div style={{color:'white', marginBottom: '4px'}}>
            <input placeholder='Email' onChange={(e)=>setLoginEmail(e.target.value)}/>
          </div>
          <div style={{color:'white', marginTop: '4px'}}>
            <input placeholder='Password' onChange={(e)=>setLoginPassword(e.target.value)}/>
          </div>
          
        </div>
        <button onClick={emailLogin} className='sign-up-button' style={{marginTop:'20px'}}>LOGIN</button>
      </div>
      
    </div>
  )
}

export default SelectOptionDialog2