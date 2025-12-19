import React from 'react';

const SearchSort = ({ searchTerm, setSearchTerm, sortBy, setSortBy, filterBy, setFilterBy }) => {
  return (
    <div className="search-sort-container">
      <input
        type="text"
        placeholder="Search bills..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
        <option value="date">Sort by Date</option>
        <option value="price">Sort by Price</option>
        <option value="name">Sort by Name</option>
        <option value="expiry">Sort by Expiry</option>
      </select>
      
      <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)} className="filter-select">
        <option value="all">All Bills</option>
        <option value="active">Active Only</option>
        <option value="expired">Expired Only</option>
      </select>
    </div>
  );
};

export default SearchSort;