import React from 'react'
import './Navbar.css'
import Search from '../assets/search.svg'
import SearchPopup from './SearchPopup'

const Navbar = () => {
  const [show, setShow] = React.useState(false)
  const [showDropdown, setShowDropdown] = React.useState(false)
  return (
    <>
    <div className='navbar-container'>
      <div className={`navbar-button${show ? ' hide' : ''}`} onClick={() => {setShow(!show)}}>
        <img src={Search} height={25} width={25}/>
      </div>
      <div className='navbar-logo'>M E T A M A A P</div>
      <div className='navbar-connect-button' onClick={() => setShowDropdown(!showDropdown)}>Connect</div>
      <div className={`navbar-dropdown${showDropdown ? '' : ' hide'}`}>
        <div className='navbar-dropdown-item'>Login</div>
        <div className='navbar-dropdown-item'>About</div>
        <div className='navbar-dropdown-item'>News</div>
        <div className='navbar-dropdown-item'>Events</div>
      </div>
    </div>
    {/* <SearchPopup show={show} onClose={() => {setShow(false)}}/> */}
    </>
  )
}

export default Navbar