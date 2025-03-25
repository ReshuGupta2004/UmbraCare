// client/src/SplashScreen.js
import React from 'react';

const SplashScreen = () => {
  return (
    <div style={styles.container}>
      <img src="/logo192.png" alt="UmbraCare Logo" style={styles.logo} /> {/* Updated path */}
      <h1 style={styles.title}>UmbraCare</h1>
      <div style={styles.loader}></div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#ff8c00',
  },
  logo: {
    width: '150px',
    height: '150px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '36px',
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: "'Poppins', sans-serif",
  },
  loader: {
    marginTop: '20px',
    width: '40px',
    height: '40px',
    border: '5px solid #fff',
    borderTop: '5px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

const keyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = keyframes;
document.head.appendChild(styleSheet);

export default SplashScreen;