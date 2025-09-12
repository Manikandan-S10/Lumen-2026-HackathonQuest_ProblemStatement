# ingestion/kafka_consumer.py
from kafka import KafkaConsumer
import json
from app.core.config import settings
from app.models.cassandra import insert_iot
from datetime import datetime

def start_consumer(topic="iot_topic", group_id="smartcity-group"):
    consumer = KafkaConsumer(
        topic,
        bootstrap_servers=[settings.KAFKA_BOOTSTRAP],
        auto_offset_reset='earliest',
        group_id=group_id,
        value_deserializer=lambda x: json.loads(x.decode('utf-8'))
    )
    print("Kafka consumer started on", settings.KAFKA_BOOTSTRAP)
    for msg in consumer:
        record = msg.value
        # simple mapping
        insert_iot(
            device_id=record.get("device_id"),
            ts=datetime.fromisoformat(record.get("ts")),
            metric_type=record.get("metric_type"),
            value=float(record.get("value")),
            zone=record.get("zone")
        )
