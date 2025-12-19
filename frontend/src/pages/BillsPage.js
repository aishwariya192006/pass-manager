import React, { useState } from 'react';
import BillCard from '../components/BillCard';
import SearchSort from '../components/SearchSort';
import ExportPDF from '../components/ExportPDF';

const BillsPage = ({ bills, onDelete, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');

  const filteredBills = bills
    .filter(bill => {
      const matchesSearch = bill.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           bill.vendor.toLowerCase().includes(searchTerm.toLowerCase());
      const isExpired = new Date() > new Date(bill.expiryDate);
      
      if (filterBy === 'active') return matchesSearch && !isExpired;
      if (filterBy === 'expired') return matchesSearch && isExpired;
      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price': return b.price - a.price;
        case 'name': return a.productName.localeCompare(b.productName);
        case 'expiry': return new Date(a.expiryDate) - new Date(b.expiryDate);
        default: return new Date(b.purchaseDate) - new Date(a.purchaseDate);
      }
    });

  return (
    <div className="page">
      <div className="section-header">
        <h1>Your Bills ({filteredBills.length})</h1>
        <ExportPDF bills={filteredBills} />
      </div>
      
      <SearchSort 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />
      
      {loading ? (
        <div className="loading">Loading bills...</div>
      ) : filteredBills.length === 0 ? (
        <div className="no-bills">No bills found matching your criteria.</div>
      ) : (
        <div className="bills-grid">
          {filteredBills.map(bill => (
            <BillCard 
              key={bill._id} 
              bill={bill} 
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BillsPage;