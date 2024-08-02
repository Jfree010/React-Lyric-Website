import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Symbols from '../Symbols.js';

const Searchbar = () => {
    const [ searchTerm, setSearchTerm ] = useState('');
    const navigate = useNavigate();
    // console.log(searchTerm);

    const handleSearch = useCallback(() => {
        navigate(`tracklist/search?term=${encodeURIComponent(searchTerm)}`, {replace: true, state: { searchTerm }});
        setSearchTerm('');
    }, [searchTerm, navigate]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-container">
            <div className='search-box'>
                <input 
                    type="text" 
                    placeholder="Search for tracks..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    onKeyUp={handleKeyPress}
                />
                <button type="button" onClick={handleSearch}><Symbols name="search"/></button>
            </div>
        </div>
    );
};

export default Searchbar;
