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

// MongoDB Atlas Connection
mongoose.connect('mongodb+srv://aishu:aishu2006@cluster0.crmaqm9.mongodb.net/warranty-system?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Atlas connected successfully'))
  .catch(err => {
    console.log('MongoDB Atlas connection failed:', err.message);
    console.log('Using local JSON storage as fallback');
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});