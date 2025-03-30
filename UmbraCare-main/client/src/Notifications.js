// client/src/Notifications.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found. Please log in again.');
        }
        console.log('Token for fetching notifications:', token);

        const response = await axios.get('http://localhost:5000/api/notifications', {
          headers: {
            'x-auth-token': token,
          },
        });
        setNotifications(response.data);
      } catch (err) {
        console.error('Error fetching notifications:', err.response?.data || err.message);
        setError(`Error fetching notifications: ${err.response?.data?.msg || err.message}`);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.notificationsContainer}>
        <h2 style={styles.heading}>Notifications</h2>
        {error && <p style={styles.error}>{error}</p>}
        {notifications.length === 0 ? (
          <p style={styles.info}>No notifications available.</p>
        ) : (
          <ul style={styles.notificationList}>
            {notifications.map((notification) => (
              <li key={notification._id} style={styles.notificationItem}>
                <strong>{notification.type === 'ivf_medication' ? 'Medication Reminder' : 'Appointment Reminder'}:</strong> {notification.message}
                <br />
                <small>{new Date(notification.createdAt).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontFamily: "'Poppins', sans-serif",
    boxSizing: 'border-box',
  },
  notificationsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    border: '2px solid #ff8c00',
    width: '100%',
    maxWidth: '600px',
  },
  heading: {
    fontSize: '28px',
    color: '#ff8c00',
    marginBottom: '20px',
    fontWeight: '600',
  },
  info: {
    fontSize: '16px',
    color: '#333',
  },
  error: {
    fontSize: '16px',
    color: 'red',
    marginBottom: '20px',
  },
  notificationList: {
    listStyleType: 'none',
    padding: 0,
    textAlign: 'left',
  },
  notificationItem: {
    backgroundColor: '#f9f9f9',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
};

export default Notifications;