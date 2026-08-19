import re

with open('main.py', 'r') as f:
    content = f.read()

# Add imports
content = content.replace('from dotenv import load_dotenv', 'from dotenv import load_dotenv\nfrom supabase import create_client, Client')

# Add Supabase initialization after gemini config
supabase_init = """
supabase_url = os.getenv("SUPABASE_URL", "")
supabase_key = os.getenv("SUPABASE_KEY", "")
db: Client = None
if supabase_url and supabase_key:
    db = create_client(supabase_url, supabase_key)
"""
content = content.replace("model = genai.GenerativeModel('gemini-2.5-flash')", "model = genai.GenerativeModel('gemini-2.5-flash')\n" + supabase_init)

# Insert saving to supabase in analyze_soil
save_db = """
        if db:
            try:
                db.table("soil_analyses").insert({
                    "n": data.n,
                    "p": data.p,
                    "k": data.k,
                    "moisture": data.moisture,
                    "predicted_crop": predicted_crop,
                    "soil_health": soil_health,
                    "damage_risk": damage_risk,
                    "water_needed": water_needed
                }).execute()
            except Exception as db_e:
                print(f"Supabase Insert Error (create the table if missing): {db_e}")
"""
content = content.replace("        water_needed = analytics[2]", "        water_needed = analytics[2]\n" + save_db)

# Add /api/history and /api/stats
api_endpoints = """
@app.get("/api/history")
async def get_history():
    if not db: return []
    try:
        response = db.table("soil_analyses").select("*").order("created_at", desc=True).limit(50).execute()
        mapped = []
        for row in response.data:
            sh = row.get("soil_health", 0)
            condition = "Good" if sh > 70 else "Moderate" if sh > 40 else "Poor"
            mapped.append({
                "id": row.get("id"),
                "nitrogen": row.get("n"),
                "phosphorus": row.get("p"),
                "potassium": row.get("k"),
                "moisture": row.get("moisture"),
                "condition": condition,
                "score": round(sh),
                "date": row.get("created_at", "").split("T")[0] if row.get("created_at") else ""
            })
        return mapped
    except Exception as e:
        print(f"Failed to fetch history: {e}")
        return []

@app.get("/api/stats")
async def get_stats():
    if not db: return {"totalAnalyses": 0, "averageHealth": 0}
    try:
        response = db.table("soil_analyses").select("soil_health").execute()
        data = response.data
        if not data: return {"totalAnalyses": 0, "averageHealth": 0}
        total = len(data)
        avg_health = sum(d["soil_health"] for d in data) / total
        return {"totalAnalyses": total, "averageHealth": round(avg_health, 1)}
    except Exception as e:
        print(f"Failed to fetch stats: {e}")
        return {"totalAnalyses": 0, "averageHealth": 0}
"""
content = content.replace('class ChatRequest(BaseModel):', api_endpoints + '\nclass ChatRequest(BaseModel):')

with open('main.py', 'w') as f:
    f.write(content)

print("Updated main.py")
