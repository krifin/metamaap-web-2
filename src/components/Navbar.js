import React from 'react'
import './Navbar.css'
import Search from '../assets/search.svg'
import SearchPopup from './SearchPopup'
import SelectOptionDialog from './dialog/auth/SelectOptionDialog'
import SignInDialog from './dialog/auth/SignInDialog'
import SignUpDialog from './dialog/auth/SignUpDialog'
import { Link } from 'react-router-dom'

const Navbar = ({ onSearchToggle , show}) => {
  const [showConnect, setShowConnect] = React.useState(false)
  const [showLogin, setShowLogin] = React.useState(false)
  const [showSignUp, setShowSignUp] = React.useState(false)
  return (
    <>
      <div className={`navbar-container${show ? ' drawer' : ''}`}>
        <div className={`navbar-button${show? ' visible' : ''}`} onClick={() => { onSearchToggle(); }}>
          <img src={Search} height={25} width={25} />
        </div>
        <Link to={'/home'} className={`navbar-logo${show ? ' drawer' : ''}`} style={{color: 'white'}}>
        M E T A M A A P
        </Link>
        <div className='navbar-connect-button' onClick={() => setShowConnect(!showConnect)}>Connect</div>
      </div>
      {showConnect && <SelectOptionDialog onClose={() => { setShowConnect(false) }} onEmail={() => { setShowLogin(true) }} onSignUp={() => {setShowSignUp(true)}}/>}
      {showLogin && <SignInDialog onClose={() => {setShowLogin(false)}}/>}
      {showSignUp && <SignUpDialog onClose={() => {setShowSignUp(false)}}/>}
    </>
  )
}

export default Navbar