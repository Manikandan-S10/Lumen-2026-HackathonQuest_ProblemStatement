# models/iot_data.py
from pydantic import BaseModel
from datetime import datetime

class IoTRecord(BaseModel):
    device_id: str
    ts: datetime
    metric_type: str
    value: float
    zone: str
