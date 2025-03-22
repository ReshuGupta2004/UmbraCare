// client/src/UserProfile.js
import React, { useState } from 'react';
import backgroundImage from './background.jpg';

const UserProfile = () => {
  const [name, setName] = useState('Jane Doe');
  const [email, setEmail] = useState('jane.doe@example.com');
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setMessage('Profile updated successfully!');
  };

  return (
    <div style={styles.container}>
      <div style={styles.profileContainer}>
        <h2 style={styles.heading}>User Profile</h2>
        {isEditing ? (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            <button type="submit" style={styles.button}>Save</button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              style={styles.cancelButton}
            >
              Cancel
            </button>
          </form>
        ) : (
          <div>
            <p style={styles.info}><strong>Name:</strong> {name}</p>
            <p style={styles.info}><strong>Email:</strong> {email}</p>
            <button onClick={() => setIsEditing(true)} style={styles.button}>
              Edit Profile
            </button>
          </div>
        )}
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 80px)',
    paddingTop: '80px',
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: '40% 60%',
    fontFamily: "'Poppins', sans-serif",
  },
  profileContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
    textAlign: 'center',
    border: '2px solid #ff8c00',
  },
  heading: {
    fontSize: '28px',
    color: '#ff8c00',
    marginBottom: '20px',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  label: {
    fontSize: '16px',
    color: '#666',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ff8c00',
    borderRadius: '5px',
    outline: 'none',
  },
  button: {
    backgroundColor: '#ff8c00',
    color: '#fff',
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#666',
    color: '#fff',
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  info: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '10px',
  },
  message: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#ff8c00',
  },
};

export default UserProfile;