import os
import joblib
import pandas as pd
from app.schemas import HouseFeatures

# Resolve the path to the model joblib file
APP_DIR = os.path.dirname(os.path.abspath(__file__)) # HPP/backend/app
LOCAL_MODEL_PATH = os.path.join(APP_DIR, "house_price_model.joblib")

BASE_DIR = os.path.dirname(APP_DIR) # HPP/backend
ROOT_DIR = os.path.dirname(BASE_DIR) # HPP
LEGACY_MODEL_PATH = os.path.join(ROOT_DIR, "notebooks", "house_price_model.joblib")

if os.path.exists(LOCAL_MODEL_PATH):
    MODEL_PATH = LOCAL_MODEL_PATH
else:
    MODEL_PATH = LEGACY_MODEL_PATH

# Global model variable
_model = None

def load_model():
    global _model
    if _model is None:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
        _model = joblib.load(MODEL_PATH)
    return _model

def predict_price(features: HouseFeatures) -> float:
    # Load model if not loaded
    model = load_model()
    
    # Extract raw data to dictionary
    data = features.dict()
    
    # Calculate computed features
    # Prevent division by zero errors by adding a tiny epsilon (or default to 0 if households/rooms is 0)
    households = data["households"]
    total_rooms = data["total_rooms"]
    
    data["rooms_per_household"] = total_rooms / households if households > 0 else 0.0
    data["bedrooms_per_room"] = data["total_bedrooms"] / total_rooms if total_rooms > 0 else 0.0
    data["population_per_household"] = data["population"] / households if households > 0 else 0.0
    
    # Convert to DataFrame
    df = pd.DataFrame([data])
    
    # Make prediction
    prediction = model.predict(df)
    
    # Return predicted value as a float
    return float(prediction[0])
