import React from 'react';

const Dashboard = ({ bills }) => {
  const totalBills = bills.length;
  const activeBills = bills.filter(bill => new Date() <= new Date(bill.expiryDate)).length;
  const expiredBills = totalBills - activeBills;
  const totalValue = bills.reduce((sum, bill) => sum + bill.price, 0);
  const expiringThisMonth = bills.filter(bill => {
    const expiry = new Date(bill.expiryDate);
    const now = new Date();
    return expiry.getMonth() === now.getMonth() && expiry.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="dashboard">
      <div className="stat-card">
        <h3>{totalBills}</h3>
        <p>Total Bills</p>
      </div>
      <div className="stat-card active">
        <h3>{activeBills}</h3>
        <p>Active Warranties</p>
      </div>
      <div className="stat-card expired">
        <h3>{expiredBills}</h3>
        <p>Expired Warranties</p>
      </div>
      <div className="stat-card">
        <h3>${totalValue.toFixed(2)}</h3>
        <p>Total Value</p>
      </div>
      <div className="stat-card warning">
        <h3>{expiringThisMonth}</h3>
        <p>Expiring This Month</p>
      </div>
    </div>
  );
};

export default Dashboard;