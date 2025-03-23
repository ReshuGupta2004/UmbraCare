// routes/notifications.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Notification = require('../models/Notification');

// Add a new notification
router.post('/', auth, async (req, res) => {
  const { type, message } = req.body;
  try {
    const notification = new Notification({
      userId: req.user.id,
      type,
      message,
    });
    await notification.save();
    res.json(notification);
  } catch (err) {
    console.error('Error saving notification:', err);
    res.status(500).send('Server error');
  }
});

// Get all notifications for the user
router.get('/', auth, async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;