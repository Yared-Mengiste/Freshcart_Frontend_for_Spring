import React from 'react';
import SearchIcon from '../assets/search.png'
import './Search.css';

const Search = () => {
  return (
    <div>
        <a href='#'><img src={SearchIcon} alt="" className='icon search' /></a>
        <input className='search-input' type="text" placeholder="Search..." />
    </div>
  )
}

export default Search