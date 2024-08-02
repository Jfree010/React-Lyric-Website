import React from 'react'
import { Link } from 'react-router-dom'
 
const SearchList = (props) => {
    const { title, image, length, album} = props

    function timeString(length) {
      const seconds = length.length
      const min = Math.floor(seconds / 60);
      const sec = seconds % 60;
      let v = `${min}:${sec < 10 ? '0' : ''}${sec}`;
      return v
    }

  return (
    <div className='search_list'>
      <Link to={`${title}`} state={{title: title}} className='globalLink'>
        <div className='search_list_link'>
          <img src={image} alt="album name"/>
          <div className='search_list_title'>
              {title} ({timeString({length})}) [{album}]
          </div>
        </div>
      </Link>
    </div>
  )
}

export default SearchList