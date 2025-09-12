# ingestion/mqtt_consumer.py
import paho.mqtt.client as mqtt
import json
from app.core.config import settings
from app.models.cassandra import insert_iot
from datetime import datetime

def on_connect(client, userdata, flags, rc):
    print("Connected to MQTT, subscribing to iot/#")
    client.subscribe("iot/#")

def on_message(client, userdata, msg):
    payload = json.loads(msg.payload.decode())
    # process payload -> write to DB
    insert_iot(
        device_id=payload.get("device_id"),
        ts=datetime.fromisoformat(payload.get("ts")),
        metric_type=payload.get("metric_type"),
        value=float(payload.get("value")),
        zone=payload.get("zone")
    )

def start_mqtt():
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(settings.MQTT_BROKER, settings.MQTT_PORT, 60)
    client.loop_start()
