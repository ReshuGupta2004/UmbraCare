from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import joblib
import xgboost
import numpy as np
from datetime import datetime, timedelta
from pydantic import BaseModel
import pickle

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionRequest(BaseModel):
    age: float
    cycle_number: float
    conception_cycle: str
    last_period_date: str

# Load model
try:
    with open("xgb_model.pkl", "rb") as f:
        model = pickle.load(f)
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None


@app.post("/predict")
async def predict(request: PredictionRequest):
    try:
        if request.conception_cycle.lower() not in ["yes", "no"]:
            raise HTTPException(status_code=400, detail="conception_cycle must be 'yes' or 'no'")
        
        # Convert to Python native float
        conception_numeric = 1 if request.conception_cycle.lower() == "yes" else 0
        input_data = np.array([[request.age, request.cycle_number, conception_numeric]])
        
        # Get prediction and convert to native Python float
        cycle_length = int(model.predict(input_data)[0])  # Explicit conversion
        
        next_period = (datetime.strptime(request.last_period_date, "%Y-%m-%d") + 
                      timedelta(days=cycle_length)).strftime("%Y-%m-%d")
        
        return {
            "next_period": next_period,
            "predicted_cycle_length": cycle_length,
            "fertility_score": 0.5,  # Placeholder
            "status": "success"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)