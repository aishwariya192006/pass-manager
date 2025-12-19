import React, { useState } from 'react';
import axios from 'axios';

const EditBillModal = ({ bill, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    productName: bill.productName,
    vendor: bill.vendor,
    price: bill.price,
    purchaseDate: bill.purchaseDate.split('T')[0],
    warrantyPeriod: bill.warrantyPeriod,
    category: bill.category || 'Electronics'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/bills/${bill._id}`, formData);
      onUpdate();
      onClose();
    } catch (error) {
      alert('Error updating bill');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Bill</h2>
        <form onSubmit={handleSubmit}>
          <input name="productName" value={formData.productName} onChange={handleChange} required />
          <input name="vendor" value={formData.vendor} onChange={handleChange} required />
          <input name="price" type="number" value={formData.price} onChange={handleChange} required />
          <input name="purchaseDate" type="date" value={formData.purchaseDate} onChange={handleChange} required />
          <input name="warrantyPeriod" type="number" value={formData.warrantyPeriod} onChange={handleChange} required />
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="Electronics">Electronics</option>
            <option value="Appliances">Appliances</option>
            <option value="Furniture">Furniture</option>
            <option value="Automotive">Automotive</option>
            <option value="Other">Other</option>
          </select>
          <div className="modal-actions">
            <button type="submit">Update</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBillModal;