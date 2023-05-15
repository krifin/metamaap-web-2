import React from 'react'
import './AuthDialog.css'
import Arrow from '../../../assets/png/arrow-left.png'
import EyeOff from '../../../assets/png/eye-off.png'

const SignInDialog = ({ onClose }) => {
    const [showPassword, setShowPassword] = React.useState(false)
    return (
        <div className='dialog' onClick={(e) => {
            if (e.target.className === 'dialog') {
                onClose()
            }
        }}>
            <form className="dialog-box">
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginBottom: '64px' }}>
                    <img src={Arrow} width={30} height={30} onClick={() => {
                        onClose()
                    }} />
                    <div className='dialog-title'>M E T A M A A P</div>
                    <img src={Arrow} style={{ opacity: 0 }} />
                </div>
                <div className='dialog-input-box'>
                    <input className='dialog-input' type='email' placeholder='Your Email' pattern="[a-zA-Z0-9._-]*@[a-zA-Z]*\.[a-zA-Z]{2,3}" required/>
                </div>
                <div className='dialog-input-box'>
                    <input className='dialog-input' type={showPassword ? 'text' : 'password'} placeholder='Your Password' minLength={6} required/>
                    <img src={EyeOff} width={30} height={30} style={{ marginRight: '30px' }} onClick={() => {
                        setShowPassword(!showPassword)
                    }} />
                </div>
                <div className='forgot-password'>Forgot Password?</div>
                <button className='dialog-button'>Login</button>
            </form>
        </div>
    )
}

export default SignInDialog