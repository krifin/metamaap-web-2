import React from 'react'
import './AuthDialog.css'
import Google from '../../../assets/png/google.png'
import Metamask from '../../../assets/png/metamask.png'
import Email from '../../../assets/png/email.png'
import SignInDialog from './SignInDialog'

const SelectOptionDialog = ({ onClose, onEmail, onSignUp }) => {
  return (
    <div className='dialog' onClick={(e) => {
      if (e.target.className === 'dialog') {
        onClose()
      }
    }}>
      <div className="dialog-box">
        <div className='dialog-title'>M E T A M A A P</div>
        <div className='options'>
          <div className='option'>
            <img src={Google} />
            <div>Google</div>
          </div>
          <div className='option'>
            <img src={Metamask} />
            <div>Metamask</div>
          </div>
          <div className='option' onClick={() => {
            onEmail()
          }}>
            <img src={Email} />
            <div>Use Email</div>
          </div>
        </div>
        <div className='or-text'>Or</div>
        <div className='sign-up-button' onClick={onSignUp}>sign up</div>
      </div>
    </div>
  )
}

export default SelectOptionDialog