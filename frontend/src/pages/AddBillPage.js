import React from 'react';
import BillForm from '../components/BillForm';

const AddBillPage = ({ onBillAdded }) => {
  return (
    <div className="page">
      <h1>Add New Bill</h1>
      <BillForm onBillAdded={onBillAdded} />
    </div>
  );
};

export default AddBillPage;