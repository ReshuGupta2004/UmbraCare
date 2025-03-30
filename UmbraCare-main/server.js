// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());  
app.use(cors({origin: "*"}));

// Middleware
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://riyanshigupta2004:Qf7ZzNW6OeXjyYGD@cluster0.sx8m8.mongodb.net/')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
// Routes
app.use('/api/users', require('./routes/users')); // This should include /me
app.use('/api/notifications', require('./routes/notifications'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));