from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_heatmap_data():
    return {
        "zones": [
            {"zone": "North", "signal": 80},
            {"zone": "South", "signal": 55},
            {"zone": "East", "signal": 70},
            {"zone": "West", "signal": 90},
        ]
    }
