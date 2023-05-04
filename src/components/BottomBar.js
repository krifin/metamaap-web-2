import React from 'react'
import './BottomBar.css'
import { Link } from 'react-router-dom'

const BottomBar = ({ show }) => {
  return (
    <div className={`bottom-bar-container${show ? ' drawer' : ''}`}>
      <div className='tabs'>
        <Link to={'/about'}>
          <div className='tab-item'>About</div>
        </Link>
        <Link to="https://forms.gle/jWEAn1DL8vECaWbd8" target='_blank'>
          <div className='tab-item'>Add Metaverse</div>
        </Link>
        <Link to={'/nft-transfers'}>
        <div className='tab-item'>NFT Transfers</div>
        </Link>
      </div>
    </div>
  )
}

export default BottomBar