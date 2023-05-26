import React from 'react'
import './AuthDialog.css'
import Arrow from '../../../assets/png/arrow-left.png'
import EyeOff from '../../../assets/png/eye-off.png'
import useFirebase from '../../../adaptors/useFirebase'

const SignUpDialog = ({ onClose, setRegisterEmail, setRegisterPassword }) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
    const { signup } = useFirebase()
    const [state, setState] = React.useState({
        name: '',
        email: '',
    })


    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        signup(state.email, state.password, state.name)
    }

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
                    <input className='dialog-input' name="name" onChange={handleChange} type='text' placeholder='Your Name' required />
                </div>
                <div className='dialog-input-box'>
                    <input className='dialog-input' type='email' onChange={handleChange} name="email" placeholder='Your Email' required pattern="[a-zA-Z0-9._-]*@[a-zA-Z]*\.[a-zA-Z]{2,3}" />
                </div>
                <div className='dialog-input-box'>
                    <input className='dialog-input' type={showPassword ? 'text' : 'password'} onChange={(e) => {
                        setState({
                            ...state,
                            password: e.target.value
                        })
                    }} placeholder='Your Password' minLength={6} required />
                    <img src={EyeOff} width={30} height={30} style={{ marginRight: '30px' }} onClick={() => { setShowPassword(!showPassword) }} />
                </div>
                <div className='dialog-input-box'>
                    <input className='dialog-input' type={showConfirmPassword ? 'text' : 'password'} placeholder='Your Confirm Password' minLength={6} required onChange={(e) => {
                        setState({
                            ...state,
                            confirmPassword: e.target.value
                        })
                    }} />
                    <img src={EyeOff} width={30} height={30} alt="eyeoff" style={{ marginRight: '30px' }} onClick={() => {
                        setShowConfirmPassword(!showConfirmPassword)
                    }} />
                </div>
                <div className='dialog-button' onClick={() => {
                    handleSubmit()
                }}>Sign Up</div>
            </form>
        </div>
    )
}

export default SignUpDialog