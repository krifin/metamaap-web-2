import React, { useEffect, useState } from 'react'
import './SearchPopup.css'
import 'semantic-ui-css/semantic.min.css'
import { Icon, Pagination } from 'semantic-ui-react'





const SearchPopup = ({ show, onClose }) => {
  const [metaverses, setMetaverses] = useState([
    {
      name: 'Metaverse 1',
      id: '111-111-111'
    },
    {
      name: 'Metaverse 2',
      id: '222-222-222'
    },
    {
      name: 'Metaverse 3',
      id: '333-333-333'
    },
    {
      name: 'Metaverse 1',
      id: '111-111-111'
    },
    {
      name: 'Metaverse 2',
      id: '222-222-222'
    },
    {
      name: 'Metaverse 3',
      id: '333-333-333'
    },
    {
      name: 'Metaverse 1',
      id: '111-111-111'
    },
    {
      name: 'Metaverse 2',
      id: '222-222-222'
    },
    {
      name: 'Metaverse 3',
      id: '333-333-333'
    },

  ])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  console.log(Math.floor((window.innerWidth - 50) / 320))
  const [totalSize, setTotalSize] = useState(Math.floor((window.innerWidth - 50) / 320))
  useEffect(() => {
    window.addEventListener('resize', () => {
      setTotalSize(Math.floor((window.innerWidth - 100) / 320))
    })
  }, [])
  return (
    <div className={`search-container${show ? ' show' : ''}`}>
      <div style={{display: 'flex', gap: '0 10px', alignItems: 'center'}}>
        <input type='search' placeholder='Search' className='search-bar' onChange={(e) => { setSearch(e.currentTarget.value) }} />
        <Icon name='close' color='grey' inverted size='big' onClick={onClose}/>
      </div>
      {metaverses.length == 0 ? <div style={{ flex: 1 }} /> : <div className='search-results'>
        {metaverses.filter(val => val.id.toLowerCase().includes(search.toLowerCase()) || val.name.toLowerCase().includes(search.toLowerCase())).slice((page - 1) * totalSize, (page) * totalSize).map((metaverse) => {
          return (
            <div className="search-result">
              <div className="result-image">
                <div className='result-id'>#{metaverse.id}</div>
              </div>
              <div className="result-text">
                {/* Logo Image */}
                <div className="result-logo" />
                <div className="result-name">{metaverse.name}</div>
              </div>
            </div>
          )
        }
        )}
      </div>}
      {metaverses.length > totalSize && <div>
        <Pagination defaultActivePage={page} totalPages={Math.ceil(metaverses.length / totalSize)} onPageChange={(e, { activePage }) => { setPage(activePage) }} className='pagination-ui' />
      </div>}
    </div>
  )
}

export default SearchPopup