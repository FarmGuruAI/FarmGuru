import streamlit as st
import time
import requests
import json

st.set_page_config(
    page_title="NutriGrow Dashboard",
    page_icon="🌱",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for extra professional styling
st.markdown("""
    <style>
    h1, h2, h3 { color: #0B3C5D !important; }
    .title-container {
        background-color: #E6F2EB;
        padding: 20px;
        border-radius: 10px;
        border-left: 5px solid #2E8B57;
        margin-bottom: 30px;
    }
    div[data-testid="metric-container"] {
        background-color: #F0F8FF;
        border: 1px solid #D0E1F9;
        padding: 10px;
        border-radius: 5px;
    }
    .result-box {
        background-color: #FFFFFF;
        border: 1px solid #2E8B57;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    }
    </style>
""", unsafe_allow_html=True)

st.markdown("""
    <div class="title-container">
        <h1 style="margin:0;">NutriGrow AI Manager</h1>
        <p style="margin:0; color:#102A43;">Precision Nutrient and Water Management powered by Hybrid AI</p>
    </div>
""", unsafe_allow_html=True)

col1, col2 = st.columns([1, 2])

with col1:
    st.subheader("📊 Sensor Data Input")
    st.markdown("Enter real-time soil and moisture readings below:")
    
    with st.form("sensor_form"):
        n_val = st.number_input("Nitrogen (N) mg/kg", min_value=0, max_value=300, value=45, step=1)
        p_val = st.number_input("Phosphorus (P) mg/kg", min_value=0, max_value=300, value=20, step=1)
        k_val = st.number_input("Potassium (K) mg/kg", min_value=0, max_value=300, value=30, step=1)
        moisture_val = st.slider("Soil Moisture (%)", min_value=0, max_value=100, value=35)
        
        submit_button = st.form_submit_button(label="Analyze Soil Health", type="primary")

with col2:
    st.subheader("🧠 Agronomic Analysis")
    
    if not submit_button:
        st.info("👈 Enter sensor data and click 'Analyze Soil Health' to generate insights.")
        mc1, mc2, mc3 = st.columns(3)
        mc1.metric("Nitrogen", "--")
        mc2.metric("Phosphorus", "--")
        mc3.metric("Potassium", "--")
    else:
        mc1, mc2, mc3 = st.columns(3)
        mc1.metric("Nitrogen", f"{n_val} mg/kg")
        mc2.metric("Phosphorus", f"{p_val} mg/kg")
        mc3.metric("Potassium", f"{k_val} mg/kg")
        
        st.markdown("#### 1. Predictive ML Model Output")
        
        # Placeholders for ML metrics
        ml_col1, ml_col2, ml_col3 = st.columns(3)
        ml_metric_1 = ml_col1.empty()
        ml_metric_2 = ml_col2.empty()
        ml_metric_3 = ml_col3.empty()
        
        st.markdown("#### 2. LLM Prescriptive Advice")
        res_box = st.empty()
        
        # Call the FastAPI Backend
        payload = {
            "n": n_val,
            "p": p_val,
            "k": k_val,
            "moisture": moisture_val
        }
        
        try:
            with requests.post("http://localhost:8000/api/analyze", json=payload, stream=True) as r:
                r.raise_for_status()
                
                full_text = ""
                ml_parsed = False
                
                for chunk in r.iter_content(chunk_size=None):
                    if chunk:
                        text_chunk = chunk.decode("utf-8")
                        
                        # Check if this chunk contains our ML results header
                        if "___" in text_chunk and not ml_parsed:
                            parts = text_chunk.split("___")
                            header = parts[0]
                            text_chunk = parts[1] # The rest is LLM text
                            
                            # Parse header: ML_RESULTS|Crop|Health|Damage|Water
                            h_parts = header.split("|")
                            if len(h_parts) == 5:
                                ml_metric_1.metric("Best Crop", h_parts[1])
                                ml_metric_2.metric("Soil Health", f"{h_parts[2]}%")
                                ml_metric_3.metric("Water Needed", f"{h_parts[4]} mm")
                            
                            ml_parsed = True
                            
                        # Append and display LLM text
                        full_text += text_chunk
                        res_box.markdown(f'<div class="result-box">{full_text}▌</div>', unsafe_allow_html=True)
                
                # Final render without cursor
                res_box.markdown(f'<div class="result-box">{full_text}</div>', unsafe_allow_html=True)
                
        except requests.exceptions.ConnectionError:
            st.error("❌ Cannot connect to Backend. Is FastAPI running on port 8000?")
        except Exception as e:
            st.error(f"❌ Error during analysis: {e}")
