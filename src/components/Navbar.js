import React, { useEffect, useState } from 'react'
import './Navbar.css'
import Search from '../assets/search.svg'
import SelectOptionDialog from './dialog/auth/SelectOptionDialog'
import { Link, useNavigate } from 'react-router-dom'
import Grid from '../assets/png/grid.png'
import 'firebase/compat/auth';
import useFirebase from '../adaptors/useFirebase'
import { Icon } from 'semantic-ui-react'


const Navbar = ({ onSearchToggle, show }) => {

  const [showConnect, setShowConnect] = React.useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { streamUser, logout } = useFirebase();
  const [isAuth, setIsAuth] = useState(false);
  const [register, setRegister] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    streamUser((user) => {
      console.log(user)
      if (user) {
        setIsAuth(true);
        setUser(user);
      }
      else {
        setIsAuth(false);
        setUser(null);
      }
    })
  }, [])



  const signUserOut = () => {
    //redirect to "/" route once user logs out
    window.location.pathname="/home";
    //just in case if there is any localStorage data
    localStorage.clear();
    logout();
  }



  return (
    <>
      <div className={`navbar-container${show ? ' drawer' : ''}`}>
        <div className={`navbar-button${show ? ' visible' : ''}`} onClick={() => { onSearchToggle(); }}>
          <img src={Search} height={25} width={25} />
        </div>
        <Link to={'/home'} className={`navbar-logo${show ? ' drawer' : ''}`} style={{ color: 'white' }}>
          M E T A M A A P
        </Link>
        <div className='navbar-actions'>
          {isAuth ? <img src={user?.photoURL ?? "https://i.imgur.com/b08hxPY.png"} style={{ height: '40px', width: '40px', borderRadius: '75%' }} alt="your image" /> : <div className='navbar-connect-button' onClick={() => setShowConnect(!showConnect)}>Connect</div>}
          <div className='navbar-connect-button' onClick={() => { setShowDropdown(val => !val) }}> <img src={Grid} height={25} width={25} /></div>
          <div className={`navbar-dropdown ${showDropdown ? '' : ' hide'}`}>
            <div className='navbar-dropdown-header'>METAMAAP</div>
            <div className='navbar-divider' />
            <Link to="/home" className='navbar-dropdown-item'>Home</Link>
            <Link to="/about" className="navbar-dropdown-item">About</Link>
            <Link to="https://www.krifin.in/" target='_blank' className="navbar-dropdown-item">House of Krifin</Link>
            <Link to="https://www.metaversecouncil.io/" target='_blank' className="navbar-dropdown-item">Metaverse Council</Link>
            <Link to="/partners" className="navbar-dropdown-item">Partners</Link>
            {isAuth && <Link to="/dashboard" className="navbar-dropdown-item">Dashboard</Link>}
           {isAuth && <Link to="https://forms.gle/jWEAn1DL8vECaWbd8" target='_blank' className="navbar-dropdown-item">Add Metaverse</Link>}
            {isAuth && <Link to="/nft-transfers" className="navbar-dropdown-item">Add NFT</Link>}
            <div className='navbar-dropdown-item'>Socials</div>
            <div style={{ display: 'flex', gap: '20px', padding: '10px 25px', justifyContent: 'center' }}>
              <Icon name='twitter' style={{ fontSize: '20px' }} className='white' />
              <Icon name='instagram' style={{ fontSize: '20px' }} className='white' />
              <Icon name='telegram plane' style={{ fontSize: '20px' }} className='white' />
              <Icon name='discord' style={{ fontSize: '20px' }} className='white' />
              <Icon name='linkedin square' style={{ fontSize: '20px' }} className='white' />
            </div>
           {isAuth && <div className="navbar-dropdown-item" onClick={() => signUserOut()}>Logout</div>}
          </div>
          {/* {!isAuth ? <div className='navbar-connect-button' onClick={() => setShowConnect(!showConnect)}>Connect</div> : 
        (
          
          <div className='navbar-connect-button-outside' style={{ cursor: 'pointer' }} >
            <div className="navbar-connect-button-inside">
            {<img src = {user?.photoURL ?? "https://mindandculture.org/wordpress6/wp-content/uploads/2018/06/Fotolia_188161178_XS.jpg"} style={{height: '50px', width: '50px', borderRadius: '75%'}} alt="your image" />}
              
            <div className="navbar-connect-button" onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
              <img src={Grid} height={25} width={25} />
              
            </div>
            </div>
            {showDropdown && (
              <div className="navbar-dropdown-menu" onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
              <div className="navbar-dropdown-item" onClick={()=>navigate("/dashboard")}>
                Dashboard
              </div>
              <div className="navbar-dropdown-item" onClick={()=>navigate("/about")}>
                About
              </div>
              <div className="navbar-dropdown-item" onClick={()=>navigate("/home")}>
                Add Metaverse
              </div>
              <div className="navbar-dropdown-item" onClick={()=>navigate("/home")}>
                Add NFT
              </div>
              <div className="navbar-dropdown-item" onClick={()=>navigate("/nft-transfers")}>
                NFT Transfer
              </div>
              <div className="navbar-dropdown-item" onClick={()=>navigate("/nft-transfers")}>
                Add 
              </div>
              <div className="navbar-dropdown-item" onClick={()=>navigate("/carousel")}>
                Carousel
              </div>
              <div className="navbar-dropdown-item" onClick={()=>signUserOut()}>
                Logout
              </div>
            </div>
            )}
            
          </div>
           */}
          {/* )} */}
        </div>
      </div>

      {/* {showConnect && <SelectOptionDialog setIsAuth = {setIsAuth} setRes={setRes} setShowConnect={setShowConnect} showConnect={showConnect} setRegister={setRegister}/>} */}
      {showConnect && <SelectOptionDialog onClose={() => { setShowConnect(false) }} setIsAuth={setIsAuth}/>}
    </>
  )
}

export default Navbar