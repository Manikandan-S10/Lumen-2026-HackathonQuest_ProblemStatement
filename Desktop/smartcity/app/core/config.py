import os

class Settings:
    CASSANDRA_HOST = os.getenv("CASSANDRA_HOST", "cassandra")
    CASSANDRA_KEYSPACE = os.getenv("CASSANDRA_KEYSPACE", "smartcity")

settings = Settings()

