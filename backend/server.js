const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const billRoutes = require('./routes/bills');

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/bills', billRoutes);

// MongoDB Connection - Try local first, then Atlas
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/warranty-system');
    console.log('Local MongoDB connected successfully');
  } catch (err) {
    try {
      await mongoose.connect('mongodb+srv://demo:demo123@cluster0.mongodb.net/warranty-system');
      console.log('MongoDB Atlas connected successfully');
    } catch (atlasErr) {
      console.log('MongoDB connection failed, using local JSON storage');
    }
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});