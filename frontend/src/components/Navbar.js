import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">Warranty Manager</Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Dashboard</Link>
        <Link to="/bills" className="nav-link">Bills</Link>
        <Link to="/add-bill" className="nav-link">Add Bill</Link>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;