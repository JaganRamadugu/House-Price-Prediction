import React, { useEffect, useState } from "react";

export default function PredictionResult({ price, error }) {
  const [displayPrice, setDisplayPrice] = useState(0);

  // Smooth number ticker effect when price changes
  useEffect(() => {
    if (price) {
      const duration = 1000; // ms
      const steps = 30;
      const stepTime = duration / steps;
      let step = 0;
      const priceVal = Math.round(price);
      
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        // Ease out quadratic
        const currentVal = Math.round(priceVal * (1 - Math.pow(1 - progress, 2)));
        
        setDisplayPrice(currentVal);
        if (step >= steps) {
          setDisplayPrice(priceVal);
          clearInterval(timer);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [price]);

  if (error) {
    return (
      <div className="result-container error-state animate-fade-in">
        <div className="error-icon">⚠️</div>
        <h3>Prediction Failed</h3>
        <p className="error-msg">{error}</p>
        <p className="hint">Make sure the backend server is running and accessible.</p>
      </div>
    );
  }

  if (!price) {
    return (
      <div className="result-container empty-state animate-fade-in">
        <div className="empty-icon">🔮</div>
        <h3>Awaiting Inputs</h3>
        <p>Adjust the location presets or sliders and click <strong>Calculate Predicted Value</strong> to get a real-time ML prediction.</p>
      </div>
    );
  }

  // Get price tier classification
  const getTierDetails = (value) => {
    if (value < 150000) {
      return {
        label: "Budget Friendly",
        class: "tier-budget",
        color: "#10b981", // Emerald
        percentage: 25,
        desc: "Below average market price. Suitable for entry-level buyers or investment properties."
      };
    } else if (value < 300000) {
      return {
        label: "Moderate / Suburban Standard",
        class: "tier-moderate",
        color: "#06b6d4", // Cyan
        percentage: 50,
        desc: "Within the typical median price range for California suburbs. Standard family housing."
      };
    } else if (value < 450000) {
      return {
        label: "Upscale / Premium Block",
        class: "tier-upscale",
        color: "#8b5cf6", // Purple
        percentage: 75,
        desc: "Above average market value. Likely located near major job hubs or highly desirable school districts."
      };
    } else {
      return {
        label: "Luxury / Capped Peak",
        class: "tier-luxury",
        color: "#f59e0b", // Amber/Gold
        percentage: 100,
        desc: "Top-tier valuation. Typically located in prime locations near coastal bays or elite residential enclaves."
      };
    }
  };

  const tier = getTierDetails(price);

  return (
    <div className="result-container success-state animate-fade-in">
      <span className="success-tag">Prediction Computed</span>
      <h3 className="result-title">Estimated Median House Value</h3>
      
      <div className="price-display">
        <span className="dollar-symbol">$</span>
        <span className="price-number">{displayPrice.toLocaleString()}</span>
      </div>

      <div className="tier-card">
        <div className="tier-header">
          <span className={`tier-badge-pill ${tier.class}`}>{tier.label}</span>
          <span className="tier-pct">{tier.percentage}% Index</span>
        </div>
        
        {/* Visual Progress Bar Gauge */}
        <div className="gauge-track">
          <div 
            className={`gauge-fill ${tier.class}`} 
            style={{ width: `${tier.percentage}%` }}
          ></div>
        </div>
        
        <p className="tier-description">{tier.desc}</p>
      </div>

      {/* Analytical disclaimer */}
      <div className="model-info">
        <h5>Pipeline Insights</h5>
        <ul>
          <li><strong>Algorithm:</strong> HistGradientBoostingRegressor (scikit-learn)</li>
          <li><strong>Features evaluated:</strong> 8 raw metrics + 3 ratio combinations</li>
          <li><strong>Dataset:</strong> California Housing Census</li>
        </ul>
      </div>
    </div>
  );
}
