import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
      console.log('Subscribed with email:', email);
    } else {
      alert('Please enter a valid email address');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.mainHeading}>Fertility Health Newsletter</h1>
        
        <div style={styles.articlesContainer}>
          <div style={styles.article}>
            <h2 style={styles.articleTitle}>Latest Research on Fertility Treatments</h2>
            <p style={styles.articleDate}>Published: June 15, 2023</p>
            <p style={styles.articleContent}>
              Recent studies have shown promising results in new IVF techniques that increase success rates by up to 25%. 
              Researchers at Stanford University have developed a new method for embryo selection that uses artificial intelligence 
              to identify the most viable embryos for implantation.
            </p>
            <Link to="/newsletter/fertility-treatments">
              <button style={styles.readMoreButton}>Read More</button>
            </Link>
          </div>
          
          <div style={styles.article}>
            <h2 style={styles.articleTitle}>Nutrition Tips for Pregnancy</h2>
            <p style={styles.articleDate}>Published: May 28, 2023</p>
            <p style={styles.articleContent}>
              Maintaining a balanced diet during pregnancy is crucial for both maternal and fetal health. 
              Experts recommend increasing intake of folate, iron, and omega-3 fatty acids. 
              This article explores easy meal plans and recipes to ensure you're getting all the nutrients you need.
            </p>
            <Link to="/newsletter/nutrition-tips">
              <button style={styles.readMoreButton}>Read More</button>
            </Link>
          </div>
          
          <div style={styles.article}>
            <h2 style={styles.articleTitle}>Understanding Your Menstrual Cycle</h2>
            <p style={styles.articleDate}>Published: April 10, 2023</p>
            <p style={styles.articleContent}>
              Tracking your menstrual cycle can provide valuable insights into your reproductive health. 
              This comprehensive guide explains the four phases of the menstrual cycle, 
              how to identify your fertile window, and what changes in your cycle might indicate.
            </p>
            <Link to="/newsletter/menstrual-cycle">
              <button style={styles.readMoreButton}>Read More</button>
            </Link>
          </div>
        </div>
        
        <div style={styles.subscriptionContainer}>
          <div style={styles.subscriptionBox}>
            <h2 style={styles.subscriptionHeading}>
              <FaEnvelope style={styles.subscriptionIcon} />
              Subscribe to Our Newsletter
            </h2>
            <p style={styles.subscriptionText}>
              Get the latest fertility health news, tips, and research delivered directly to your inbox.
            </p>
            
            {isSubscribed ? (
              <div style={styles.thankYouMessage}>
                <p>Thank you for subscribing!</p>
                <p>You'll receive our next newsletter soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={styles.subscriptionForm}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.emailInput}
                  required
                />
                <button type="submit" style={styles.subscribeButton}>
                  Subscribe <FaPaperPlane style={styles.buttonIcon} />
                </button>
              </form>
            )}
          </div>
        </div>
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
    padding: '20px',
    paddingTop: '90px',
  },
  content: {
    width: '100%',
    maxWidth: '1200px',
    padding: '30px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  mainHeading: {
    fontSize: '36px',
    color: '#ff8c00',
    textAlign: 'center',
    marginBottom: '30px',
    fontWeight: '600',
  },
  articlesContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '30px',
    marginBottom: '50px',
  },
  article: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    border: '1px solid #eee',
  },
  articleTitle: {
    fontSize: '20px',
    color: '#333',
    marginBottom: '10px',
  },
  articleDate: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '15px',
  },
  articleContent: {
    fontSize: '16px',
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  readMoreButton: {
    backgroundColor: '#ff8c00',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  },
  subscriptionContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
  },
  subscriptionBox: {
    backgroundColor: '#fff8e6',
    border: '2px solid #ff8c00',
    borderRadius: '10px',
    padding: '10px',
    width: '100%',
    maxWidth: '600px',
    textAlign: 'center',
  },
  subscriptionHeading: {
    fontSize: '24px',
    color: '#ff8c00',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subscriptionIcon: {
    marginRight: '10px',
  },
  subscriptionText: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '25px',
  },
  subscriptionForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  emailInput: {
    padding: '12px 15px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
    width: '90%',
  },
  subscribeButton: {
    backgroundColor: '#ff8c00',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s',
  },
  buttonIcon: {
    marginLeft: '10px',
  },
  thankYouMessage: {
    backgroundColor: '#e6f7e6',
    padding: '20px',
    borderRadius: '5px',
    color: '#2e7d32',
    fontSize: '16px',
  },
};

export default Newsletter;