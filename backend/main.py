import os
import joblib
import pandas as pd
import asyncio
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables (e.g., GEMINI_API_KEY)
load_dotenv()

from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI
app = FastAPI(title="NutriGrow Hybrid AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY", "YOUR_API_KEY_HERE")
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash')

# Global variables for our ML models
crop_model = None
analytics_model = None

# Load models on startup to ensure zero latency during user requests
@app.on_event("startup")
async def load_models():
    global crop_model, analytics_model
    try:
        # Load from the models folder
        crop_model = joblib.load("models/crop_recommender.pkl")
        analytics_model = joblib.load("models/farm_analytics.pkl")
        print("SUCCESS: ML Models loaded successfully into memory.")
    except Exception as e:
        print(f"ERROR: Error loading models: {e}")

# Define the data expected from the frontend
class SensorData(BaseModel):
    n: float
    p: float
    k: float
    moisture: float  # We will map this to 'humidity'
    # Adding defaults for values not currently on the frontend MVP
    temperature: float = 25.0 
    ph: float = 6.5
    rainfall: float = 100.0

@app.post("/api/analyze")
async def analyze_soil(data: SensorData):
    if not crop_model or not analytics_model:
        raise HTTPException(status_code=500, detail="ML Models are not loaded.")

    # 1. Prepare Data for Local ML
    # The models expect: ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
    input_df = pd.DataFrame([{
        'N': data.n,
        'P': data.p,
        'K': data.k,
        'temperature': data.temperature,
        'humidity': data.moisture,
        'ph': data.ph,
        'rainfall': data.rainfall
    }])

    # 2. Execute Local ML Predictions (Instantaneous)
    try:
        predicted_crop = crop_model.predict(input_df)[0]
        analytics = analytics_model.predict(input_df)[0]
        
        soil_health = analytics[0]
        damage_risk = analytics[1]
        water_needed = analytics[2]
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"ML Prediction failed: {e}")

    # 3. Construct the LLM Prompt
    prompt = f"""
    You are an expert Agronomist AI. The user has provided the following soil and sensor data:
    - Nitrogen: {data.n} mg/kg
    - Phosphorus: {data.p} mg/kg
    - Potassium: {data.k} mg/kg
    - Moisture/Humidity: {data.moisture}%
    
    Our predictive Machine Learning models have analyzed this data and concluded:
    - Recommended Crop: {predicted_crop}
    - Soil Health Score: {soil_health:.1f}%
    - Crop Damage Risk: {damage_risk:.1f}%
    - Additional Water Needed: {water_needed:.1f} mm
    
    Based on this data, provide a very concise, actionable plan for the farmer. 
    Explain why the soil health score is what it is, and give 2-3 bullet points on how to improve the soil for {predicted_crop} and manage the water. Keep it short and professional.
    """

    # 4. Stream the LLM Response
    async def generate_response():
        try:
            # We yield the ML results first so the frontend gets them immediately
            yield f"ML_RESULTS|{predicted_crop}|{soil_health:.1f}|{damage_risk:.1f}|{water_needed:.1f}___"
            
            # Then stream the LLM response
            response = model.generate_content(prompt, stream=True)
            for chunk in response:
                # Add a small async sleep to yield control to the event loop
                await asyncio.sleep(0.01) 
                if chunk.text:
                    yield chunk.text
        except Exception as e:
            yield f"Error generating LLM response: {str(e)}"

    return StreamingResponse(generate_response(), media_type="text/event-stream")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
