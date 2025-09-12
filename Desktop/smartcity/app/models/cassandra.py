# models/cassandra.py
from app.core.database import init_cassandra
from datetime import datetime
import random
import time

session = init_cassandra()  # reuse session

def insert_iot(device_id: str, ts, metric_type: str, value: float, zone: str):
    cql = """
    INSERT INTO iot_data (device_id, ts, metric_type, value, zone)
    VALUES (%s, %s, %s, %s, %s)
    """
    session.execute(cql, (device_id, ts, metric_type, value, zone))

def simulate_iot_data():
    devices = ['device_001', 'device_002', 'device_003']
    zones = ['Sector 5', 'Sector 12', 'Sector 20']
    metrics = ['temperature', 'humidity', 'air_quality']

    while True:
        device = random.choice(devices)
        zone = random.choice(zones)
        metric = random.choice(metrics)
        value = round(random.uniform(20, 100), 2)  # random value for metric
        ts = datetime.now()

        insert_iot(device, ts, metric, value, zone)
        print(f"Inserted: {device}, {metric}, {value}, {zone}, {ts}")

        time.sleep(5)  # wait 5 seconds before next reading

