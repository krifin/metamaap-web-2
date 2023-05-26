import React from 'react'
import './Partners.css'

const Partners = () => {
  return (
    <div className='partners-container'>
        <div className='partners-title'>Our Partners</div>
        <div className='partners-images'>
            {Array(9).fill().map((_, i) => {
                return <img key={i} style={{maxWidth: (window.innerWidth - 50)}} className='partners-image' src={`/assets/images/partners/${i + 1}.png`} alt='partner' />
            })}
        </div>
    </div>
  )
}

export default Partners