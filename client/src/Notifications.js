// client/src/Notifications.js
import React, { useState } from 'react'; // Removed useEffect

const Notifications = () => {
  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem('notifications');
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });

  const handleClear = (index) => {
    const updatedNotifications = notifications.filter((_, i) => i !== index);
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  return (
    <div style={styles.container}>
      <div style={styles.notificationsContainer}>
        <h2 style={styles.heading}>Notifications</h2>
        {notifications.length === 0 ? (
          <p style={styles.noNotifications}>No notifications available.</p>
        ) : (
          <ul style={styles.notificationList}>
            {notifications.map((notification, index) => (
              <li key={index} style={styles.notificationItem}>
                {notification}
                <button
                  onClick={() => handleClear(index)}
                  style={styles.clearButton}
                >
                  Clear
                </button>
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
    paddingTop: '80px',
    paddingBottom: '20px',
    backgroundColor: '#f5f5f5',
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
  noNotifications: {
    fontSize: '16px',
    color: '#333',
  },
  notificationList: {
    listStyleType: 'none',
    padding: 0,
    textAlign: 'left',
  },
  notificationItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ccc',
    fontSize: '16px',
    color: '#333',
  },
  clearButton: {
    backgroundColor: '#ff8c00',
    color: '#fff',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Notifications;