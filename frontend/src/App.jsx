import React, { useState } from "react";
import "./App.css";
import PredictForm from "./components/PredictForm";
import PredictionResult from "./components/PredictionResult";

function App() {
  // Default values matching a typical "Near Bay" location from the dataset
  const [formData, setFormData] = useState({
    longitude: -122.23,
    latitude: 37.88,
    housing_median_age: 41.0,
    total_rooms: 880.0,
    total_bedrooms: 129.0,
    population: 322.0,
    households: 126.0,
    median_income: 8.3,
    ocean_proximity: "NEAR BAY",
  });

  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    setPrice(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Server returned an error");
      }

      const data = await response.json();
      if (data.success) {
        setPrice(data.predicted_price);
      } else {
        throw new Error("Failed to compute prediction price");
      }
    } catch (err) {
      console.error("Prediction fetch error:", err);
      setError(err.message || "Unable to connect to the backend prediction service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="badge-wrapper">
          <span className="badge-text">Machine Learning Powered</span>
        </div>
        <h1 className="app-title">California House Price Predictor</h1>
        <p className="app-subtitle">
          Input block-level demographic and location parameters to estimate the median house value using our tuned Gradient Boosting model.
        </p>
      </header>

      <main className="main-layout">
        <PredictForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handlePredict}
          loading={loading}
        />
        
        <PredictionResult 
          price={price} 
          error={error} 
        />
      </main>
    </div>
  );
}

export default App;
