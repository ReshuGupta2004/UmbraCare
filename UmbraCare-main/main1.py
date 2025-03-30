from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import List
import uvicorn
import pickle
import numpy as np
from pathlib import Path
from pydantic import BaseModel
import pandas as pd
import logging
import sklearn

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Enable CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load ML model
try:
    model_path = Path("irregularity_model.pkl")
    with open(model_path, "rb") as f:
        model = pickle.load(f)
    logger.info("Model loaded successfully")
except Exception as e:
    logger.error(f"Error loading model: {e}")
    model = None

# Symptom mapping
SYMPTOM_MAP = {
    "chronic pelvic pain": 0,
    "delayed cycle": 1,
    "fatigue": 2,
    "heavy bleeding": 3,
    "irregular spotting": 4,
    "light flow": 5,
    "mild cramps": 6,
    "mood swings": 7,
    "normal flow": 8,
    "painful periods": 9,
    "severe cramps": 10,
    "weight gain": 11
}

class PredictionRequest(BaseModel):
    cycle_length: int
    ovulation_day: int
    symptoms: List[str]

@app.post("/predict")
async def predict_irregularities(request: Request, data: PredictionRequest):
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
    }
    
    try:
        logger.info(f"Received data: {data}")
        
        # Validate inputs
        if not (15 <= data.cycle_length <= 45):
            raise HTTPException(400, "Cycle length must be 15-45 days")
        if not (1 <= data.ovulation_day <= 35):
            raise HTTPException(400, "Ovulation day must be 1-35")
        
        # Prepare features
        features_dict = {
            'cycle_length': data.cycle_length,
            'ovulation_day': data.ovulation_day,
            **{symptom: 0 for symptom in SYMPTOM_MAP}
        }
        
        for symptom in data.symptoms:
            if symptom in SYMPTOM_MAP:
                features_dict[symptom] = 1
        
        features_df = pd.DataFrame([features_dict])
        
        if model is None:
            raise HTTPException(500, "Model not loaded")
        
        # Get prediction
        prediction = model.predict(features_df)[0]
        proba = model.predict_proba(features_df)[0]
        
        response_data = {
            "prediction": str(prediction),
            "confidence": float(np.max(proba)),
            "irregularities": [
                f"Cycle length: {data.cycle_length} days",
                f"Ovulation day: {data.ovulation_day}",
                f"Detected symptoms: {', '.join(data.symptoms)}"
            ]
        }
        
        return JSONResponse(content=response_data, headers=headers)
        
    except HTTPException as he:
        logger.error(f"Validation error: {he.detail}")
        return JSONResponse(
            content={"detail": he.detail},
            status_code=he.status_code,
            headers=headers
        )
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}", exc_info=True)
        return JSONResponse(
            content={"detail": f"Prediction failed: {str(e)}"},
            status_code=500,
            headers=headers
        )

@app.get("/symptoms")
async def get_symptoms():
    return {"symptoms": list(SYMPTOM_MAP.keys())}

if __name__ == "__main__":
    uvicorn.run("main1:app", host="0.0.0.0", port=8000, reload=True)