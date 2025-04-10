import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaBaby, FaCalendarAlt, FaFlask, FaUserMd } from 'react-icons/fa';
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js-dist-min';
import axios from 'axios';
import { FaCheck, FaPlus } from 'react-icons/fa';
import * as d3 from 'd3';
import {motion} from 'framer-motion';

function list(start, end) {
  return Array.from({ length: end - start + 1 }, (v, k) => k + start);
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
    const userId = localStorage.getItem('userId');
    const response = await axios.get(`http://localhost:5000/api/period-tracker/prediction/${userId}`, {
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
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;
  
  const result = {
    [lastYear.toString()]: [],
    [currentYear.toString()]: []
  };
  
  if (cycleLengths && cycleLengths.length > 0) {
    const midpoint = Math.floor(cycleLengths.length / 2);
    result[lastYear.toString()] = cycleLengths.slice(0, midpoint);
    result[currentYear.toString()] = cycleLengths.slice(midpoint);
  }
  
  return result;
};

// Function for risk factor and insights and Pregnancy Journey
const getRiskFactor = async () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const response = await axios.get(`http://localhost:5000/api/pregnancy/latest/${userId}`, {
    headers: {
      'x-auth-token': token
    }
  });
  console.log(response.data);
  return response.data;
};

// Heart rate and blood pressure and blood sugar
const allParameter = async () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const response = await axios.get(`http://localhost:5000/api/pregnancy/allparameter/${userId}`, {
    headers: {
      'x-auth-token': token
    }
  });
  console.log(response.data);
  return response.data;
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
  const svgRef = useRef();
  const [currentWeek, setCurrentWeek] = useState(12);
  const [riskFactor, setRiskFactor] = useState(null);
  const [healthData, setHealthData] = useState([]);
  const [week, setWeek] = useState(null);
  const [pregnancyData, setPregnancyData] = useState(null);
  const [pregnancyInsights, setPregnancyInsights] = useState(null);

  // Function to process health data for graphs
  const processHealthData = (data) => {
    if (!data || !data.vitalData || !Array.isArray(data.vitalData)) return null;
    
    const sortedData = [...data.vitalData].sort((a, b) => new Date(a.date) - new Date(b.date));
    const last7Entries = sortedData.slice(-7);
    
    return {
      dates: last7Entries.map(entry => new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' })),
      heartRates: last7Entries.map(entry => entry.heartRate),
      bloodSugars: last7Entries.map(entry => entry.bloodSugar),
      bloodPressures: last7Entries.map(entry => entry.bloodPressure.systolic),
      diastolicPressures: last7Entries.map(entry => entry.bloodPressure.diastolic),
      stats: data.stats || {
        heartRate: { lowest: 43, highest: 80 },
        bloodSugar: { lowest: 44, highest: 90 },
        bloodPressure: {
          systolic: { lowest: 123, highest: 444 },
          diastolic: { lowest: 44, highest: 90 }
        }
      }
    };
  };

  useEffect(() => {
    setIsVisible(true);
    
    const getPredictionData = async () => {
      const data = await fetchPredictionData();
      const riskFactor = await getRiskFactor();
      const allParameters = await allParameter();
      
      if (allParameters) {
        setHealthData(processHealthData(allParameters));
      }
      
      if (data) {
        setPredictionData(data);
        const daysUntil = calculateDaysUntilPeriod(data.prediction.nextPeriodStart);
        if (daysUntil !== null) {
          setDaysUntilPeriod(daysUntil);
        }
        
        if (data.cycleLengths) {
          const organizedData = organizeCycleLengthData(data.cycleLengths);
          setCycleHistory(organizedData);
        }
      }
      if (riskFactor) {
        setRiskFactor(riskFactor);
        setWeek(riskFactor.week);
        
        if (riskFactor.riskFactor) {
          setPregnancyData(riskFactor.riskFactor);
        }
        if (riskFactor.pregnancyData.insights) {
          setPregnancyInsights(riskFactor.pregnancyData.insights);
        }
      }
    };
    
    getPredictionData();

    const width = 350;
    const height = 250;
    const radius = 80;
    const progress = currentWeek / 40;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    const g = svg.append("g")
      .attr("transform", `translate(${width/2}, ${height/2})`);
    
    g.append("circle")
      .attr("r", radius + 25)
      .attr("fill", "rgba(184, 81, 112, 0.03)")
      .attr("stroke", "rgba(184, 81, 112, 0.08)")
      .attr("stroke-width", 1);
    
    g.append("path")
      .datum({ endAngle: 2 * Math.PI })
      .attr("d", d3.arc()
        .innerRadius(radius - 15)
        .outerRadius(radius)
        .startAngle(0))
      .attr("fill", "#FFF5F5")
      .attr("stroke", "#FFD931")
      .attr("stroke-width", 1);
    
    const gradient = svg.append("defs")
      .append("linearGradient")
      .attr("id", "progress-gradient")
      .attr("x1", "0%").attr("y1", "0%")
      .attr("x2", "100%").attr("y2", "100%");
    
    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#E891AD");
    
    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#B85170");
    
    g.append("path")
      .datum({ endAngle: 2 * Math.PI * progress })
      .attr("d", d3.arc()
        .innerRadius(radius - 15)
        .outerRadius(radius)
        .startAngle(0))
      .attr("fill", "url(#progress-gradient)")
      .attr("stroke", "#B85170")
      .attr("stroke-width", 1.5);
    
    const trimesterAngles = [0, 2*Math.PI/3, 4*Math.PI/3];
    trimesterAngles.forEach((angle, i) => {
      g.append("line")
        .attr("x1", (radius - 10) * Math.cos(angle))
        .attr("y1", (radius - 10) * Math.sin(angle))
        .attr("x2", (radius + 20) * Math.cos(angle))
        .attr("y2", (radius + 20) * Math.sin(angle))
        .attr("stroke", "#B85170")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4,2")
        .attr("opacity", 0.7);
      
      g.append("text")
        .attr("x", (radius + 35) * Math.cos(angle))
        .attr("y", (radius + 35) * Math.sin(angle))
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .style("font-size", "11px")
        .style("fill", "#B85170")
        .style("font-weight", "600")
        .style("opacity", 0.9)
        .text(`Trimester ${i+1}`);
    });
    
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "40")
      .style("font-size", "13px")
      .style("fill", "#B85170")
      .style("font-weight", "bold")
      .style("text-shadow", "0 1px 2px rgba(255,255,255,0.8)")
      .text(() => {
        if (currentWeek <= 4) return "Zygote Stage";
        if (currentWeek <= 8) return "Embryonic Stage";
        if (currentWeek <= 12) return "Fetal Stage";
        if (currentWeek <= 16) return "Developing Features";
        if (currentWeek <= 20) return "Movement Begins";
        if (currentWeek <= 24) return "Viable if Born";
        if (currentWeek <= 28) return "Third Trimester";
        if (currentWeek <= 32) return "Rapid Growth";
        if (currentWeek <= 36) return "Final Preparations";
        return "Full Term";
      });
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div 
          style={{
            ...styles.headerContainer,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'opacity 0.6s, transform 0.6s'
          }}
        >
          <h1 style={styles.mainHeading}>Welcome to Umbracare</h1>
          <p style={styles.subHeading}>PREDICT. PLAN. PROSPER - SMARTER WOMEN'S HEALTH</p>
          <div style={styles.divider}></div>
        </div> 

        {/* First Row: 3 Charts */}
        <div style={styles.graphRow}>
          {/* Cycle Length Analysis */}
          <div style={styles.cardContainer}>
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
                      line: { color: '#B85170', width: 2, shape: 'spline', smoothing: 1.3 }, // Pink for 2024
                      marker: { size: 6 }
                    },
                    {
                      type: 'scatter',
                      x: Object.keys(cycleHistory['2025']),
                      y: cycleHistory['2025'].map((val, i) => isVisible ? val : 20),
                      name: '2025',
                      line: { color: '#A94064', width: 3, shape: 'spline', smoothing: 1.3 }, // Light purple for 2025
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
                    plot_bgcolor: '#FFF5F5',
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
          </div>

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
                    delta: { reference: 30, decreasing: { color: '#B85170' }, font: { size: 12 } },
                    number: { font: { size: 22, color: '#B85170' }, suffix: ' days' },
                    gauge: {
                      axis: { range: [0, 30], tickfont: { size: 10 } },
                      bar: { color: '#B85170', thickness: 0.2, line: { color: isVisible ? '#B85170' : 'transparent', width: 2 } },
                      bgcolor: '#FFF5F5',
                      steps: [
                        { range: [0, 10], color: '#FFF5F5' },
                        { range: [10, 20], color: '#FFD9E1' },
                        { range: [20, 30], color: '#B85170' }
                      ],
                      threshold: { line: { color: '#B85170', width: 2 }, thickness: 0.2, value: isVisible ? daysUntilPeriod : predictionData?.prediction?.daysUntilNextPeriod || 0 }
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
                    colors: ['#FFF5F5', '#B85170', '#FFD9E1', '#FFCAD3', '#B85170', '#FFE6EB', '#FFD9E1', '#FFCAD3', '#B85170', '#B85170'],
                    line: { width: 1, color: '#B85170' }
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
                      color: '#B85170',
                      weight: 'bold'
                    }
                  }] : []
                }}
                config={{ displayModeBar: false, responsive: true }}
              />
              
              {predictionData?.prediction?.currentDayOfCycle && (
                <div style={styles.phaseIndicators} >
                <div style={styles.phaseIndicator}>
                  {getCurrentPhase(predictionData.prediction.currentDayOfCycle)}
                </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Second Row: 3 Charts */}
        <div style={styles.graphRow}>
          
          {/* Pregnancy Tracker */}
          <div style={styles.cardContainer}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Pregnancy Tracker</h3>
            </div>
            <div style={styles.graphCard}>
              <div style={{...styles.graphCard, textAlign: 'center', position: 'relative'}}>
                <svg 
                  ref={svgRef} 
                  width={350} 
                  height={250}
                  style={{ display: 'block', margin: '0 auto' }}
                ></svg>
                
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: `${15 + (currentWeek * 1.2)}px`,
                  height: `${15 + (currentWeek * 1.2)}px`,
                  backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjQjg1MTcwIiBkPSJNMjU2IDQ0OGMtMTA2IDAtMTkyLTg2LTE5Mi0xOTJTMTUwIDY0IDI1NiA2NHMxOTIgODYgMTkyIDE5Mi04NiAxOTItMTkyIDE5MnpNMTI4IDI3MmMwLTM1LjMgMjguNy02NCA2NC02NHM2NCAyOC43IDY0IDY0LTI4LjcgNjQtNjQgNjQtNjQtMjguNy02NC02NHptMTI4IDBjMC0zNS4zIDI4LjctNjQgNjQtNjRzNjQgMjguNyA2NCA2NC0yOC43IDY0LTY0IDY0LTY0LTI4LjctNjQtNjR6Ii8+PC9zdmc+")',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  opacity: 0.8,
                  transition: 'all 0.5s ease',
                  zIndex: 10
                }}></div>
                
                <div style={{
                  position: 'absolute',
                  top: '20%',
                  right: '10%',
                  backgroundColor: 'white',
                  color: '#B85170',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '22px',
                  boxShadow: '0 4px 12px rgba(184, 81, 112, 0.3)',
                  border: '3px solid #B85170',
                  zIndex: 20
                }}>
                  {week}
                </div>
                <div  style={styles.phaseIndicators} >
                <p style={{ 
                  marginTop: '15px',
                  color: '#666',///
                  fontSize: '14px',
                  fontWeight: '500',
                  padding: '0 20px',
                  position: 'relative',
                  zIndex: 20,
                  backgroundColor: 'rgba(255,233,237,0.7)',
                  width: '350px',
                  height: '25px',
                 

                  borderRadius: '8px',
                  // margin: '15px auto 0',
                  maxWidth: '90%'
                }}>
                  {pregnancyInsights}
                </p>

                </div>

              </div>
            </div>
          </div>

          {/* Health Parameters Card */}
          <div style={{ ...styles.cardContainer, flex: '1 1 45%', maxWidth: '750px' }}>
  <div style={styles.cardHeader}>
    <h3 style={styles.cardTitle}>Health Parameters</h3>
  </div>
  <div style={styles.graphCard}>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      height: '100%',
      gap: '10px'
    }}>
      
      {/* Heart Rate */}
<div style={{
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRight: '1px solid #FFD4A3',
  padding: '0 5px'
}}>
  <div style={{
    fontSize: '14px',
    fontWeight: '600',
    color: '#B85170', // Changed color to #B85170 for "Heart Rate" text
    marginBottom: '10px'
  }}>Heart Rate</div>
  <div style={{ width: '100%', height: '120px' }}>
    <Plot
      data={[{
        type: 'scatter',
        mode: 'lines+markers',
        x: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
        y: healthData?.heartRates || [72, 85, 78, 90, 82, 76, 68],
        line: { 
          color: '#FF6B8B', // Graph line color remains #FF6B8B
          width: 2, 
          shape: 'spline',
          smoothing: 1.3 
        },
        marker: {
          size: 6,
          color: '#FF6B8B' // Marker color remains #FF6B8B
        },
        fill: 'tozeroy',
        fillcolor: 'rgba(255, 107, 139, 0.1)' // Fill color remains based on #FF6B8B
      }]}
      layout={{
        width: 120,
        height: 120,
        margin: { t: 10, l: 30, r: 10, b: 30 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        xaxis: { 
          showgrid: false, 
          zeroline: false,
          tickfont: { size: 8 }
        },
        yaxis: { 
          showgrid: false, 
          zeroline: false,
          tickfont: { size: 8 },
          range: [healthData?.stats?.heartRate?.lowest || 60, healthData?.stats?.heartRate?.highest || 100]
        },
        showlegend: false,
        hovermode: 'closest',
        hoverlabel: {
          bgcolor: '#FF6B8B', // Hover label background remains #FF6B8B
          font: { color: 'white' }
        }
      }}
      config={{ displayModeBar: false }}
    />
  </div>
  <div style={{
    textAlign: 'center',
    marginTop: '5px',
    backgroundColor: '#FFF5F5', // Light background like in Predicted Pregnancy Risk
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #B85170', // Matching border color
    width: '80%' ,
    boxShadow:'0 2px 8px rgba(184,81,112,0.2)'///
  }}>
    <div style={{ fontSize: '12px' }}>
      <span style={{ color: 'black', fontWeight: '600' }}>Lowest:</span> 
      <span style={{ color: '#B85170', marginLeft: '5px' }}>{healthData?.stats?.heartRate?.lowest || 68} bpm</span>
    </div>
    <div style={{ fontSize: '12px', marginTop: '5px' }}>
      <span style={{ color: 'black', fontWeight: '600' }}>Highest:</span> 
      <span style={{ color: '#B85170', marginLeft: '5px' }}>{healthData?.stats?.heartRate?.highest || 90} bpm</span>
    </div>
  </div>
</div>

     {/* Blood Pressure */}
<div style={{
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRight: '1px solid #FFD4A3',
  padding: '0 5px'
}}>
  <div style={{
    fontSize: '14px',
    fontWeight: '600',
    color: '#B85170', // Keeping "Blood Pressure" text color as is (you didn’t specify a change)
    marginBottom: '10px'
  }}>Blood Pressure</div>
  <div style={{ width: '100%', height: '120px' }}>
    <Plot
      data={[
        {
          type: 'scatter',
          mode: 'lines+markers',
          x: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
          y: healthData?.bloodPressures || [115, 125, 118, 130, 122, 120, 110],
          name: 'Systolic',
          line: { 
            color: '#F477B1', // Changed to #F477B1
            width: 2, 
            shape: 'spline',
            smoothing: 1.3 
          },
          marker: {
            size: 6,
            color: '#F477B1' // Changed to #F477B1
          },
          fill: 'tozeroy',
          fillcolor: 'rgba(244, 119, 177, 0.1)' // Changed fill color to match #F477B1 with opacity
        },
        {
          type: 'scatter',
          mode: 'lines+markers',
          x: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
          y: healthData?.diastolicPressures || [70, 75, 72, 80, 78, 75, 70],
          name: 'Diastolic',
          line: { 
            color: '#F477B1', // Changed to #F477B1 (same as Systolic for consistency)
            width: 2, 
            shape: 'spline',
            smoothing: 1.3 
          },
          marker: {
            size: 6,
            color: '#F477B1' // Changed to #F477B1
          },
          fill: 'tozeroy',
          fillcolor: 'rgba(244, 119, 177, 0.1)' // Changed fill color to match #F477B1 with opacity
        }
      ]}
      layout={{
        width: 120,
        height: 120,
        margin: { t: 10, l: 30, r: 10, b: 30 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        xaxis: { 
          showgrid: false, 
          zeroline: false,
          tickfont: { size: 8 }
        },
        yaxis: { 
          showgrid: false, 
          zeroline: false,
          tickfont: { size: 8 },
          range: [
            Math.min(...(healthData?.diastolicPressures || [60])), 
            Math.max(...(healthData?.bloodPressures || [140]))
          ]
        },
        showlegend: false,
        hovermode: 'closest',
        hoverlabel: {
          bgcolor: '#F477B1', // Changed hover label background to #F477B1
          font: { color: 'white' }
        }
      }}
      config={{ displayModeBar: false }}
    />
  </div>
  <div style={{ 
          textAlign: 'center',
          marginTop: '5px',
          backgroundColor: '#FFF5F5',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #B85170',
          width: '80%',
          boxShadow: '0 2px 8px rgba(184, 81, 112, 0.2)'
        }}>
          <div style={{ fontSize: '12px' }}>
            <span style={{ color: 'black', fontWeight: '600' }}>Systolic:</span> 
            <span style={{ color: '#B85170', marginLeft: '5px' }}>{healthData?.stats?.bloodPressure?.systolic?.lowest || 110} - {healthData?.stats?.bloodPressure?.systolic?.highest || 130} mmHg</span>
          </div>
          <div style={{ fontSize: '12px', marginTop: '5px' }}>
            <span style={{ color: 'black', fontWeight: '600' }}>Diastolic:</span> 
            <span style={{ color: '#B85170', marginLeft: '5px' }}>{healthData?.stats?.bloodPressure?.diastolic?.lowest || 70} - {healthData?.stats?.bloodPressure?.diastolic?.highest || 90} mmHg</span>
          </div>
        </div>
      </div>



      

  {/* Blood Sugar */}
<div style={{
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 5px'
}}>
  <div style={{
    fontSize: '14px',
    fontWeight: '600',
    color: '#B85170', // Changed "Blood Sugar" text color to #B85170
    marginBottom: '10px'
  }}>Blood Sugar</div>
  <div style={{ width: '100%', height: '120px' }}>
    <Plot
      data={[{
        type: 'scatter',
        mode: 'lines+markers',
        x: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
        y: healthData?.bloodSugars || [90, 110, 95, 105, 100, 92, 88],
        line: { 
          color: '#FF6B8B', // Changed graph line color to #FF6B8B
          width: 2, 
          shape: 'spline',
          smoothing: 1.3 
        },
        marker: {
          size: 6,
          color: '#FF6B8B' // Changed marker color to #FF6B8B
        },
        fill: 'tozeroy',
        fillcolor: 'rgba(255, 107, 139, 0.1)' // Changed fill color to match #FF6B8B with opacity
      }]}
      layout={{
        width: 120,
        height: 120,
        margin: { t: 10, l: 30, r: 10, b: 30 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        xaxis: { 
          showgrid: false, 
          zeroline: false,
          tickfont: { size: 8 }
        },
        yaxis: { 
          showgrid: false, 
          zeroline: false,
          tickfont: { size: 8 },
          range: [healthData?.stats?.bloodSugar?.lowest || 80, healthData?.stats?.bloodSugar?.highest || 120]
        },
        showlegend: false,
        hovermode: 'closest',
        hoverlabel: {
          bgcolor: '#FF6B8B', // Changed hover label background to #FF6B8B
          font: { color: 'white' }
        }
      }}
      config={{ displayModeBar: false }}
    />
  </div>
<div style={{ 
    textAlign: 'center',
    marginTop: '5px',
    backgroundColor: '#FFF5F5',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #B85170',
    width: '80%',
    boxShadow: '0 2px 8px rgba(184, 81, 112, 0.2)'
  }}>
    <div style={{ fontSize: '12px' }}>
      <span style={{ color: 'black', fontWeight: '600' }}>Lowest:</span> 
      <span style={{ color: '#B85170', marginLeft: '5px' }}>{healthData?.stats?.bloodSugar?.lowest || 88} mg/dL</span>
    </div>
    <div style={{ fontSize: '12px', marginTop: '5px' }}>
      <span style={{ color: 'black', fontWeight: '600' }}>Highest:</span> 
      <span style={{ color: '#B85170', marginLeft: '5px' }}>{healthData?.stats?.bloodSugar?.highest || 110} mg/dL</span>
    </div>
  </div>



</div> 
</div>
  </div>
</div>


        </div>
          {/* Predicted Pregnancy Risk */}
          <div className="image-container" style={{ display: 'flex', gap: '50px', justifyContent: 'end', alignItems: 'center', maxWidth: '500px' , position: 'relative', right: '130px' , paddingBottom: '20px'}}>
            <div style={styles.cardContainer}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Predicted Pregnancy Risk</h3>
              </div>
              <div style={{ ...styles.graphCard, textAlign: 'center', padding: '20px' }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%'
                }}>
                  <div style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    backgroundColor: '#FF7E79',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
                    border: '4px solid #FFB6C1'
                  }}>
                    {pregnancyData ? pregnancyData.split(': ')[1] : 'Mid Risk'}
                  </div>
                  <div style={{
                    backgroundColor: '#FFF5F5',////
                    padding: '10px 15px',
                    borderRadius: '8px',
                    border: '1px solid #B85170',///
                    width: '80%',
                    boxShadow: '0 2px 8px rgba(184, 81, 112, 0.2)'///
                    
                  }}>
                    <div style={{
                      fontSize: '14px',
                      color: '#B85170',//////
                      fontWeight: '600',
                      textAlign: 'center'
                    }}>
                      Last prediction: Week {week}
                    </div>
                  </div>
                  <div style={{
                    marginTop: '20px',
                    fontSize: '13px',
                    color: '#666',
                    lineHeight: '1.5',
                    maxWidth: '80%'
                  }}>
                    Based on your health parameters and history, your <strong>{pregnancyData ? pregnancyData.split(': ')[1] : 'mid risk'}</strong>.
                  </div>
                </div>
              </div>
            </div>
            <div className="image-container" style={{ width: '100%', maxWidth: '350px', margin: '0 auto' }}>
              <img src="/uuu.jpg" alt="Pregnancy Risk" style={{ width: '750px', height: 'auto', borderRadius: '8px' , position: 'relative', left: '40px' }} />
            </div>
          </div>

        {/* <div style={styles.buttonGrid}>
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
        </div> */}
        
        <div style={styles.newsletterBox}>
          <Link to="/newsletter" style={styles.newsletterHeading}>Subscribe to Our Newsletter</Link>
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
    boxSizing: 'border-box',
    paddingTop: '50px',
    backgroundImage: 'url(/background.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    zIndex: 1,
    '::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(253, 232, 233, 0.7)',
      zIndex: -1,
    }
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
    color: '#B85170',
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
    margin: '0 0 30px',
    flexWrap: 'wrap',
    opacity: isVisible => isVisible ? 1 : 0,
    transform: isVisible => isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'all 0.6s ease-out'
  },
  cardContainer: {
    flex: '1 1 31%',
    minWidth: '300px',
    maxWidth: '700px',
    border: '1px solid #B85170',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(184,81,112,0.1)',
    willChange: 'transform, opacity',
    backgroundColor: '#FFF5F5',
    transform: isVisible => isVisible ? 'scale(1)' : 'scale(0.95)',
    transition: 'transform 0.4s ease-out 0.2s'
  },
  cardHeader: {
    backgroundColor: '#B85170',
    padding: '12px 15px',
    color: '#FFFFFF',
    textAlign: 'center',
    borderBottom: '1px solid #B85170'
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
    borderTop: '1px dashed #B85170',
    paddingTop: '15px'
  },
  metricColumn: {
    textAlign: 'center',
    padding: '8px 12px',
    borderRadius: '6px',
    backgroundColor: '#FFF5F5',
    flex: 1,
    margin: '0 5px',
    border: '1px solid #B85170',
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
    color: '#B85170'
  },
  predictionGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
    borderTop: '1px dashed #B85170',
    paddingTop: '15px'
  },
  predictionColumn: {
    textAlign: 'center',
    padding: '8px 12px',
    borderRadius: '6px',
    backgroundColor: '#FFF5F5',
    flex: 1,
    margin: '0 5px',
    border: '1px solid #B85170',
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
    color: '#B85170'
  },
  buttonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '30px',
    marginBottom: '30px'
  },
  gridButton: {
    backgroundColor: '#B85170',
    color: '#FFFFFF',
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
    backgroundColor: '#B85170',
    borderRadius: '8px',
    padding: '7px',
    height: '100%',
    width: '300px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  newsletterHeading: {
    color: '#FFFFFF',
    fontSize: '15px',
  },
  currentDayBadge: {
    fontSize: '12px',
    color: '#FFFFFF',
    backgroundColor: '#B85170',
    padding: '2px 8px',
    borderRadius: '12px',
    marginLeft: '10px',
    display: 'inline-block'
  },
  phaseIndicator: {
    fontSize: '14px',
    color: '#B85170',
    fontWeight: '600',
    marginTop: '10px',
    marginLeft: '10px',
    marginRight: '10px',
    borderTop: '1px solid #B85170',
    paddingTop: '10px',
    paddingBottom: '10px',
    borderRadius: '10px',
    backgroundColor: '#FFF5F5',
    border: '1px solid #B85170',
    width: '350px',
    height: '25px',
  },
  phaseIndicators: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10px',
    borderTop: '1px dashed #B85170',
    paddingTop: '10px',
    width: '100%',
  }
};

export default Dashboard;