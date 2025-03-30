import { useLocation } from "react-router-dom";

const ResultsPage = () => {
  const location = useLocation();
  const prediction = location.state?.prediction || "No prediction available";

  return (
    <div>
      <h2>Model Prediction</h2>
      <p>Prediction: {prediction}</p>
    </div>
  );
};

export default ResultsPage;