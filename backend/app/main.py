from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import HouseFeatures
from app.model import load_model, predict_price

app = FastAPI(
    title="California House Price Prediction API",
    description="API for predicting median house value based on block-level statistics",
    version="1.0.0"
)

# Enable CORS for frontend accessibility
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    try:
        load_model()
        print("Model loaded successfully on startup!")
    except Exception as e:
        print(f"Error loading model on startup: {str(e)}")

@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "California House Price Prediction API is running",
        "features_supported": [
            "longitude",
            "latitude",
            "housing_median_age",
            "total_rooms",
            "total_bedrooms",
            "population",
            "households",
            "median_income",
            "ocean_proximity"
        ]
    }

@app.post("/predict")
def predict(features: HouseFeatures):
    try:
        predicted_price = predict_price(features)
        return {
            "predicted_price": predicted_price,
            "success": True
        }
    except FileNotFoundError as fnf_error:
        raise HTTPException(status_code=500, detail=f"Model files missing on server: {str(fnf_error)}")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction error: {str(e)}")
