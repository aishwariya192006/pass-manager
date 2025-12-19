const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Bill = require('../models/Bill');

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const dbPath = path.join(__dirname, '..', 'bills.json');

// Initialize database file
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify([]));
}

const readDB = () => {
  try {
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  } catch {
    return [];
  }
};

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// GET all bills
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const bills = await Bill.find().sort({ createdAt: -1 });
      res.json(bills);
    } else {
      const bills = readDB();
      res.json(bills);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new bill
router.post('/', upload.single('billImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const { productName, vendor, price, purchaseDate, warrantyPeriod, category } = req.body;
    
    if (!productName || !vendor || !price || !purchaseDate || !warrantyPeriod) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const purchaseDateTime = new Date(purchaseDate);
    const expiryDate = new Date(purchaseDateTime);
    expiryDate.setMonth(expiryDate.getMonth() + parseInt(warrantyPeriod));
    
    // Try MongoDB first, fallback to JSON
    if (mongoose.connection.readyState === 1) {
      const bill = new Bill({
        productName,
        vendor,
        price: parseFloat(price),
        purchaseDate: purchaseDateTime,
        warrantyPeriod: parseInt(warrantyPeriod),
        expiryDate,
        billImage: req.file.filename,
        category: category || 'Electronics'
      });
      
      const savedBill = await bill.save();
      console.log('Bill saved to MongoDB');
      res.status(201).json(savedBill);
    } else {
      // Fallback to JSON storage
      const bills = readDB();
      const newBill = {
        _id: Date.now().toString(),
        productName,
        vendor,
        price: parseFloat(price),
        purchaseDate: purchaseDateTime,
        warrantyPeriod: parseInt(warrantyPeriod),
        expiryDate,
        billImage: req.file.filename,
        category: category || 'Electronics',
        createdAt: new Date()
      };
      
      bills.unshift(newBill);
      writeDB(bills);
      console.log('Bill saved to JSON file');
      res.status(201).json(newBill);
    }
  } catch (error) {
    console.error('Error saving bill:', error);
    res.status(500).json({ message: error.message });
  }
});

// DELETE bill
router.delete('/:id', (req, res) => {
  try {
    const bills = readDB();
    const filteredBills = bills.filter(bill => bill._id !== req.params.id);
    writeDB(filteredBills);
    res.json({ message: 'Bill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;