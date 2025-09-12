from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_dashboard():
    return {
        "mobility": {"traffic_flow": "Moderate", "avg_speed": 45},
        "energy": {"power_usage": 1234, "outages": 2},
        "connectivity": {"5G_coverage": "85%", "6G_coverage": "60%"}
    }

