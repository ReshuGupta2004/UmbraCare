import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormComponent = () => {
  const [formData, setFormData] = useState({ 
    age: "", 
    cycle_number: "", 
    conception_cycle: "no" // Default to "no"
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: name === "conception_cycle" ? value : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Basic validation
    if (!formData.age || !formData.cycle_number) {
      setError("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: Number(formData.age),
          cycle_number: Number(formData.cycle_number),
          conception_cycle: formData.conception_cycle
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        navigate("/prediction-results", { 
          state: { 
            prediction: result.prediction,
            inputData: formData 
          } 
        });
      } else {
        setError(result.error || "Prediction failed");
      }
    } catch (error) {
      setError("Network error. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Fertility Prediction</h2>
      {error && <p style={styles.error}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            min="18"
            max="50"
            value={formData.age}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="cycle_number">Cycle Number:</label>
          <input
            type="number"
            id="cycle_number"
            name="cycle_number"
            min="1"
            value={formData.cycle_number}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Conception Cycle:</label>
          <div style={styles.radioGroup}>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="conception_cycle"
                value="yes"
                checked={formData.conception_cycle === "yes"}
                onChange={handleChange}
              />
              Yes
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="conception_cycle"
                value="no"
                checked={formData.conception_cycle === "no"}
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          style={styles.button}
        >
          {isSubmitting ? "Predicting..." : "Predict"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  input: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  radioGroup: {
    display: "flex",
    gap: "15px",
    marginTop: "5px",
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },
  error: {
    color: "red",
    marginBottom: "15px",
  },
};

export default FormComponent;