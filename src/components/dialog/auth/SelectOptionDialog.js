import React, { useState } from 'react'
import './AuthDialog.css'
import Google from '../../../assets/png/google.png'
import Metamask from '../../../assets/png/metamask.png'
import Email from '../../../assets/png/email.png'
import SignInDialog from './SignInDialog'
import {signInWithPopup} from 'firebase/auth'
import {auth, provider} from '../../../firebaseConfig'
import 'firebase/compat/auth';
import { Icon } from 'semantic-ui-react'
import SignUpDialog from './SignUpDialog'



const SelectOptionDialog = ({ setIsAuth, setRes, onClose }) => {
  // let navigate = useNavigate();
  
  const [showLogin, setShowLogin] = React.useState(false)
  const [showSignUp, setShowSignUp] = React.useState(false)
  const metamaskLogin = async () =>{
    console.log('metmask login clicked')
  }
  const googleLogin = () =>{
    signInWithPopup(auth, provider).then((res)=>{
        //res will contain all the info about the user logged in
        console.log(res);
        setRes(res.user);
        localStorage.setItem("result", JSON.stringify(res.user));
        localStorage.setItem("isAuth", true);
        // const app = initializeApp(firebaseConfig);
        // const auth = getAuth(app);
        // const user = firebase.auth().currentUser;
        // console.log("user:" , user);
        setIsAuth(true);
        onClose();
        console.log('logged in!')
        // window.location.pathname = "/home"
    })
}
  return (
    <div className='dialog'>
      <div className="dialog-box">
        <div className='dialog-header'>
          <div className='dialog-title'>M E T A M A A P</div>
          <Icon className='dialog-cross' onClick={()=>{onClose()}} name='remove' size='large'/>
        </div>
        <div className='options'>
          <div className='option' onClick={googleLogin}>
            <img src={Google} />
            <div>Google</div>
          </div>
          <div className='option' onClick={metamaskLogin}>
            <img src={Metamask} />
            <div>Metamask</div>
          </div>
          <div className='option' onClick={() => {
            setShowLogin(true)
          }}>
            <img src={Email} />
            <div>Use Email</div>
          </div>
        </div>
        <div className='or-text'>Or</div>
        <div className='sign-up-button' onClick={() => {setShowSignUp(true)}}>sign up</div>
      </div>
      <div>

      {showLogin && <SignInDialog setIsAuth = {setIsAuth} setRes={setRes} onClose={() => {setShowLogin(false)}}/>}
      {showSignUp && <SignUpDialog onClose={() => {setShowSignUp(false)}}/>}
      </div>
    </div>
  )
}

export default SelectOptionDialog