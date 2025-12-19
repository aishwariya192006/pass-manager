import React from 'react';

const ExportPDF = ({ bills }) => {
  const exportToPDF = () => {
    const printContent = `
      <html>
        <head>
          <title>Warranty Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .active { color: green; font-weight: bold; }
            .expired { color: red; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>Warranty & Bill Report</h1>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
          <table>
            <tr>
              <th>Product</th>
              <th>Vendor</th>
              <th>Category</th>
              <th>Price</th>
              <th>Purchase Date</th>
              <th>Warranty</th>
              <th>Expires</th>
              <th>Status</th>
            </tr>
            ${bills.map(bill => {
              const isExpired = new Date() > new Date(bill.expiryDate);
              return `
                <tr>
                  <td>${bill.productName}</td>
                  <td>${bill.vendor}</td>
                  <td>${bill.category}</td>
                  <td>$${bill.price}</td>
                  <td>${new Date(bill.purchaseDate).toLocaleDateString()}</td>
                  <td>${bill.warrantyPeriod} months</td>
                  <td>${new Date(bill.expiryDate).toLocaleDateString()}</td>
                  <td class="${isExpired ? 'expired' : 'active'}">${isExpired ? 'EXPIRED' : 'ACTIVE'}</td>
                </tr>
              `;
            }).join('')}
          </table>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <button onClick={exportToPDF} className="export-btn">
      Export PDF Report
    </button>
  );
};

export default ExportPDF;