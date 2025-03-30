// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FaBaby, FaCalendarAlt, FaFlask, FaUserMd } from 'react-icons/fa';
// import Plot from 'react-plotly.js';
// import Plotly from 'plotly.js-dist-min';

// function list(start, end) {
//   return Array.from({length: end - start + 1}, (v, k) => k + start);
// }

// const cycleData = {
//   daysUntilPeriod: 6,
//   currentCycle: 28,
//   history: {
//     '2024': [28, 26, 29, 27, 28, 26, 25, 28, 27, 29, 26, 28],
//     '2025': [28, 26, 29, 27, 28] 
//   }
// };

// const pregnancyData = {
//   weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
//           21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
//   sizes: [0.0, 0.0, 0.01, 0.04, 0.13, 0.25, 0.51, 0.63, 0.9, 1.22, 
//           1.61, 2.13, 2.91, 3.42, 3.98, 4.57, 5.12, 5.59, 6.02, 6.46, 
//           10.51, 10.94, 11.38, 11.81, 13.62, 14.02, 14.41, 14.80, 15.2, 15.71, 
//           16.18, 16.69, 17.20, 17.72, 18.19, 18.66, 19.13, 19.61, 19.96, 20.16],
//   comparisons: [
//     // Weeks 1-4 (Conception to implantation)
//     'Pinhead', 'Poppy seed', 'Sesame seed', 'Apple seed',
    
//     // Weeks 5-8 (Major organ development)
//     'Blueberry', 'Sweet pea', 'Kidney bean', 'Raspberry',
//     'Grape', 'Strawberry',
    
//     // Weeks 9-12 (Facial features form)
//     'Lime', 'Brussels sprout', 'Fig', 'Passport photo',
//     'Peach', 'Plum',
    
//     // Weeks 13-16 (Movement begins)
//     'Peach', 'Lemon', 'Avocado', 'Onion',
//     'Pear', 'Orange',
    
//     // Weeks 17-20 (Hearing develops)
//     'Bell pepper', 'Sweet potato', 'Banana', 'Mango',
//     'Grapefruit', 'Small eggplant',
    
//     // Weeks 21-24 (Viability threshold)
//     'Carrot', 'Corn cob', 'Papaya', 'Cantaloupe',
//     'Large banana', 'Zucchini',
    
//     // Weeks 25-28 (Lung maturation)
//     'Rutabaga', 'Head of lettuce', 'Cauliflower', 'Butternut squash',
//     'Cabbage', 'Acorn squash',
    
//     // Weeks 29-32 (Brain development)
//     'Butternut squash', 'Coconut', 'Pineapple', 'Honeydew melon',
//     'Mini watermelon', 'Small pumpkin',
    
//     // Weeks 33-40 (Final growth)
//     'Pineapple', 'Romaine lettuce', 'Swiss chard', 'Large pumpkin',
//     'Newborn size', 'Full-term baby'
//   ]
// };
// const Dashboard = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
    
//     setIsVisible(true);
//   }, []);

//   return (
//     <div style={styles.container}>
//       <div style={styles.content}>
//         {/* Your Original Header */}
//         <h1 style={styles.mainHeading}>Welcome to Umbracare</h1>
//         <p style={styles.subHeading}>PREDICT.PLAN.PROSPER - SMARTER WOMEN'S HEALTH</p>
        
//           {/* TEST TUBE VISUALIZATION */}
//        {/* Enhanced Animated Graph Section */}
//        <div style={{...styles.graphRow, opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease-out'}}>
          
//           {/* Cycle Length Analysis Card */}
//           <div style={{...styles.cardContainer, transform: isVisible ? 'scale(1)' : 'scale(0.95)', transition: 'transform 0.4s ease-out 0.2s'}}>
//             <div style={styles.cardHeader}>
//               <h3 style={styles.cardTitle}>Cycle Length Analysis</h3>
//             </div>
//             <div style={styles.graphCard}>
//               <div style={styles.chartContainer}>
//                 <Plot
//                   data={[
//                     {
//                       type: 'scatter',
//                       x: Object.keys(cycleData.history['2024']),
//                       y: cycleData.history['2024'].map((val, i) => isVisible ? val : 20),
//                       name: '2024',
//                       line: { 
//                         color: '#FFAA80', 
//                         width: 2,
//                         shape: 'spline',
//                         smoothing: 1.3
//                       },
//                       marker: { size: 6 }
//                     },
//                     {
//                       type: 'scatter',
//                       x: Object.keys(cycleData.history['2025']),
//                       y: cycleData.history['2025'].map((val, i) => isVisible ? val : 20),
//                       name: '2025',
//                       line: { 
//                         color: '#FF8C00', 
//                         width: 3,
//                         shape: 'spline',
//                         smoothing: 1.3
//                       },
//                       marker: { size: 8 }
//                     }
//                   ]}
//                   layout={{
//                     width: 320,
//                     height: 240,
//                     margin: { t: 30, l: 50, r: 20, b: 50 },
//                     yaxis: {
//                       title: 'Days',
//                       range: [20, 35],
//                       gridcolor: '#f5f5f5',
//                       titlefont: { size: 10 }
//                     },
//                     xaxis: { 
//                       title: 'Month', 
//                       titlefont: { size: 10 },
//                       automargin: true 
//                     },
//                     legend: { 
//                       orientation: 'h',
//                       y: -0.3,
//                       font: { size: 10 }
//                     },
//                     plot_bgcolor: '#FFFBF8',
//                     paper_bgcolor: 'rgba(0,0,0,0)',
//                     transition: {
//                       duration: 800,
//                       easing: 'cubic-out'
//                     }
//                   }}
//                   config={{ 
//                     displayModeBar: false,
//                     staticPlot: false
//                   }}
//                 />
//               </div>
//               <div style={styles.metricsGrid}>
//                 <div style={styles.metricColumn}>
//                   <div style={styles.metricHeader}>Shortest</div>
//                   <div style={styles.metricValue}>26 days</div>
//                 </div>
//                 <div style={styles.metricColumn}>
//                   <div style={styles.metricHeader}>Average</div>
//                   <div style={styles.metricValue}>27.5 days</div>
//                 </div>
//                 <div style={styles.metricColumn}>
//                   <div style={styles.metricHeader}>Longest</div>
//                   <div style={styles.metricValue}>29 days</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Next Period Prediction Card */}
//           <div style={{...styles.cardContainer, opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s ease-out 0.4s'}}>
//             <div style={styles.cardHeader}>
//               <h3 style={styles.cardTitle}>Next Period Prediction</h3>
//             </div>
//             <div style={styles.graphCard}>
//               <div style={styles.chartContainer}>
//                 <Plot
//                   data={[{
//                     type: 'indicator',
//                     mode: 'number+gauge+delta',
//                     value: isVisible ? cycleData.daysUntilPeriod : 0,
//                     delta: { 
//                       reference: 30, 
//                       decreasing: { color: '#FF8C00' },
//                       font: { size: 12 }
//                     },
//                     number: { 
//                       font: { size: 22, color: '#FF8C00' },
//                       suffix: ' days'
//                     },
//                     gauge: {
//                       axis: { 
//                         range: [0, 30],
//                         tickfont: { size: 10 }
//                       },
//                       bar: { 
//                         color: '#FF8C00', 
//                         thickness: 0.2,
//                         line: {
//                           color: isVisible ? '#FF8C00' : 'transparent',
//                           width: 2
//                         }
//                       },
//                       bgcolor: '#FFFBF8',
//                       steps: [
//                         { range: [0, 10], color: '#FFF5EB' },
//                         { range: [10, 20], color: '#FFE4C4' },
//                         { range: [20, 30], color: '#FFD4A3' }
//                       ],
//                       threshold: {
//                         line: { color: 'red', width: 2 },
//                         thickness: 0.2,
//                         value: cycleData.daysUntilPeriod
//                       }
//                     }
//                   }]}
//                   layout={{
//                     width: 280,
//                     height: 240,
//                     margin: { t: 30, l: 30, r: 30, b: 30 },
//                     paper_bgcolor: 'rgba(0,0,0,0)',
//                     transition: {
//                       duration: 1000,
//                       easing: 'elastic-out'
//                     }
//                   }}
//                   config={{ 
//                     displayModeBar: false,
//                     staticPlot: false
//                   }}
//                 />
//               </div>
//               <div style={styles.predictionGrid}>
//                 <div style={styles.predictionColumn}>
//                   <div style={styles.predictionHeader}>Expected Start</div>
//                   <div style={styles.predictionDate}>March 20, 2024</div>
//                 </div>
//                 <div style={styles.predictionColumn}>
//                   <div style={styles.predictionHeader}>Expected End</div>
//                   <div style={styles.predictionDate}>March 25, 2024</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
     
  
  
//  <div style={{ 
//   width: '100%', 
//   maxWidth: '500px',
//   margin: '20px auto 30px',
//   opacity: isVisible ? 1 : 0,
//   transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
//   transition: 'all 0.6s ease-out 0.4s'
// }}>
//   <div style={{...styles.cardContainer, width: '100%', transform: isVisible ? 'scale(1)' : 'scale(0.95)', transition: 'transform 0.4s ease-out 0.2s'}}>
//     <div style={styles.cardHeader}>
//       <h3 style={styles.cardTitle}>Menstrual Cycle Phases</h3>
//     </div>
//     <div style={{...styles.graphCard, padding: '10px'}}>
//       <Plot
//         data={[{
//           type: "sunburst",
//           labels: [
//             "Cycle", 
//             "Menstrual", 
//             "Follicular", 
//             "Ovulation", 
//             "Luteal",
//             "Day 1-5",      
//             "Day 6-11",     
//             "Day 12-15",    
//             "Day 15-17",    
//             "Day 18-28"     
//           ],
//           parents: [
//             "", 
//             "Cycle", 
//             "Cycle", 
//             "Cycle", 
//             "Cycle",
//             "Menstrual",
//             "Follicular",
//             "Follicular",
//             "Ovulation",
//             "Luteal"
//           ],
//           marker: {
//             colors: [
//               '#FFF5EB', 
//               '#FFC299', 
//               '#FFD4A3', 
//               '#FFAA80', 
//               '#FF8C00', 
//               '#FFE0CC', 
//               '#FFE4C4', 
//               '#FFD4A3', 
//               '#FFAA80', 
//               '#FF8C00'  
//             ],
//             line: { width: 1, color: '#FF8C00' }
//           },
//           branchvalues: 'total',
//           textinfo: 'label',
//           hoverinfo: 'label+percent',
//           textfont: { size: 12, color: '#333' },
//           insidetextorientation: 'radial'
//         }]}
//         layout={{
//           width: 380,
//           height: 380,
//           margin: {t: 0, b: 0, l: 0, r: 0},
//           paper_bgcolor: 'rgba(0,0,0,0)',
//           transition: {
//             duration: 800,
//             easing: 'cubic-out'
//           }
//         }}
//         config={{ 
//           displayModeBar: false,
//           responsive: true
//         }}
//       />
//     </div>
//   </div>
// </div>
//         {/* ===== END OF SUNBURST CHART ===== */}
        
//         <div style={{ 
//   width: '100%', 
//   maxWidth: '600px',
//   margin: '20px auto 30px',
//   opacity: isVisible ? 1 : 0,
//   transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
//   transition: 'all 0.6s ease-out 0.4s'
// }}>
//   <div style={{...styles.cardContainer, width: '100%', transform: isVisible ? 'scale(1)' : 'scale(0.95)', transition: 'transform 0.4s ease-out 0.2s'}}>
//     <div style={styles.cardHeader}>
//       <h3 style={styles.cardTitle}>Pregnancy Journey</h3>
//     </div>
//     <div style={{...styles.graphCard, padding: '10px', position: 'relative', overflow: 'hidden'}}>
//       {/* Subtle animated heartbeat line */}
//       <div style={{
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         height: 2,
//         background: 'linear-gradient(90deg, rgba(255,140,0,0) 0%, rgba(255,140,0,0.8) 50%, rgba(255,140,0,0) 100%)',
//         animation: 'heartbeat 2s infinite',
//         transformOrigin: 'center'
//       }}/>
      
//       <Plot
//         data={[   
//           {
//             type: 'indicator',
//             mode: 'number+gauge+delta',
//             value: 5,
//             delta: { 
//               reference: 40, 
//               decreasing: { color: '#FF8C00' },
//               font: { size: 14 }
//             },
//             domain: { 'x': [0.05, 0.95], 'y': [0.88, 0.98] },
//             title: {
//               'text': `<b style="font-size:18px;color:#FF8C00">5 Weeks Pregnant</b><br>
//                       <span style="font-size:14px;color:#666">35 Weeks to Go</span>`,
//               'font': { 'family': 'Poppins' }
//             },
//             gauge: {
//               'shape': "bullet",
//               'axis': { 'range': [null, 40], 'visible': false },
//               'bar': { 
//                 'color': "rgba(255, 140, 0, 0.8)", 
//                 'thickness': 0.25,
//                 'line': { 'width': 1, 'color': 'darkorange' }
//               },
//               'bgcolor': "rgba(255, 140, 0, 0.1)",
//               'steps': [
//                 { 'range': [0, 5], 'color': "rgba(255, 140, 0, 0.6)" },
//               ],
//               'threshold': {
//                 'line': { 'color': "red", 'width': 2 },
//                 'thickness': 0.8,
//                 'value': 5
//               }
//             },
//             'transition': {
//               'duration': 1000,
//               'easing': 'elastic-out'
//             }
//           },
//           {
//             type: 'indicator',
//             mode: 'number',
//             value: pregnancyData.sizes[4],
//             number: {
//               'suffix': " inches", 
//               'font': { 
//                 'size': 28, 
//                 'color': '#FF8C00', 
//                 'family': 'Poppins'
//               }
//             },
//             domain: { 'x': [0.05, 0.45], 'y': [0.6, 0.8] },
//             title: {
//               'text': "<b>Current Size</b>", 
//               'font': { 'size': 14, 'family': 'Poppins' }
//             },
//             'animate': true,
//             'animation': {
//               'duration': 2000,
//               'easing': 'cubic-in-out'
//             }
//           },
//           {
//             type: 'indicator',
//             mode: 'number',
//             value: 0,
//             number: {
//               'prefix': `<span style="font-size:20px;color:#FF8C00">👶 Baby size like:<br>
//                         <span style="font-size:24px;font-weight:bold">${pregnancyData.comparisons[4]}</span></span>`
//             },
//             domain: { 'x': [0.55, 0.95], 'y': [0.6, 0.8] }
//           },
//           {
//             type: 'scatter',
//             x: pregnancyData.weeks,
//             y: pregnancyData.sizes,
//             mode: 'lines+markers',
//             line: {
//               'color': 'rgba(255, 140, 0, 0.7)',
//               'width': 4,
//               'shape': 'spline',
//               'smoothing': 1.2
//             },
//             marker: {
//               'size': pregnancyData.sizes.map(s => Math.max(8, s * 15)),
//               'color': pregnancyData.sizes.map((s, i) => 
//                 i === 4 ? '#FF8C00' : 'rgba(255, 140, 0, 0.5)'),
//               'line': { 'width': 1, 'color': 'white' },
//               'symbol': pregnancyData.weeks.map((w, i) => 
//                 i === 4 ? 'diamond' : 'circle'),
//               'opacity': 0.8
//             },
//             'hoverinfo': 'text',
//             'text': pregnancyData.weeks.map((w, i) => 
//               `Week ${w}<br>Size: ${pregnancyData.sizes[i]}"<br>Like: ${pregnancyData.comparisons[i]}`),
//             'hovertemplate': '%{text}<extra></extra>',
//             'line': {
//               'color': 'rgba(255, 140, 0, 0.7)',
//               'width': 4,
//               'shape': 'spline',
//               'smoothing': 1.2
//             }
//           },
//           {
//             type: 'scatter',
//             x: [5],
//             y: [pregnancyData.sizes[4]],
//             mode: 'markers',
//             marker: {
//               'size': 30,
//               'color': '#FF8C00',
//               'symbol': 'diamond',
//               'line': { 'width': 2, 'color': 'white' },
//               'opacity': 0.9
//             },
//             'hoverinfo': 'skip'
//           },
//           {
//             type: 'scatter',
//             x: [null],
//             y: [null],
//             mode: 'markers',
//             marker: {
//               'size': 0,
//               'color': 'rgba(255,140,0,0)'
//             },
//             'hoverinfo': 'none'
//           }
//         ]}
//         layout={{
//           'width': 580,
//           'height': 620,
//           'margin': { 't': 100, 'b': 80, 'l': 60, 'r': 60, 'pad': 10 },
//           'plot_bgcolor': 'rgba(255,251,248,0.8)',
//           'paper_bgcolor': 'rgba(0,0,0,0)',
//           'font': { 'family': 'Poppins' },
//           'xaxis': {
//             'title': { 
//               'text': '<b>Weeks of Pregnancy</b>', 
//               'font': { 'size': 14 },
//               'standoff': 10
//             },
//             'range': [0.5, 40.5],
//             'tickvals': Array.from({length: 9}, (_, i) => i * 5),
//             'gridcolor': 'rgba(255,140,0,0.1)',
//             'linecolor': 'rgba(255,140,0,0.3)',
//             'showspikes': true,
//             'spikethickness': 1
//           },
//           'yaxis': {
//             'title': { 
//               'text': '<b>Size (inches)</b>', 
//               'font': { 'size': 14 },
//               'standoff': 15
//             },
//             'range': [0, Math.max(...pregnancyData.sizes) * 1.15],
//             'gridcolor': 'rgba(255,140,0,0.1)',
//             'linecolor': 'rgba(255,140,0,0.3)',
//             'showspikes': true,
//             'spikethickness': 1
//           },
//           'hoverlabel': {
//             'bgcolor': 'white',
//             'bordercolor': '#FF8C00',
//             'font': { 'family': 'Poppins', 'size': 12 }
//           },
//           'transition': {
//             'duration': 1500,
//             'easing': 'cubic-in-out'
//           },
//           'clickmode': 'event+select'
//         }}
//         config={{
//           'displayModeBar': false,
//           'responsive': true,
//           'scrollZoom': false
//         }}
//         onInitialized={(figure, graphDiv) => {
//           if (!graphDiv) return;
          
//           let counter = 0;
//           const interval = setInterval(() => {
//             if (!graphDiv._fullLayout || counter++ > 100) {
//               clearInterval(interval);
//               return;
//             }
            
//             try {
//               Plotly.animate(graphDiv, {
//                 data: [{ marker: { size: [30 + 5 * Math.sin(Date.now()/300)] } }],
//                 traces: [4],
//                 layout: {}
//               }, {
//                 transition: { duration: 0 },
//                 frame: { duration: 0, redraw: false }
//               });
//             } catch (error) {
//               clearInterval(interval);
//             }
//           }, 50);
          
//         }}
//       />
//     </div>
//   </div>
// </div>

// <style jsx>{`
//   @keyframes heartbeat {
//     0% { transform: scaleX(1); opacity: 0.6; }
//     50% { transform: scaleX(1.05); opacity: 1; }
//     100% { transform: scaleX(1); opacity: 0.6; }
//   }
// `}</style>
// {/* ===== NEW HEALTH CHARTS BELOW PREGNANCY JOURNEY ===== */}
// <div style={{
//   display: 'flex',
//   flexWrap: 'wrap',
//   gap: '20px',
//   margin: '30px auto',
//   maxWidth: '1200px',
//   justifyContent: 'center',
//   opacity: isVisible ? 1 : 0,
//   transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
//   transition: 'all 0.6s ease-out'
// }}>
//   {/* Chart 1: Heart Rate & Blood Sugar */}
//   <div style={{
//     flex: '1 1 350px',
//     maxWidth: '400px',
//     minWidth: '300px',
//     ...styles.cardContainer, 
//     backgroundColor: 'white', 
//     borderRadius: '12px', 
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
//     transform: isVisible ? 'scale(1)' : 'scale(0.95)', 
//     transition: 'transform 0.4s ease-out'
//   }}>
//     <div style={styles.cardHeader}>
//       <h3 style={styles.cardTitle}>❤️ Pregnancy Vital Signs</h3>
//     </div>
//     <Plot
//       data={[
//         {
//           type: 'scatter',
//           mode: 'lines',
//           name: 'Heart Rate',
//           x: ['Week 4', 'Week 8', 'Week 12', 'Week 16', 'Week 20', 'Week 24', 'Week 28', 'Week 32', 'Week 36', 'Week 40'],
//           y: [72, 75, 78, 82, 85, 88, 90, 92, 94, 96],
//           line: {color: '#FF6B8B', width: 3, shape: 'spline'},
//           marker: {symbol: 'heart', size: 10}
//         },
//         {
//           type: 'scatter',
//           mode: 'lines+markers',
//           name: 'Blood Sugar',
//           x: ['Week 4', 'Week 8', 'Week 12', 'Week 16', 'Week 20', 'Week 24', 'Week 28', 'Week 32', 'Week 36', 'Week 40'],
//           y: [85, 88, 86, 90, 92, 95, 98, 96, 99, 101],
//           yaxis: 'y2',
//           line: {color: '#FFAA80', width: 3, dash: 'dot', shape: 'spline'},
//           marker: {symbol: 'hexagram', size: 10}
//         }
//       ]}
//       layout={{
//         height: 350,
//         margin: {t: 40, b: 60, l: 50, r: 50},
//         plot_bgcolor: 'rgba(255,251,248,0.8)',
//         paper_bgcolor: 'rgba(0,0,0,0)',
//         xaxis: {
//           title: 'Pregnancy Timeline',
//           gridcolor: 'rgba(255,140,0,0.1)'
//         },
//         yaxis: {
//           title: 'Heart Rate (bpm)',
//           range: [65, 110],
//           gridcolor: 'rgba(255,140,0,0.1)',
//           titlefont: {color: '#FF6B8B'}
//         },
//         yaxis2: {
//           title: 'Blood Sugar (mg/dL)',
//           overlaying: 'y',
//           side: 'right',
//           range: [75, 110],
//           titlefont: {color: '#FFAA80'}
//         }
//       }}
//       config={{displayModeBar: false}}
//     />
//   </div>

//   {/* Chart 2: Blood Pressure & Glucose */}
//   <div style={{
//     flex: '1 1 350px',
//     maxWidth: '400px',
//     minWidth: '300px',
//     ...styles.cardContainer, 
//     backgroundColor: 'white', 
//     borderRadius: '12px', 
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
//     transform: isVisible ? 'scale(1)' : 'scale(0.95)', 
//     transition: 'transform 0.4s ease-out 0.2s'
//   }}>
//     <div style={styles.cardHeader}>
//       <h3 style={styles.cardTitle}>🩸 Pressure & Glucose</h3>
//     </div>
//     <Plot
//       data={[
//         {
//           type: 'candlestick',
//           name: 'Blood Pressure',
//           x: ['1st Tri', '2nd Tri', '3rd Tri'],
//           open: [112, 115, 118],
//           high: [122, 125, 128],
//           low: [108, 112, 115],
//           close: [118, 120, 124],
//           increasing: {line: {color: '#FF8C00'}},
//           decreasing: {line: {color: '#FF6B8B'}}
//         },
//         {
//           type: 'scatter',
//           mode: 'lines+markers',
//           name: 'Fasting Glucose',
//           x: ['1st Tri', '2nd Tri', '3rd Tri'],
//           y: [82, 88, 94],
//           line: {color: '#6B8E23', width: 3, shape: 'spline'},
//           marker: {symbol: 'star', size: 12, color: '#6B8E23'},
//           yaxis: 'y2'
//         }
//       ]}
//       layout={{
//         height: 350,
//         margin: {t: 40, b: 60, l: 50, r: 50},
//         plot_bgcolor: 'rgba(255,251,248,0.8)',
//         paper_bgcolor: 'rgba(0,0,0,0)',
//         xaxis: {
//           title: 'Trimester',
//           gridcolor: 'rgba(255,140,0,0.1)'
//         },
//         yaxis: {
//           title: 'BP (mmHg)',
//           gridcolor: 'rgba(255,140,0,0.1)'
//         },
//         yaxis2: {
//           title: 'Glucose (mg/dL)',
//           overlaying: 'y',
//           side: 'right',
//           titlefont: {color: '#6B8E23'}
//         }
//       }}
//       config={{displayModeBar: false}}
//     />
//   </div>
// </div>
// {/* ===== END NEW CHARTS ===== */}


//         <div style={styles.buttonGrid}>
//           <Link to="/pregnancy-postpartum-tracker" style={styles.gridButton}>
//             <FaBaby style={styles.icon} />
//             <span>Pregnancy & Postpartum Tracker</span>
//           </Link>
//           <Link to="/period-tracker" style={styles.gridButton}>
//             <FaCalendarAlt style={styles.icon} />
//             <span>Period Tracker</span>
//           </Link>
//           <Link to="/ivf-tracker" style={styles.gridButton}>
//             <FaFlask style={styles.icon} />
//             <span>IVF Tracker</span>
//           </Link>
//           <Link to="/doctor-info" style={styles.gridButton}>
//             <FaUserMd style={styles.icon} />
//             <span>Doctor Info</span>
//           </Link>
//         </div>
        
//         <div style={styles.newsletterBox}>
//           <Link to="/newsletter" style={styles.newsletterHeading}>Subscribe to Our Newsletter</Link>
//         </div>
//       </div>
//       </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: '100vh',
//     fontFamily: "'Poppins', sans-serif",
//     boxSizing: 'border-box',
//     paddingTop: '50px',  
//   },
//   content: {
//     // backgroundColor: 'rgba(255, 255, 255, 0.95)',
//     padding: '40px',
//     borderRadius: '10px',
//     // boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//     textAlign: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//     display: 'flex',
//     flexDirection: 'column',
//     width: '100%',
//     maxWidth: '1400px',
//   },
//   mainHeading: {
//     fontSize: '38px',
//     color: 'black',
//     marginBottom: '4px',
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   subHeading: {
//     fontSize: '18px',
//     color: '#333',
//     marginBottom: '20px',
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   measurementBox: {
//     backgroundColor: '#fff8e6',
//     border: '2px solid #ff8c00',
//     borderRadius: '8px',
//     padding: '10px',
//     marginBottom: '30px',
//     display: 'flex',
//     flexDirection: 'row',
//     gap: '15px',
//     width: 'auto',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   measurementHeading: {
//     color: '#ff8c00',
//     fontSize: '20px',
//     marginBottom: '15px',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   measurementButtonContainer: {
//     display: 'flex',
//     gap: '10px',
//     justifyContent: 'center',
//   },
//   measurementButton: {
//     backgroundColor: '#ff8c00',
//     color: '#fff',
//     padding: '8px 15px',
//     fontSize: '14px',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s',
//   },
//   buttonGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(4, 1fr)',
//     gap: '30px',
//     marginBottom: '30px',
//     '@media (maxWidth: 1000px)': {
//       gridTemplateColumns: 'repeat(2, 1fr)',
//     },
//     '@media (maxWidth: 600px)': {
//       gridTemplateColumns: 'repeat(1, 1fr)',
//     },
//   },
//   gridButton: {
//     backgroundColor: '#ff8c00',
//     color: '#fff',
//     padding: '15px',
//     fontSize: '16px',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s',
//     textDecoration: 'none',
//     textAlign: 'center',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     // width: '300px',
//     height: '220px',
//   },
//   icon: {
//     fontSize: '40px',
//     marginBottom: '15px',
//   },
//   newsletterBox: {
//     backgroundColor: 'rgb(255, 140, 0)',
//     borderRadius: '8px',
//     padding: '7px',
//     height: '100%',
//     width: '300px',
//     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//   },
//   newsletterHeading: {
//     color: 'black',
//     fontSize: '15px',
//     // marginBottom: '15px',

//   },
//   /* Enhanced Graph Styles */
//   graphRow: {
//     display: 'flex',
//     justifyContent: 'center',
//     gap: '20px',
//     width: '100%',
//     maxWidth: '900px',
//     margin: '0 auto 30px',
//     '@media (maxWidth: 768px)': {
//       flexDirection: 'column',
//       alignItems: 'center'
//     }
//   },
//   cardContainer: {
//     width: '48%',
//     border: '1px solid #FF8C00',
//     borderRadius: '10px',
//     overflow: 'hidden',
//     boxShadow: '0 4px 12px rgba(255,140,0,0.1)',
//     willChange: 'transform, opacity',
//     '@media (maxWidth: 768px)': {
//       width: '100%',
//       marginBottom: '20px'
//     }
//   },
//   cardHeader: {
//     backgroundColor: '#FF8C00',
//     padding: '12px 15px',
//     color: 'white',
//     textAlign: 'center',
//     borderBottom: '1px solid #FFD4A3'
//   },
//   cardTitle: {
//     margin: 0,
//     fontSize: '1.1rem',
//     fontWeight: '600'
//   },
//   graphCard: {
//     backgroundColor: '#FFFBF8',
//     padding: '15px',
//     minHeight: 'auto'
//   },
//   chartContainer: {
//     height: '280px',
//     marginBottom: '15px'
//   },
//   metricsGrid: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     marginTop: '15px',
//     borderTop: '1px dashed #FFD4A3',
//     paddingTop: '15px'
//   },
//   metricColumn: {
//     textAlign: 'center',
//     padding: '8px 12px',
//     borderRadius: '6px',
//     backgroundColor: '#FFF5EB',
//     flex: 1,
//     margin: '0 5px',
//     border: '1px solid #FFD4A3',
//     transition: 'all 0.3s ease'
//   },
//   metricHeader: {
//     fontSize: '12px',
//     color: '#666',
//     fontWeight: '600',
//     marginBottom: '5px'
//   },
//   metricValue: {
//     fontSize: '14px',
//     fontWeight: '600',
//     color: '#FF8C00'
//   },
//   predictionGrid: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     marginTop: '15px',
//     borderTop: '1px dashed #FFD4A3',
//     paddingTop: '15px'
//   },
//   predictionColumn: {
//     textAlign: 'center',
//     padding: '8px 12px',
//     borderRadius: '6px',
//     backgroundColor: '#FFF5EB',
//     flex: 1,
//     margin: '0 5px',
//     border: '1px solid #FFD4A3',
//     transition: 'all 0.3s ease'
//   },
//   predictionHeader: {
//     fontSize: '12px',
//     color: '#666',
//     fontWeight: '600',
//     marginBottom: '5px'
//   },
//   predictionDate: {
//     fontSize: '14px',
//     fontWeight: '600',
//     color: '#FF8C00'
//   }
  
//   };
//   export default Dashboard;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBaby, FaCalendarAlt, FaFlask, FaUserMd } from 'react-icons/fa';
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js-dist-min';

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

const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.mainHeading}>Welcome to Umbracare</h1>
        <p style={styles.subHeading}>PREDICT.PLAN.PROSPER - SMARTER WOMEN'S HEALTH</p>
        
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
                      x: Object.keys(cycleData.history['2024']),
                      y: cycleData.history['2024'].map((val, i) => isVisible ? val : 20),
                      name: '2024',
                      line: { color: '#FFAA80', width: 2, shape: 'spline', smoothing: 1.3 },
                      marker: { size: 6 }
                    },
                    {
                      type: 'scatter',
                      x: Object.keys(cycleData.history['2025']),
                      y: cycleData.history['2025'].map((val, i) => isVisible ? val : 20),
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
                <div style={styles.metricColumn}><div style={styles.metricHeader}>Shortest</div><div style={styles.metricValue}>26 days</div></div>
                <div style={styles.metricColumn}><div style={styles.metricHeader}>Average</div><div style={styles.metricValue}>27.5 days</div></div>
                <div style={styles.metricColumn}><div style={styles.metricHeader}>Longest</div><div style={styles.metricValue}>29 days</div></div>
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
                    value: isVisible ? cycleData.daysUntilPeriod : 0,
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
                      threshold: { line: { color: 'red', width: 2 }, thickness: 0.2, value: cycleData.daysUntilPeriod }
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
                <div style={styles.predictionColumn}><div style={styles.predictionHeader}>Expected Start</div><div style={styles.predictionDate}>April 4, 2025</div></div>
                <div style={styles.predictionColumn}><div style={styles.predictionHeader}>Expected End</div><div style={styles.predictionDate}>April 9, 2025</div></div>
              </div>
            </div>
          </div>

          {/* Menstrual Cycle Phases */}
          <div style={styles.cardContainer}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Menstrual Cycle Phases</h3>
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
                  transition: { duration: 800, easing: 'cubic-out' }
                }}
                config={{ displayModeBar: false, responsive: true }}
              />
            </div>
          </div>
        </div>

        {/* Second Row: 3 Charts */}
        <div style={styles.graphRow}>
          {/* Pregnancy Journey */}
          <div style={styles.cardContainer}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Pregnancy Journey</h3>
            </div>
            <div style={styles.graphCard}>
              <Plot
                data={[
                  {
                    type: 'indicator',
                    mode: 'number+gauge+delta',
                    value: 5,
                    delta: { reference: 40, decreasing: { color: '#FF8C00' }, font: { size: 14 } },
                    domain: { 'x': [0.05, 0.95], 'y': [0.88, 0.98] },
                    title: { 'text': `<b style="font-size:18px;color:#FF8C00">5 Weeks Pregnant</b><br><span style="font-size:14px;color:#666">35 Weeks to Go</span>`, 'font': { 'family': 'Poppins' } },
                    gauge: {
                      'shape': "bullet",
                      'axis': { 'range': [null, 40], 'visible': false },
                      'bar': { 'color': "rgba(255, 140, 0, 0.8)", 'thickness': 0.25, 'line': { 'width': 1, 'color': 'darkorange' } },
                      'bgcolor': "rgba(255, 140, 0, 0.1)",
                      'steps': [{ 'range': [0, 5], 'color': "rgba(255, 140, 0, 0.6)" }],
                      'threshold': { 'line': { 'color': "red", 'width': 2 }, 'thickness': 0.8, 'value': 5 }
                    }
                  },
                  {
                    type: 'indicator',
                    mode: 'number',
                    value: pregnancyData.sizes[4],
                    number: { 'suffix': " inches", 'font': { 'size': 28, 'color': '#FF8C00', 'family': 'Poppins' } },
                    domain: { 'x': [0.05, 0.45], 'y': [0.6, 0.8] },
                    title: { 'text': "<b>Current Size</b>", 'font': { 'size': 14, 'family': 'Poppins' } }
                  },
                  {
                    type: 'indicator',
                    mode: 'number',
                    value: 0,
                    number: { 'prefix': `<span style="font-size:20px;color:#FF8C00">👶 Baby size like:<br><span style="font-size:24px;font-weight:bold">${pregnancyData.comparisons[4]}</span></span>` },
                    domain: { 'x': [0.55, 0.95], 'y': [0.6, 0.8] }
                  },
                  {
                    type: 'scatter',
                    x: pregnancyData.weeks,
                    y: pregnancyData.sizes,
                    mode: 'lines+markers',
                    line: { 'color': 'rgba(255, 140, 0, 0.7)', 'width': 4, 'shape': 'spline', 'smoothing': 1.2 },
                    marker: {
                      'size': pregnancyData.sizes.map(s => Math.max(8, s * 15)),
                      'color': pregnancyData.sizes.map((s, i) => i === 4 ? '#FF8C00' : 'rgba(255, 140, 0, 0.5)'),
                      'line': { 'width': 1, 'color': 'white' },
                      'symbol': pregnancyData.weeks.map((w, i) => i === 4 ? 'diamond' : 'circle'),
                      'opacity': 0.8
                    },
                    'hoverinfo': 'text',
                    'text': pregnancyData.weeks.map((w, i) => `Week ${w}<br>Size: ${pregnancyData.sizes[i]}"<br>Like: ${pregnancyData.comparisons[i]}`),
                    'hovertemplate': '%{text}<extra></extra>'
                  },
                  {
                    type: 'scatter',
                    x: [5],
                    y: [pregnancyData.sizes[4]],
                    mode: 'markers',
                    marker: { 'size': 30, 'color': '#FF8C00', 'symbol': 'diamond', 'line': { 'width': 2, 'color': 'white' }, 'opacity': 0.9 },
                    'hoverinfo': 'skip'
                  }
                ]}
                layout={{
                  width: 350,
                  height: 250,
                  margin: { 't': 50, 'b': 40, 'l': 40, 'r': 40, 'pad': 10 },
                  plot_bgcolor: '#FFFBF8',
                  paper_bgcolor: 'rgba(0,0,0,0)',
                  font: { 'family': 'Poppins' },
                  xaxis: { 'title': { 'text': '<b>Weeks</b>', 'font': { 'size': 12 } }, 'range': [0.5, 40.5], 'tickvals': Array.from({length: 9}, (_, i) => i * 5) },
                  yaxis: { 'title': { 'text': '<b>Size (in)</b>', 'font': { 'size': 12 } }, 'range': [0, Math.max(...pregnancyData.sizes) * 1.15] },
                  transition: { 'duration': 1500, 'easing': 'cubic-in-out' }
                }}
                config={{ displayModeBar: false, responsive: true, scrollZoom: false }}
              />
            </div>
          </div>

          {/* Pregnancy Vital Signs */}
          <div style={styles.cardContainer}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>❤️ Pregnancy Vital Signs</h3>
            </div>
            <div style={styles.graphCard}>
              <Plot
                data={[
                  {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Heart Rate',
                    x: ['Week 4', 'Week 8', 'Week 12', 'Week 16', 'Week 20', 'Week 24', 'Week 28', 'Week 32', 'Week 36', 'Week 40'],
                    y: [72, 75, 78, 82, 85, 88, 90, 92, 94, 96],
                    line: {color: '#FF6B8B', width: 3, shape: 'spline'},
                    marker: {symbol: 'heart', size: 10}
                  },
                  {
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Blood Sugar',
                    x: ['Week 4', 'Week 8', 'Week 12', 'Week 16', 'Week 20', 'Week 24', 'Week 28', 'Week 32', 'Week 36', 'Week 40'],
                    y: [85, 88, 86, 90, 92, 95, 98, 96, 99, 101],
                    yaxis: 'y2',
                    line: {color: '#FFAA80', width: 3, dash: 'dot', shape: 'spline'},
                    marker: {symbol: 'hexagram', size: 10}
                  }
                ]}
                layout={{
                  width: 350,
                  height: 250,
                  margin: {t: 40, b: 60, l: 50, r: 50},
                  plot_bgcolor: '#FFFBF8',
                  paper_bgcolor: 'rgba(0,0,0,0)',
                  xaxis: { title: 'Pregnancy Timeline', gridcolor: 'rgba(255,140,0,0.1)' },
                  yaxis: { title: 'Heart Rate (bpm)', range: [65, 110], gridcolor: 'rgba(255,140,0,0.1)', titlefont: {color: '#FF6B8B'} },
                  yaxis2: { title: 'Blood Sugar (mg/dL)', overlaying: 'y', side: 'right', range: [75, 110], titlefont: {color: '#FFAA80'} }
                }}
                config={{displayModeBar: false}}
              />
            </div>
          </div>

          {/* Pressure & Glucose */}
          <div style={styles.cardContainer}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>🩸 Pressure & Glucose</h3>
            </div>
            <div style={styles.graphCard}>
              <Plot
                data={[
                  {
                    type: 'candlestick',
                    name: 'Blood Pressure',
                    x: ['1st Tri', '2nd Tri', '3rd Tri'],
                    open: [112, 115, 118],
                    high: [122, 125, 128],
                    low: [108, 112, 115],
                    close: [118, 120, 124],
                    increasing: {line: {color: '#FF8C00'}},
                    decreasing: {line: {color: '#FF6B8B'}}
                  },
                  {
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Fasting Glucose',
                    x: ['1st Tri', '2nd Tri', '3rd Tri'],
                    y: [82, 88, 94],
                    line: {color: '#6B8E23', width: 3, shape: 'spline'},
                    marker: {symbol: 'star', size: 12, color: '#6B8E23'},
                    yaxis: 'y2'
                  }
                ]}
                layout={{
                  width: 350,
                  height: 250,
                  margin: {t: 40, b: 60, l: 50, r: 50},
                  plot_bgcolor: '#FFFBF8',
                  paper_bgcolor: 'rgba(0,0,0,0)',
                  xaxis: { title: 'Trimester', gridcolor: 'rgba(255,140,0,0.1)' },
                  yaxis: { title: 'BP (mmHg)', gridcolor: 'rgba(255,140,0,0.1)' },
                  yaxis2: { title: 'Glucose (mg/dL)', overlaying: 'y', side: 'right', titlefont: {color: '#6B8E23'} }
                }}
                config={{displayModeBar: false}}
              />
            </div>
          </div>
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