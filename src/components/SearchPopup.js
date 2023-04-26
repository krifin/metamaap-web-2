import React from 'react'
import './SearchPopup.css'

const SearchPopup = ({show}) => {
  return (
    <div className={`search-container${show ? ' show' : ''}`}>
        <input type='text' placeholder='Search' />
    </div>
  )
}

export default SearchPopup