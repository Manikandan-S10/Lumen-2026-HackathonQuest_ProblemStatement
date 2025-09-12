from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import dashboard, heatmaps, alerts, auth

app = FastAPI(title="Smart City 6G API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(dashboard.router, prefix="/api/v1/dashboard", tags=["Dashboard"])
app.include_router(heatmaps.router, prefix="/api/v1/heatmaps", tags=["Heatmaps"])
app.include_router(alerts.router, prefix="/api/v1/alerts", tags=["Alerts"])




