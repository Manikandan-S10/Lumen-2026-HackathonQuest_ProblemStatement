# ingestion/processors.py
def validate_record(record: dict) -> bool:
    # add validation logic
    required = ["device_id", "ts", "metric_type", "value", "zone"]
    return all(k in record for k in required)
