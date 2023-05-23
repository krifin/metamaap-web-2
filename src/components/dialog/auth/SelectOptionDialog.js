import React from 'react'
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
import 'firebase/compat/auth';



const SelectOptionDialog = ({ setIsAuth, setRes, setShowConnect }) => {
  // let navigate = useNavigate();
  const googleLogin = () =>{
    signInWithPopup(auth, provider).then((res)=>{
        //res will contain all the info about the user logged in
        console.log(res);
        setRes(res.user);
        localStorage.setItem("result", res.user);
        localStorage.setItem("isAuth", true);
        // const app = initializeApp(firebaseConfig);
        // const auth = getAuth(app);
        // const user = firebase.auth().currentUser;
        // console.log("user:" , user);
        setIsAuth(true);
        setShowConnect(false);
        console.log('logged in!')
        // window.location.pathname = "/home"
    })
  const emailLogin = () => {
    console.log('email login clicked');
  }
}
  return (
    <div className='dialog'>
      
      <div className="dialog-box">
        <div className='dialog-header'>
          <div className='dialog-title'>M E T A M A A P</div>
          <div className='dialog-cross' onClick={()=>{setShowConnect(false)}}><img src="cross.png" alt="cross icon" style={{height: '20px', width: '20px' ,marginTop: '20px', marginLeft: '30px'}} /></div>
        </div>
        
        <div className='options'>
          <div className='option' onClick={googleLogin}>
            <img src={Google} />
            <div>Google</div>
          </div>
          <div className='option'>
            <img src={Metamask} />
            <div>Metamask</div>
          </div>
          <div className='option'>
            <img src={Email} />
            <div>Use Email</div>
          </div>
        </div>
        <div className='or-text'>Or</div>
        <div className='sign-up-button'>sign up</div>
      </div>
    </div>
  )
}

export default SelectOptionDialog