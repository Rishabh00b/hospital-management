import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value); // Trigger search on every keystroke or update query param
    };

    return (
        <div className="search-bar">
            <input 
                type="text" 
                placeholder="Search by name or disease..." 
                value={searchTerm} 
                onChange={handleSearch} 
            />
        </div>
    );
};

export default SearchBar;
