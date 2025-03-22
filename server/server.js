// server/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Update to match your frontend port
}));

// Debug CORS headers
app.use((req, res, next) => {
  console.log('Setting CORS headers for:', req.headers.origin);
  res.on('finish', () => {
    console.log('Response Headers:', res.getHeaders());
  });
  next();
});

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/umbracare')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// User schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.model('User', userSchema);

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', { email, password });
  try {
    const user = await User.findOne({ email, password });
    console.log('User found:', user);
    if (user) {
      res.send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Server error');
  }
});

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  console.log('Register attempt:', { email, password });
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }
    const newUser = new User({ email, password });
    await newUser.save();
    res.send('Registration successful');
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).send('Server error');
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});