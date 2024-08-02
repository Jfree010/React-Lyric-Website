import React from 'react'
import SearchList from '../components/Search_components/SearchList'
import DropDown from '../components/Search_components/DropDown'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { SortbyContext } from '../context/SortbyContext'

const Search = () => {
    const location = useLocation()
    const { state } = location
    const [all_tracks, set_all_tracks] = useState([])
    const [sortby, set_sortby] = useState('length')

    // console.log("check state: ", state)
    // if(state) {
    //   console.log('yes')
    // } else {
    //   console.log('no')
    // }

    const sortByType = (data, sortby) => {
      const sortingFunctions = {
        'length': (a, b) => a.length - b.length,
        'Name (A-Z)': (a, b) => a.title.localeCompare(b.title),
        'Album': (a, b) => a.album.localeCompare(b.album),
        'Name (Z-A)': (a, b) => b.title.localeCompare(a.title)
      };
    
      const sortingFunction = sortingFunctions[sortby]
      const sortedData = [...data].sort(sortingFunction);
      set_all_tracks(sortedData);
    };
    

  useEffect(()=> {
    axios.get("http://localhost:5000/songs").then((res) => {
      let searchResults = {}
      if (state) {
        searchResults = res.data.filter((item) => 
          item.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          item.album.toLowerCase().includes(state.searchTerm.toLowerCase())
        )
      } else {
        searchResults = res.data
      }
      sortByType(searchResults, sortby)
      // set_all_tracks(searchResults)
    })
  }, [state, sortby])

  return (
    <div className='search_box'>
      <div className='search_head'>
        <div> {state ? (<h1>{all_tracks.length} results for: '{state.searchTerm}'</h1>) : ''} </div>
        <SortbyContext.Provider value={{sortby, set_sortby}}>
          <div className='search_head_right'> <DropDown/> </div>
          </SortbyContext.Provider>
      </div>
      <div className='search_box_scrollable'>
        {all_tracks.map((track, index) => (
            <SearchList key={index} title={track.title} image={track.image} 
            album={track.album} music={track.musicLink} video={track.videolink} length={track.length}/>
        ))}  
      </div>    
    </div>
  )
}

export default Search