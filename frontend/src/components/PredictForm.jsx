import React, { useEffect } from "react";

// California Presets with coordinates, ocean proximity, and typical stats
const LOCATION_PRESETS = [
  {
    name: "San Francisco",
    emoji: "🌉",
    longitude: -122.42,
    latitude: 37.77,
    ocean_proximity: "NEAR BAY",
    median_income: 10.5,
    housing_median_age: 38,
    total_rooms: 2200,
    total_bedrooms: 480,
    population: 1100,
    households: 450
  },
  {
    name: "Los Angeles",
    emoji: "🌴",
    longitude: -118.24,
    latitude: 34.05,
    ocean_proximity: "<1H OCEAN",
    median_income: 6.2,
    housing_median_age: 28,
    total_rooms: 2400,
    total_bedrooms: 510,
    population: 1500,
    households: 490
  },
  {
    name: "San Diego",
    emoji: "🌊",
    longitude: -117.16,
    latitude: 32.72,
    ocean_proximity: "NEAR OCEAN",
    median_income: 7.5,
    housing_median_age: 24,
    total_rooms: 2600,
    total_bedrooms: 540,
    population: 1300,
    households: 500
  },
  {
    name: "Fresno (Inland)",
    emoji: "🚜",
    longitude: -119.79,
    latitude: 36.74,
    ocean_proximity: "INLAND",
    median_income: 3.5,
    housing_median_age: 18,
    total_rooms: 1800,
    total_bedrooms: 360,
    population: 1200,
    households: 340
  },
  {
    name: "Lake Tahoe (Sierra)",
    emoji: "🏔️",
    longitude: -120.03,
    latitude: 39.10,
    ocean_proximity: "INLAND",
    median_income: 5.8,
    housing_median_age: 20,
    total_rooms: 3100,
    total_bedrooms: 620,
    population: 800,
    households: 300
  }
];

export default function PredictForm({ formData, setFormData, onSubmit, loading }) {
  
  // Calculate computed features in real-time
  const roomsPerHousehold = formData.households > 0 ? (formData.total_rooms / formData.households).toFixed(2) : "0.00";
  const bedroomsPerRoom = formData.total_rooms > 0 ? (formData.total_bedrooms / formData.total_rooms).toFixed(3) : "0.000";
  const populationPerHousehold = formData.households > 0 ? (formData.population / formData.households).toFixed(2) : "0.00";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "ocean_proximity" ? value : parseFloat(value) || 0
    }));
  };

  const applyPreset = (preset) => {
    setFormData({
      longitude: preset.longitude,
      latitude: preset.latitude,
      housing_median_age: preset.housing_median_age,
      total_rooms: preset.total_rooms,
      total_bedrooms: preset.total_bedrooms,
      population: preset.population,
      households: preset.households,
      median_income: preset.median_income,
      ocean_proximity: preset.ocean_proximity
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="form-container">
      <h2 className="section-title">Configure House Details</h2>
      
      {/* Location Presets */}
      <div className="presets-section">
        <label className="input-label">Select California Location Preset:</label>
        <div className="presets-grid">
          {LOCATION_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              className={`preset-btn ${formData.longitude === preset.longitude && formData.latitude === preset.latitude ? "active" : ""}`}
              onClick={() => applyPreset(preset)}
            >
              <span className="preset-emoji">{preset.emoji}</span>
              <span className="preset-name">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="prediction-form">
        <div className="form-grid">
          
          {/* Section 1: Location */}
          <div className="form-card">
            <h3>📍 Location Coordinates</h3>
            <div className="input-group">
              <label>Longitude ({formData.longitude}°)</label>
              <input
                type="range"
                name="longitude"
                min="-124.35"
                max="-114.31"
                step="0.01"
                value={formData.longitude}
                onChange={handleInputChange}
              />
              <div className="range-labels">
                <span>West (-124.35)</span>
                <span>East (-114.31)</span>
              </div>
            </div>

            <div className="input-group">
              <label>Latitude ({formData.latitude}°)</label>
              <input
                type="range"
                name="latitude"
                min="32.54"
                max="41.95"
                step="0.01"
                value={formData.latitude}
                onChange={handleInputChange}
              />
              <div className="range-labels">
                <span>South (32.54)</span>
                <span>North (41.95)</span>
              </div>
            </div>

            <div className="input-group">
              <label>Ocean Proximity</label>
              <select
                name="ocean_proximity"
                value={formData.ocean_proximity}
                onChange={handleInputChange}
                className="custom-select"
              >
                <option value="<1H OCEAN">&lt;1 Hour to Ocean</option>
                <option value="INLAND">Inland</option>
                <option value="NEAR OCEAN">Near Ocean</option>
                <option value="NEAR BAY">Near Bay</option>
                <option value="ISLAND">Island</option>
              </select>
            </div>
          </div>

          {/* Section 2: Property Metrics */}
          <div className="form-card">
            <h3>🏠 Property Specifications</h3>
            
            <div className="input-group">
              <label>Housing Median Age ({formData.housing_median_age} years)</label>
              <input
                type="range"
                name="housing_median_age"
                min="1"
                max="52"
                step="1"
                value={formData.housing_median_age}
                onChange={handleInputChange}
              />
              <div className="range-labels">
                <span>New (1)</span>
                <span>Old (52+)</span>
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Total Rooms</label>
                <input
                  type="number"
                  name="total_rooms"
                  min="2"
                  max="40000"
                  value={formData.total_rooms}
                  onChange={handleInputChange}
                  className="number-input"
                />
              </div>
              <div className="input-group">
                <label>Total Bedrooms</label>
                <input
                  type="number"
                  name="total_bedrooms"
                  min="1"
                  max="10000"
                  value={formData.total_bedrooms}
                  onChange={handleInputChange}
                  className="number-input"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Socioeconomic */}
          <div className="form-card">
            <h3>👥 Block Demographics</h3>
            
            <div className="input-row">
              <div className="input-group">
                <label>Population</label>
                <input
                  type="number"
                  name="population"
                  min="3"
                  max="40000"
                  value={formData.population}
                  onChange={handleInputChange}
                  className="number-input"
                />
              </div>
              <div className="input-group">
                <label>Households</label>
                <input
                  type="number"
                  name="households"
                  min="1"
                  max="10000"
                  value={formData.households}
                  onChange={handleInputChange}
                  className="number-input"
                />
              </div>
            </div>

            <div className="input-group">
              <label>Median Income: ${(formData.median_income * 10000).toLocaleString()}/year</label>
              <input
                type="range"
                name="median_income"
                min="0.5"
                max="15.0"
                step="0.1"
                value={formData.median_income}
                onChange={handleInputChange}
              />
              <div className="range-labels">
                <span>Low ($5,000)</span>
                <span>High ($150,000+)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Computed Ratios Display */}
        <div className="computed-metrics-card">
          <h4>💡 Real-Time Computed Features (Sent to Model)</h4>
          <div className="metrics-grid">
            <div className="metric-badge">
              <span className="metric-val">{roomsPerHousehold}</span>
              <span className="metric-lbl">Rooms / Household</span>
            </div>
            <div className="metric-badge">
              <span className="metric-val">{bedroomsPerRoom}</span>
              <span className="metric-lbl">Bedrooms / Room Ratio</span>
            </div>
            <div className="metric-badge">
              <span className="metric-val">{populationPerHousehold}</span>
              <span className="metric-lbl">Avg People / Household</span>
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? (
            <div className="btn-spinner-container">
              <div className="spinner"></div>
              <span>Predicting Price...</span>
            </div>
          ) : (
            "🔮 Calculate Predicted Value"
          )}
        </button>
      </form>
    </div>
  );
}
