import React from 'react';
import Dashboard from '../components/Dashboard';

const DashboardPage = ({ bills }) => {
  return (
    <div className="page">
      <h1>Dashboard</h1>
      <Dashboard bills={bills} />
    </div>
  );
};

export default DashboardPage;