// client/src/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/dashboard" style={styles.logo}>UmbraCare</Link>
      <div style={styles.navLinks}>
        <Link to="/maternal-tracker" style={styles.navLink}>Maternal Tracker</Link>
        <Link to="/period-tracker" style={styles.navLink}>Period Tracker</Link>
        <Link to="/ivf-tracker" style={styles.navLink}>IVF Tracker</Link> {/* Changed from Chatbot */}
        <Link to="/notifications" style={styles.navLink}>Notifications</Link>
        <Link to="/profile" style={styles.navLink}>Profile</Link>
        <button onClick={handleLogout} style={styles.logoutButton}>
          <FaSignOutAlt style={{ marginRight: '5px' }} /> Logout
        </button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#ff8c00',
    color: '#fff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
    boxSizing: 'border-box',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff',
    textDecoration: 'none',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'color 0.3s',
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    color: '#ff8c00',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
};

export default Navbar;