import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBaby, FaCalendarAlt, FaFlask, FaUserMd } from 'react-icons/fa';
import Plot from 'react-plotly.js';
import axios from 'axios';
import ImageCarousel from './imgcarousel'
import  Component from "./dashboardbottom";

function list(start, end) {
  return Array.from({length: end - start + 1}, (v, k) => k + start);
}


const cycleData = {
  daysUntilPeriod: 6,
  currentCycle: 28,
  history: {
    '2024': [28, 26, 29, 27, 28, 26, 25, 28, 27, 29, 26, 28],
    '2025': [28, 26, 29, 27, 28] 
  }
};


// Function to fetch period prediction data from the backend
const fetchPredictionData = async () => {
  try {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/period-tracker/prediction/${userId}`, {
      headers: {
        'x-auth-token': token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching period prediction data:', error);
    return null;
  }
};

// Function to calculate days until next period
const calculateDaysUntilPeriod = (nextPeriodStart) => {
  if (!nextPeriodStart) return null;
  
  const today = new Date();
  const nextPeriod = new Date(nextPeriodStart);
  const diffTime = nextPeriod - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 0 ? diffDays : 0;
};



// Function to format prediction dates
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// Function to organize cycle length data by month and year
const organizeCycleLengthData = (cycleLengths) => {
  // This is a simplified version - in a real app, you would map actual dates to months
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;
  
  // Create placeholder data
  const result = {
    [lastYear.toString()]: [],
    [currentYear.toString()]: []
  };
  
  // Split the data between years (simplified approach)
  if (cycleLengths && cycleLengths.length > 0) {
    const midpoint = Math.floor(cycleLengths.length / 2);
    result[lastYear.toString()] = cycleLengths.slice(0, midpoint);
    result[currentYear.toString()] = cycleLengths.slice(midpoint);
  }
  
  return result;
};


const pregnancyData = {
  weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
  sizes: [0.0, 0.0, 0.01, 0.04, 0.13, 0.25, 0.51, 0.63, 0.9, 1.22, 
          1.61, 2.13, 2.91, 3.42, 3.98, 4.57, 5.12, 5.59, 6.02, 6.46, 
          10.51, 10.94, 11.38, 11.81, 13.62, 14.02, 14.41, 14.80, 15.2, 15.71, 
          16.18, 16.69, 17.20, 17.72, 18.19, 18.66, 19.13, 19.61, 19.96, 20.16],
  comparisons: [
    'Pinhead', 'Poppy seed', 'Sesame seed', 'Apple seed', 'Blueberry', 'Sweet pea', 
    'Kidney bean', 'Raspberry', 'Grape', 'Strawberry', 'Lime', 'Brussels sprout', 
    'Fig', 'Passport photo', 'Peach', 'Plum', 'Peach', 'Lemon', 'Avocado', 'Onion',
    'Pear', 'Orange', 'Bell pepper', 'Sweet potato', 'Banana', 'Mango', 'Grapefruit', 
    'Small eggplant', 'Carrot', 'Corn cob', 'Papaya', 'Cantaloupe', 'Large banana', 
    'Zucchini', 'Rutabaga', 'Head of lettuce', 'Cauliflower', 'Butternut squash',
    'Cabbage', 'Acorn squash', 'Butternut squash', 'Coconut', 'Pineapple', 
    'Honeydew melon', 'Mini watermelon', 'Small pumpkin', 'Pineapple', 
    'Romaine lettuce', 'Swiss chard', 'Large pumpkin', 'Newborn size', 'Full-term baby'
  ]
};

// Function to determine the current phase of the menstrual cycle
const getCurrentPhase = (dayOfCycle) => {
  if (dayOfCycle <= 5) return 'Menstrual Phase';
  if (dayOfCycle <= 11) return 'Follicular Phase';
  if (dayOfCycle <= 15) return 'Ovulation Phase';
  return 'Luteal Phase';
};

const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [predictionData, setPredictionData] = useState(null);
  const [daysUntilPeriod, setDaysUntilPeriod] = useState(cycleData.daysUntilPeriod);
  const [cycleHistory, setCycleHistory] = useState(cycleData.history);

  useEffect(() => {
    setIsVisible(true);

    // console.log(predictionData?.prediction?.currentDayOfCycle)
    
    // Fetch prediction data when component mounts
    const getPredictionData = async () => {
      const data = await fetchPredictionData();
      if (data) {
        setPredictionData(data);
        const daysUntil = calculateDaysUntilPeriod(data.prediction.nextPeriodStart);
        if (daysUntil !== null) {
          setDaysUntilPeriod(daysUntil);
        }
        
        // Update cycle history if available in the response
        if (data.cycleLengths) {
          const organizedData = organizeCycleLengthData(data.cycleLengths);
          setCycleHistory(organizedData);
        }
      }
    };
    
    getPredictionData();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.mainHeading}>Welcome to Umbracare</h1>
        <p style={styles.subHeading}>PREDICT.PLAN.PROSPER - SMARTER WOMEN'S HEALTH</p>
        
        {/* First Row: 3 Charts */}
        <div style={styles.graphRow}>
          {/* Cycle Length Analysis */}
          {/* <div style={styles.cardContainer}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Cycle Length Analysis</h3>
            </div>
            <div style={styles.graphCard}>
              <div style={styles.chartContainer}>
                <Plot
                  data={[
                    {
                      type: 'scatter',
                      x: Object.keys(cycleHistory['2024']),
                      y: cycleHistory['2024'].map((val, i) => isVisible ? val : 20),
                      name: '2024',
                      line: { color: '#FFAA80', width: 2, shape: 'spline', smoothing: 1.3 },
                      marker: { size: 6 }
                    },
                    {
                      type: 'scatter',
                      x: Object.keys(cycleHistory['2025']),
                      y: cycleHistory['2025'].map((val, i) => isVisible ? val : 20),
                      name: '2025',
                      line: { color: '#FF8C00', width: 3, shape: 'spline', smoothing: 1.3 },
                      marker: { size: 8 }
                    }
                  ]}
                  layout={{
                    width: 350,
                    height: 250,
                    margin: { t: 30, l: 50, r: 20, b: 50 },
                    yaxis: { title: 'Days', range: [20, 35], gridcolor: '#f5f5f5', titlefont: { size: 10 } },
                    xaxis: { title: 'Month', titlefont: { size: 10 }, automargin: true },
                    legend: { orientation: 'h', y: -0.3, font: { size: 10 } },
                    plot_bgcolor: '#FFFBF8',
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    transition: { duration: 800, easing: 'cubic-out' }
                  }}
                  config={{ displayModeBar: false, staticPlot: false }}
                />
              </div>
              <div style={styles.metricsGrid}>
                <div style={styles.metricColumn}>
                  <div style={styles.metricHeader}>Shortest</div>
                  <div style={styles.metricValue}>
                    {predictionData?.statistics?.shortestCycle || '0 days'}
                  </div>
                </div>
                <div style={styles.metricColumn}>
                  <div style={styles.metricHeader}>Average</div>
                  <div style={styles.metricValue}>
                    {predictionData?.statistics?.averageCycle || '0 days'}
                  </div>
                </div>
                <div style={styles.metricColumn}>
                  <div style={styles.metricHeader}>Longest</div>
                  <div style={styles.metricValue}>
                    {predictionData?.statistics?.longestCycle || '0 days'}
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Next Period Prediction */}
          <div style={styles.cardContainer}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Next Period Prediction</h3>
            </div>
            <div style={styles.graphCard}>
              <div style={styles.chartContainer}>
                <Plot
                  data={[{
                    type: 'indicator',
                    mode: 'number+gauge+delta',
                    value: isVisible ? daysUntilPeriod : predictionData?.prediction?.daysUntilNextPeriod || 0,
                    delta: { reference: 30, decreasing: { color: '#FF8C00' }, font: { size: 12 } },
                    number: { font: { size: 22, color: '#FF8C00' }, suffix: ' days' },
                    gauge: {
                      axis: { range: [0, 30], tickfont: { size: 10 } },
                      bar: { color: '#FF8C00', thickness: 0.2, line: { color: isVisible ? '#FF8C00' : 'transparent', width: 2 } },
                      bgcolor: '#FFFBF8',
                      steps: [
                        { range: [0, 10], color: '#FFF5EB' },
                        { range: [10, 20], color: '#FFE4C4' },
                        { range: [20, 30], color: '#FFD4A3' }
                      ],
                      threshold: { line: { color: 'red', width: 2 }, thickness: 0.2, value: isVisible ? daysUntilPeriod : predictionData?.prediction?.daysUntilNextPeriod || 0 }
                    }
                  }]}
                  layout={{
                    width: 350,
                    height: 250,
                    margin: { t: 30, l: 30, r: 30, b: 30 },
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    transition: { duration: 1000, easing: 'elastic-out' }
                  }}
                  config={{ displayModeBar: false, staticPlot: false }}
                />
              </div>
              <div style={styles.predictionGrid}>
                <div style={styles.predictionColumn}>
                  <div style={styles.predictionHeader}>Expected Start</div>
                  <div style={styles.predictionDate}>
                    {predictionData?.prediction?.nextPeriodStart 
                      ? formatDate(predictionData.prediction.nextPeriodStart)
                      : new Date(new Date().getTime() + daysUntilPeriod * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
                <div style={styles.predictionColumn}>
                  <div style={styles.predictionHeader}>Expected End</div>
                  <div style={styles.predictionDate}>
                    {predictionData?.prediction?.nextPeriodEnd
                      ? formatDate(predictionData.prediction.nextPeriodEnd)
                      : new Date(new Date().getTime() + (daysUntilPeriod + 5) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Menstrual Cycle Phases */}
          <div style={styles.cardContainer}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Menstrual Cycle Phases</h3>
              {predictionData?.prediction?.currentDayOfCycle && (
                <div style={styles.currentDayBadge}>
                  Day {predictionData.prediction.currentDayOfCycle}
                </div>
              )}
            </div>
            <div style={styles.graphCard}>
              <Plot
                data={[{
                  type: "sunburst",
                  labels: ["Cycle", "Menstrual", "Follicular", "Ovulation", "Luteal", "Day 1-5", "Day 6-11", "Day 12-15", "Day 15-17", "Day 18-28"],
                  parents: ["", "Cycle", "Cycle", "Cycle", "Cycle", "Menstrual", "Follicular", "Follicular", "Ovulation", "Luteal"],
                  marker: {
                    colors: ['#FFF5EB', '#FFC299', '#FFD4A3', '#FFAA80', '#FF8C00', '#FFE0CC', '#FFE4C4', '#FFD4A3', '#FFAA80', '#FF8C00'],
                    line: { width: 1, color: '#FF8C00' }
                  },
                  branchvalues: 'total',
                  textinfo: 'label',
                  hoverinfo: 'label+percent',
                  textfont: { size: 12, color: '#333' },
                  insidetextorientation: 'radial'
                }]}
                layout={{
                  width: 350,
                  height: 250,
                  margin: {t: 0, b: 0, l: 0, r: 0},
                  paper_bgcolor: 'rgba(0,0,0,0)',
                  transition: { duration: 800, easing: 'cubic-out' },
                  annotations: predictionData?.prediction?.currentDayOfCycle ? [{
                    text: `Current Day: ${predictionData.prediction.currentDayOfCycle}`,
                    showarrow: false,
                    x: 0.5,
                    y: 1.1,
                    font: {
                      family: 'Poppins',
                      size: 14,
                      color: '#FF8C00',
                      weight: 'bold'
                    }
                  }] : []
                }}
                config={{ displayModeBar: false, responsive: true }}
              />
              
              {predictionData?.prediction?.currentDayOfCycle && (
                <div style={styles.phaseIndicator}>
                  {getCurrentPhase(predictionData.prediction.currentDayOfCycle)}
                </div>
              )}
            </div>
          </div>

           {/* slider */}
        <div style={styles.cardContainer}>
          <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Information</h3>
            </div>
          <ImageCarousel/>

        </div>
        </div>
        
       
        {/* Second Row: 2 Charts */}
             <div style={styles.graphRow}>
                
          </div>
          <div style={{ ...styles.buttonGrid,marginleft: '20px',}}>
                <Component/>
          </div>
        <div style={styles.buttonGrid}>
          <Link to="/pregnancy-postpartum-tracker" style={styles.gridButton}>
            <FaBaby style={styles.icon} />
            <span>Pregnancy & Postpartum Tracker</span>
          </Link>
          <Link to="/period-tracker" style={styles.gridButton}>
            <FaCalendarAlt style={styles.icon} />
            <span>Period Tracker</span>
          </Link>
          <Link to="/ivf-tracker" style={styles.gridButton}>
            <FaFlask style={styles.icon} />
            <span>IVF Tracker</span>
          </Link>
          <Link to="/doctor-info" style={styles.gridButton}>
            <FaUserMd style={styles.icon} />
            <span>Doctor Info</span>
          </Link>
        </div>
        
        {/* </div> */}
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
    paddingTop: '50px',
  },
  content: {
    padding: '40px',
    borderRadius: '10px',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '1400px',
  },
  mainHeading: {
    fontSize: '38px',
    color: 'black',
    marginBottom: '4px',
    fontWeight: '600',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  graphRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto 30px',
    flexWrap: 'wrap',
    opacity: isVisible => isVisible ? 1 : 0,
    transform: isVisible => isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'all 0.6s ease-out'
  },
  cardContainer: {
    flex: '1 1 30%',
    minWidth: '300px',
    maxWidth: '400px',
    border: '1px solid #FF8C00',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(255,140,0,0.1)',
    willChange: 'transform, opacity',
    backgroundColor: '#FFFBF8',
    transform: isVisible => isVisible ? 'scale(1)' : 'scale(0.95)',
    transition: 'transform 0.4s ease-out 0.2s'
  },
  cardHeader: {
    backgroundColor: '#FF8C00',
    padding: '12px 15px',
    color: 'white',
    textAlign: 'center',
    borderBottom: '1px solid #FFD4A3'
  },
  cardTitle: {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: '600'
  },
  graphCard: {
    padding: '15px',
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  chartContainer: {
    height: '250px',
    marginBottom: '15px',
    width: '100%'
  },
  metricsGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
    borderTop: '1px dashed #FFD4A3',
    paddingTop: '15px'
  },
  metricColumn: {
    textAlign: 'center',
    padding: '8px 12px',
    borderRadius: '6px',
    backgroundColor: '#FFF5EB',
    flex: 1,
    margin: '0 5px',
    border: '1px solid #FFD4A3',
    transition: 'all 0.3s ease'
  },
  metricHeader: {
    fontSize: '12px',
    color: '#666',
    fontWeight: '600',
    marginBottom: '5px'
  },
  metricValue: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#FF8C00'
  },
  predictionGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
    borderTop: '1px dashed #FFD4A3',
    paddingTop: '15px'
  },
  predictionColumn: {
    textAlign: 'center',
    padding: '8px 12px',
    borderRadius: '6px',
    backgroundColor: '#FFF5EB',
    flex: 1,
    margin: '0 5px',
    border: '1px solid #FFD4A3',
    transition: 'all 0.3s ease'
  },
  predictionHeader: {
    fontSize: '12px',
    color: '#666',
    fontWeight: '600',
    marginBottom: '5px'
  },
  predictionDate: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#FF8C00'
  },
  buttonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '30px',
    marginBottom: '30px'
  },
  gridButton: {
    backgroundColor: '#ff8c00',
    color: '#fff',
    padding: '15px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '220px',
  },
  icon: {
    fontSize: '40px',
    marginBottom: '15px',
  },
  newsletterBox: {
    backgroundColor: 'rgb(255, 140, 0)',
    borderRadius: '8px',
    padding: '7px',
    height: '100%',
    width: '300px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  newsletterHeading: {
    color: 'black',
    fontSize: '15px',
  }
};

export default Dashboard;