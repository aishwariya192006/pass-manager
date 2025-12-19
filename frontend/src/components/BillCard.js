import React from 'react';

const BillCard = ({ bill, onDelete }) => {
  const isExpired = new Date() > new Date(bill.expiryDate);
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className={`bill-card ${isExpired ? 'expired' : 'active'}`}>
      <div className="card-header">
        <h3>{bill.productName}</h3>
        <span className={`status ${isExpired ? 'expired' : 'active'}`}>
          {isExpired ? 'Expired' : 'Active'}
        </span>
      </div>
      
      <div className="card-body">
        <p><strong>Category:</strong> {bill.category}</p>
        <p><strong>Vendor:</strong> {bill.vendor}</p>
        <p><strong>Price:</strong> ${bill.price}</p>
        <p><strong>Purchase Date:</strong> {formatDate(bill.purchaseDate)}</p>
        <p><strong>Warranty:</strong> {bill.warrantyPeriod} months</p>
        <p><strong>Expires:</strong> {formatDate(bill.expiryDate)}</p>
      </div>
      
      <div className="card-actions">
        <a 
          href={`http://localhost:5001/${bill.billImage}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="view-btn"
        >
          View Receipt
        </a>
        <button 
          onClick={() => onDelete(bill._id)}
          className="delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BillCard;