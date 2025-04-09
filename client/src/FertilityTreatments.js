 
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideNavbar from './sidenavbar/sidenav';

const FertilityTreatments = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedNews = localStorage.getItem("fertilityNews");
    const storedArticleIndex = localStorage.getItem("selectedArticleIndex");

    if (storedNews && storedArticleIndex !== null) {
      const parsedArticles = JSON.parse(storedNews);
      const index = parseInt(storedArticleIndex, 10);

      setArticles(parsedArticles);
      setSelectedArticle(
        parsedArticles[index] && parsedArticles[index].fullContent
          ? parsedArticles[index]
          : parsedArticles[0] 
      );
      setLoading(false);
    } else {
      setLoading(true);
      const fetchNews = async () => {
        try {
          const response = await fetch(
            `https://newsapi.org/v2/everything?q=fertility+treatments&sortBy=publishedAt&language=en&apiKey=49d8202a37b24a62b7fd9d6fa7f6aac2`
          );
          if (!response.ok) throw new Error("Failed to fetch news");

          const data = await response.json();
          if (data.articles) {
            const topArticles = data.articles.slice(0, 3);
            setArticles(topArticles);
            setSelectedArticle(topArticles[0]); 
            localStorage.setItem("fertilityNews", JSON.stringify(topArticles));
            localStorage.setItem("selectedArticleIndex", "0");
          }
        } catch (error) {
          console.error("Error fetching news:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchNews();
    }
  }, []);

  return (
    <div style={styles.container}>
      <SideNavbar />
      <div style={styles.content}>
        <h1 style={styles.mainHeading}>Latest Research on Fertility Treatments</h1>
        <p style={styles.introText}>
          Stay informed about the newest advancements in reproductive health with these latest news articles.
        </p>

        <h2 style={styles.newsHeading}>📰 Latest Fertility Treatment News</h2>

        {loading ? (
          <p style={styles.loadingText}>Loading latest fertility news...</p>
        ) : selectedArticle ? (
          <div style={styles.newsArticle}>
            <h3 style={styles.newsTitle}>{selectedArticle.title}</h3>
            <p style={styles.newsContent}>
              {selectedArticle.fullContent || selectedArticle.description || "No additional information available."}
            </p>
            <a href={selectedArticle.url} style={styles.link} target="_blank" rel="noopener noreferrer">
              🔗 Read Full Article
            </a>
          </div>
        ) : (
          <p style={styles.errorText}>No fertility news available at the moment.</p>
        )}

        <div style={styles.backButtonContainer}>
          <button style={styles.backButton} onClick={() => navigate("/newsletter")}>
            Back to Newsletter
          </button>
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
    paddingTop: '90px', // To account for the fixed navbar
    backgroundColor: '#ff69b4',
  },
  content: {
   
    maxWidth: '1000px', // Matches AboutUs.js
    padding: '30px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: 'calc(100% - 250px)', /* Adjust width based on sidebar being open */
    marginLeft: '250px', /* Match the width of the open sidebar */
    transition: 'width 0.3s ease, margin-left 0.3s ease',  
    
  },
  mainHeading: {
    fontSize: '36px',
    color: '#ff69b4',
    textAlign: 'center',
    marginBottom: '30px',
    fontWeight: '600',
  },
  introText: {
    fontSize: '16px',
    color: '#555',
    textAlign: 'center',
    marginBottom: '30px',
    lineHeight: '1.6',
  },
  section: {
    marginBottom: '30px',
  },
  sectionTitle: {
    fontSize: '24px',
    color: '#ff69b4',
    marginBottom: '15px',
    fontWeight: '600',
  },
  subHeading: {
    fontSize: '20px',
    color: '#ff69b4',
    marginBottom: '15px',
    fontWeight: '600',
  },
  sectionContent: {
    fontSize: '16px',
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '15px',
  },
  bulletList: {
    listStyleType: 'disc',
    paddingLeft: '25px',
    marginBottom: '20px',
    color: '#555',
    fontSize: '16px',
    lineHeight: '1.6',
  },
  link: {
    color: '#ff69b4',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  signature: {
    fontSize: '16px',
    color: '#ff69b4',
    textAlign: 'center',
    marginTop: '30px',
    lineHeight: '1.5',
    fontWeight: '600',
  },
  backButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '40px',
  },
  backButton: {
    backgroundColor: '#ff69b4',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  // Add these to your styles object in FertilityTreatments.js
newsHeading: {
  fontSize: '24px',
  color: '#ff69b4',
  marginBottom: '20px',
  fontWeight: '600',
},
newsArticle: {
  backgroundColor: '#f9f9f9',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '20px',
},
newsTitle: {
  fontSize: '20px',
  color: '#333',
  marginBottom: '10px',
},
newsContent: {
  fontSize: '16px',
  color: '#555',
  marginBottom: '15px',
  lineHeight: '1.6',
},
loadingText: {
  textAlign: 'center',
  fontSize: '16px',
  color: '#666',
},
errorText: {
  textAlign: 'center',
  fontSize: '16px',
  color: '#ff0000',
},
};

export default FertilityTreatments;
// *fertilitytreatments.js*