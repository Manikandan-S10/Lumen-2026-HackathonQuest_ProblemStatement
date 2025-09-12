from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_alerts():
    return [
        {"id": 1, "type": "Outage", "zone": "South", "severity": "High"},
        {"id": 2, "type": "Congestion", "zone": "East", "severity": "Medium"},
    ]

