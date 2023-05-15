import React, { useContext, useEffect, useState } from 'react'
import './SearchPopup.css'
import 'semantic-ui-css/semantic.min.css'
import { Icon, Pagination } from 'semantic-ui-react'
import { AppContext } from '../AppContext'
import { Link } from 'react-router-dom'





const SearchPopup = ({ show, onClose }) => {
  const [metaverses,] = useContext(AppContext)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const [totalSize, setTotalSize] = useState(Math.floor((window.innerHeight - 200) / 200))
  useEffect(() => {
    window.addEventListener('resize', () => {
      setTotalSize(Math.floor((window.innerHeight - 200) / 200))
    })
  }, [])
  return (
    <div className={`search-container${show ? ' show' : ''}`}>
      <div style={{display: 'flex', gap: '0 10px', alignItems: 'center'}}>
        <input type='search' placeholder='Search' className='search-bar' value={search} onChange={(e) => { setSearch(e.currentTarget.value) }} />
        <Icon name='close' color='grey' inverted size='big' onClick={() => {onClose()}}/>
      </div>
      {metaverses.length === 0 ? <div style={{ flex: 1 }} /> : <div className='search-results'>
        {metaverses.filter(val => val.mcid.toLowerCase().includes(search.toLowerCase()) || val.nm.toLowerCase().includes(search.toLowerCase())).slice((page - 1) * totalSize, (page) * totalSize).map((metaverse) => {
          return (
            <Link className="search-result" to={metaverse.website} target='_blank'>
              <div className="result-image">
                <div className='result-id'>#{metaverse.mcid}</div>
              </div>
              <div className="result-text">
                {/* Logo Image */}
                <div className="result-logo" />
                <div className="result-name">{metaverse.nm}</div>
              </div>
            </Link>
          )
        }
        )}
      </div>}
      {metaverses.filter(val => val.mcid.toLowerCase().includes(search.toLowerCase()) || val.nm.toLowerCase().includes(search.toLowerCase())).length > totalSize && <div>
        <Pagination defaultActivePage={page} totalPages={Math.ceil(metaverses.filter(val => val.mcid.toLowerCase().includes(search.toLowerCase()) || val.nm.toLowerCase().includes(search.toLowerCase())).length / totalSize)} onPageChange={(e, { activePage }) => { setPage(activePage) }} className='pagination-ui' />
      </div>}
    </div>
  )
}

export default SearchPopup