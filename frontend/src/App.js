import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import BillsPage from './pages/BillsPage';
import AddBillPage from './pages/AddBillPage';
import './App.css';

function App() {
  const [bills, setBills] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn) {
      setIsLoggedIn(true);
      fetchBills();
    }
  }, []);

  const fetchBills = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/bills');
      setBills(response.data);
    } catch (error) {
      console.error('Error fetching bills:', error);
      alert('Error loading bills. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleBillAdded = () => {
    fetchBills();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/bills/${id}`);
      fetchBills();
    } catch (error) {
      console.error('Error deleting bill:', error);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    fetchBills();
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setBills([]);
  };



  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="App">
        <Navbar onLogout={handleLogout} />
        
        <main className="main">
          <Routes>
            <Route path="/" element={<DashboardPage bills={bills} />} />
            <Route path="/bills" element={<BillsPage bills={bills} onDelete={handleDelete} loading={loading} />} />
            <Route path="/add-bill" element={<AddBillPage onBillAdded={handleBillAdded} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;