import React, { useState } from 'react'
import './AuthDialog.css'
import Arrow from '../../../assets/png/arrow-left.png'
import EyeOff from '../../../assets/png/eye-off.png'
import useFirebase from '../../../adaptors/useFirebase'

const SignInDialog = ({ onClose }) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const { login } = useFirebase();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const emailLogin = async () => {
        console.log('email login clicked');
        try {
            login(loginEmail, loginPassword);
            onClose();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='dialog'>
            <form className="dialog-box">
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginBottom: '64px' }}>
                    <img src={Arrow} width={30} height={30} onClick={() => {
                        onClose()
                    }} />
                    <div className='dialog-title'>M E T A M A A P</div>
                    <img src={Arrow} style={{ opacity: 0 }} />
                </div>
                <div className='dialog-input-box'>
                    <input className='dialog-input' type='email' placeholder='Your Email' pattern="[a-zA-Z0-9._-]*@[a-zA-Z]*\.[a-zA-Z]{2,3}" onChange={(e) => setLoginEmail(e.target.value)} required />
                </div>
                <div className='dialog-input-box'>
                    <input className='dialog-input' type={showPassword ? 'text' : 'password'} placeholder='Your Password' minLength={6} onChange={(e) => setLoginPassword(e.target.value)} required />
                    <img src={EyeOff} width={30} height={30} style={{ marginRight: '30px' }} onClick={() => {
                        setShowPassword(!showPassword)
                    }} />
                </div>
                {/* <div className='forgot-password'>Forgot Password?</div> */}
                <div className='dialog-button' onClick={emailLogin}>Login</div>
            </form>
        </div>
    )
}

export default SignInDialog