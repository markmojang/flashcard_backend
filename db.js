const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = 8000;

async function connectDB() {
  try {
    await mongoose.connect('Database here'); 
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  }
}

module.exports = connectDB;
