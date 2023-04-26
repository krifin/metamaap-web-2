import React from 'react'
import './Navbar.css'
import Search from '../assets/search.svg'
import SearchPopup from './SearchPopup'

const Navbar = () => {
  const [show, setShow] = React.useState(false)
  return (
    <>
    <div className='navbar-container'>
      <div className='navbar-button' onClick={() => {setShow(!show)}}>
        <img src={Search} />
      </div>
      <div className='navbar-logo'>METAMAAP</div>
      <div className='navbar-button'>Connect</div>
    </div>
    <SearchPopup show={show}/>
    </>
  )
}

export default Navbar