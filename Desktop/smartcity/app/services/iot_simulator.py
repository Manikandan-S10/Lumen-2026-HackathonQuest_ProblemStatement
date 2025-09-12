from app.models.cassandra import insert_iot


from datetime import datetime
import random
import time

def simulate_iot_data():
    devices = ['device_001', 'device_101', 'device_102']
    zones = ['Sector 5', 'Sector 12', 'Zone-B']
    metrics = ['temperature', 'humidity', 'air_quality']

    while True:
        device_id = random.choice(devices)
        zone = random.choice(zones)
        metric_type = random.choice(metrics)
        value = round(random.uniform(20, 100), 2)
        ts = datetime.now()

        insert_iot(device_id, ts, metric_type, value, zone)
        print(f"Inserted: {device_id} | {metric_type} | {value} | {zone} | {ts}")

        time.sleep(5)  # insert every 5 seconds

if __name__ == "__main__":
    simulate_iot_data()
