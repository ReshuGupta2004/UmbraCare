import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current path

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path; // Check if path matches

  return (
    <nav style={styles.navbar}>
      <Link to="/dashboard" style={styles.logo}>UmbraCare</Link>
      <div style={styles.navLinks}>
        <Link
          to="/pregnancy-postpartum-tracker"
          style={{
            ...styles.navLink,
            ...(isActive('/pregnancy-postpartum-tracker') ? styles.activeLink : {}),
          }}
        >
          Pregnancy & Postpartum Tracker
        </Link>
        <Link
          to="/period-tracker"
          style={{
            ...styles.navLink,
            ...(isActive('/period-tracker') ? styles.activeLink : {}),
          }}
        >
          Period Tracker
        </Link>
        <Link
          to="/ivf-tracker"
          style={{
            ...styles.navLink,
            ...(isActive('/ivf-tracker') ? styles.activeLink : {}),
          }}
        >
          IVF Tracker
        </Link>
        <Link
          to="/notifications"
          style={{
            ...styles.navLink,
            ...(isActive('/notifications') ? styles.activeLink : {}),
          }}
        >
          Notifications
        </Link>
        <Link
          to="/profile"
          style={{
            ...styles.navLink,
            ...(isActive('/profile') ? styles.activeLink : {}),
          }}
        >
          Profile
        </Link>
        <Link
          to="/doctor-consultation"
          style={{
            ...styles.navLink,
            ...(isActive('/doctor-consultation') ? styles.activeLink : {}),
          }}
        >
          Doctor Consultation
        </Link>
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
    transition: 'color 0.3s, background-color 0.3s',
    padding: '5px 10px',
    borderRadius: '5px',
  },
  activeLink: {
    backgroundColor: '#fff',
    color: '#ff8c00', // Highlighted style
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