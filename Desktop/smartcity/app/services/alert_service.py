# services/alert_service.py
from uuid import uuid4
from datetime import datetime

def create_alert(zone: str, severity: int, message: str):
    alert = {"alert_id": str(uuid4()), "ts": datetime.utcnow(), "zone": zone, "severity": severity, "message": message}
    # persist into Cassandra or a queue
    return alert
