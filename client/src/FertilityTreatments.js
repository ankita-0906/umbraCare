// import React from 'react';
// import { Link } from 'react-router-dom';

// const FertilityTreatments = () => {
//   return (
//     <div style={styles.container}>
//       <div style={styles.content}>
//         <h1 style={styles.mainHeading}>Latest Research on Fertility Treatments</h1>
        
//         <p style={styles.introText}>
//           Here are some more recent breakthroughs in reproductive health that could change the way we approach fertility treatments!
//         </p>

//         <div style={styles.section}>
//           <h2 style={styles.sectionTitle}>🧠 AI-Powered IVF: A Smarter Way to Choose Embryos</h2>
//           <p style={styles.sectionContent}>
//             One of the biggest game-changers in IVF (In Vitro Fertilization) is the use of Artificial Intelligence (AI) to select embryos with the highest chances of implantation and live birth. Traditionally, embryologists visually inspect embryos under a microscope, but AI models trained on thousands of IVF cases can now analyze embryo quality with remarkable accuracy.
//           </p>
//           <p style={styles.sectionContent}>
//             A 2024 study reported that AI-driven embryo selection has increased IVF success rates by up to 15%, offering renewed hope to couples struggling with infertility. Clinics using AI for embryo grading have found:
//           </p>
//           <ul style={styles.bulletList}>
//             <li>✅ Higher pregnancy rates due to better embryo selection.</li>
//             <li>✅ Reduced chances of miscarriage by avoiding embryos with genetic abnormalities.</li>
//             <li>✅ Faster IVF cycles, minimizing the emotional and financial toll of repeated attempts.</li>
//           </ul>
//           <a href="https://www.theivfwarrior.ca/blog/2024-trends-we-saw-in-the-fertility-space-breakthroughs-news-and-innovations?utm_source=chatgpt.com" style={styles.link} target="_blank" rel="noopener noreferrer">
//             🔗 Read the full study here
//           </a>
//         </div>

//         <div style={styles.section}>
//           <h2 style={styles.sectionTitle}>🟢 A Breakthrough in Egg Maturation for IVF & Egg Freezing</h2>
//           <p style={styles.sectionContent}>
//             For women undergoing IVF or egg freezing, one of the biggest challenges has been maturing eggs outside the body (in vitro). Normally, eggs must reach full maturity inside the ovaries before being retrieved, but not all eggs reach this stage in time—leading to lower success rates.
//           </p>
//           <p style={styles.sectionContent}>
//             In November 2024, researchers at Shinshu University, Japan, developed a groundbreaking technique that recreates the protective cell layer around immature eggs, allowing them to fully mature in the lab.
//           </p>
//           <h3 style={styles.subHeading}>🔬 What does this mean for fertility treatments?</h3>
//           <ul style={styles.bulletList}>
//             <li>✔ More usable eggs for IVF</li>
//             <li>✔ Higher chances of pregnancy per cycle</li>
//             <li>✔ Better egg preservation for women freezing their eggs at a younger age.</li>
//           </ul>
//           <a href="https://nypost.com/2024/11/11/health/new-method-could-increase-fertility-for-women-undergoing-ivf-egg-freezing/?utm_source=chatgpt.com" style={styles.link} target="_blank" rel="noopener noreferrer">
//             🔗 Read the full article here
//           </a>
//         </div>

//         <div style={styles.section}>
//           <h2 style={styles.sectionTitle}>👨‍🦱 Male Infertility: IVF is Closing the Gap</h2>
//           <p style={styles.sectionContent}>
//             For a long time, infertility has been largely seen as a women's health issue, but research now shows that male infertility is just as common. About 40-50% of infertility cases are due to male factors, such as low sperm count, poor motility, or abnormal sperm shape.
//           </p>
//           <p style={styles.sectionContent}>
//             A September 2024 Australian study found that IVF has now “leveled the playing field” for men with fertility issues. Using advanced sperm selection techniques, researchers discovered that:
//           </p>
//           <ul style={styles.bulletList}>
//             <li>✅ Men with low sperm count can still achieve the same pregnancy success rates as fertile men.</li>
//             <li>✅ IVF methods like ICSI (Intracytoplasmic Sperm Injection) allow even severely infertile men to father biological children.</li>
//             <li>✅ More advanced sperm testing can identify the healthiest sperm for use in treatments.</li>
//           </ul>
//           <a href="https://www.fertstertreports.org/article/S2666-3341%2824%2900140-5/fulltext?utm_source=chatgpt.com" style={styles.link} target="_blank" rel="noopener noreferrer">
//             🔗 Read the full study here
//           </a>
//         </div>

//         <div style={styles.section}>
//           <h2 style={styles.sectionTitle}>💖 Your Fertility, Your Future</h2>
//           <p style={styles.sectionContent}>
//             With fertility science evolving so rapidly, it’s more important than ever to stay informed, empowered, and proactive about your reproductive health. Whether you’re trying to conceive, exploring IVF, or just tracking your cycle, understanding the latest research can help you make the best decisions for your body and future.
//           </p>
//           <p style={styles.sectionContent}>
//             Stay tuned for more insights on maternal health, fertility, and period tracking right here! 🌸✨
//           </p>
//           <p style={styles.signature}>
//             Love & Care,<br />
//             Team UmbraCare
//           </p>
//         </div>

//         <div style={styles.backButtonContainer}>
//           <Link to="/newsletter">
//             <button style={styles.backButton}>Back to Newsletter</button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: '100vh',
//     fontFamily: "'Poppins', sans-serif",
//     padding: '20px',
//     paddingTop: '90px', // To account for the fixed navbar
//   },
//   content: {
//     width: '100%',
//     maxWidth: '1000px', // Matches AboutUs.js
//     padding: '30px',
//     backgroundColor: 'rgba(255, 255, 255, 0.95)',
//     borderRadius: '10px',
//     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//   },
//   mainHeading: {
//     fontSize: '36px',
//     color: '#ff8c00',
//     textAlign: 'center',
//     marginBottom: '30px',
//     fontWeight: '600',
//   },
//   introText: {
//     fontSize: '16px',
//     color: '#555',
//     textAlign: 'center',
//     marginBottom: '30px',
//     lineHeight: '1.6',
//   },
//   section: {
//     marginBottom: '30px',
//   },
//   sectionTitle: {
//     fontSize: '24px',
//     color: '#ff8c00',
//     marginBottom: '15px',
//     fontWeight: '600',
//   },
//   subHeading: {
//     fontSize: '20px',
//     color: '#ff8c00',
//     marginBottom: '15px',
//     fontWeight: '600',
//   },
//   sectionContent: {
//     fontSize: '16px',
//     color: '#555',
//     lineHeight: '1.6',
//     marginBottom: '15px',
//   },
//   bulletList: {
//     listStyleType: 'disc',
//     paddingLeft: '25px',
//     marginBottom: '20px',
//     color: '#555',
//     fontSize: '16px',
//     lineHeight: '1.6',
//   },
//   link: {
//     color: '#ff8c00',
//     textDecoration: 'none',
//     fontWeight: 'bold',
//   },
//   signature: {
//     fontSize: '16px',
//     color: '#ff8c00',
//     textAlign: 'center',
//     marginTop: '30px',
//     lineHeight: '1.5',
//     fontWeight: '600',
//   },
//   backButtonContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     marginTop: '40px',
//   },
//   backButton: {
//     backgroundColor: '#ff8c00',
//     color: 'white',
//     border: 'none',
//     padding: '12px 20px',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontSize: '16px',
//     fontWeight: 'bold',
//     transition: 'background-color 0.3s',
//   },
// };

// export default FertilityTreatments;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  },
  content: {
    width: '100%',
    maxWidth: '1000px', // Matches AboutUs.js
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
    color: '#ff8c00',
    marginBottom: '15px',
    fontWeight: '600',
  },
  subHeading: {
    fontSize: '20px',
    color: '#ff8c00',
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
    color: '#ff8c00',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  signature: {
    fontSize: '16px',
    color: '#ff8c00',
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
    backgroundColor: '#ff8c00',
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
  color: '#ff8c00',
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