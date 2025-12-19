const mongoose = require('mongoose');
const Bill = require('./models/Bill');
require('dotenv').config();

// Sample bills data
const sampleBills = [
  {
    productName: "Samsung 55\" Smart TV",
    vendor: "Best Buy",
    price: 899.99,
    purchaseDate: new Date('2024-01-15'),
    warrantyPeriod: 24,
    expiryDate: new Date('2026-01-15'),
    billImage: "uploads/placeholder.txt"
  },
  {
    productName: "iPhone 15 Pro",
    vendor: "Apple Store",
    price: 1199.99,
    purchaseDate: new Date('2023-09-20'),
    warrantyPeriod: 12,
    expiryDate: new Date('2024-09-20'),
    billImage: "uploads/placeholder.txt"
  },
  {
    productName: "Dell XPS 13 Laptop",
    vendor: "Amazon",
    price: 1299.99,
    purchaseDate: new Date('2023-06-10'),
    warrantyPeriod: 36,
    expiryDate: new Date('2026-06-10'),
    billImage: "uploads/placeholder.txt"
  },
  {
    productName: "Sony WH-1000XM4 Headphones",
    vendor: "Target",
    price: 349.99,
    purchaseDate: new Date('2023-12-01'),
    warrantyPeriod: 12,
    expiryDate: new Date('2024-12-01'),
    billImage: "uploads/placeholder.txt"
  },
  {
    productName: "KitchenAid Stand Mixer",
    vendor: "Williams Sonoma",
    price: 449.99,
    purchaseDate: new Date('2022-11-25'),
    warrantyPeriod: 12,
    expiryDate: new Date('2023-11-25'),
    billImage: "uploads/placeholder.txt"
  }
];

async function addSampleBills() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/warranty-system');
    console.log('Connected to MongoDB');
    
    // Clear existing bills
    await Bill.deleteMany({});
    console.log('Cleared existing bills');
    
    // Add sample bills
    const bills = await Bill.insertMany(sampleBills);
    console.log(`Added ${bills.length} sample bills`);
    
    bills.forEach(bill => {
      const isExpired = new Date() > new Date(bill.expiryDate);
      console.log(`- ${bill.productName}: ${isExpired ? 'EXPIRED' : 'ACTIVE'}`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

addSampleBills();