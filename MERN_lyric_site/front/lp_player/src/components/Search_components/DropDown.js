import React, { useContext } from 'react'
import { SortbyContext } from '../../context/SortbyContext'

const DropDown = () => {
  const { sortby, set_sortby } = useContext(SortbyContext)

  const setSort = (sorttype) => {
    // console.log(sorttype)
    set_sortby(sorttype)
  }

  return (
    <div>
      <div className="search_dropdown">
        <button className="search_dropbtn">
          Sort by: {sortby} 
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
            <path fill="currentColor" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z"/>
          </svg>
        </button>
        <div className="search_dropdown_content">
          <span><button onClick={() => setSort('length')}>Length</button></span>
          <span><button onClick={() => setSort('Name (A-Z)')}>Name (A-Z)</button></span>
          <span><button onClick={() => setSort('Name (Z-A)')}>Name (Z-A)</button></span>
          <span><button onClick={() => setSort('Album')}>Album</button></span>
        </div>
      </div>
    </div>
  )
}

export default DropDown
