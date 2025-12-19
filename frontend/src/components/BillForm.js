import React, { useState } from 'react';
import axios from 'axios';

const BillForm = ({ onBillAdded }) => {
  const [formData, setFormData] = useState({
    productName: '',
    vendor: '',
    price: '',
    purchaseDate: '',
    warrantyPeriod: '',
    category: 'Electronics'
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      alert('Please select a bill image');
      return;
    }
    
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    data.append('billImage', file);

    try {
      const response = await axios.post('/api/bills', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      console.log('Bill added successfully:', response.data);
      
      setFormData({
        productName: '',
        vendor: '',
        price: '',
        purchaseDate: '',
        warrantyPeriod: '',
        category: 'Electronics'
      });
      setFile(null);
      document.querySelector('input[type="file"]').value = '';
      onBillAdded();
      alert('Bill added successfully!');
    } catch (error) {
      console.error('Error adding bill:', error);
      alert('Error adding bill: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Bill</h2>
      <form onSubmit={handleSubmit} className="bill-form">
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleChange}
          required
        />
        
        <input
          type="text"
          name="vendor"
          placeholder="Vendor/Store"
          value={formData.vendor}
          onChange={handleChange}
          required
        />
        
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        
        <input
          type="date"
          name="purchaseDate"
          value={formData.purchaseDate}
          onChange={handleChange}
          required
        />
        
        <input
          type="number"
          name="warrantyPeriod"
          placeholder="Warranty Period (months)"
          value={formData.warrantyPeriod}
          onChange={handleChange}
          required
        />
        
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="Electronics">Electronics</option>
          <option value="Appliances">Appliances</option>
          <option value="Furniture">Furniture</option>
          <option value="Automotive">Automotive</option>
          <option value="Other">Other</option>
        </select>
        
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Bill'}
        </button>
      </form>
    </div>
  );
};

export default BillForm;