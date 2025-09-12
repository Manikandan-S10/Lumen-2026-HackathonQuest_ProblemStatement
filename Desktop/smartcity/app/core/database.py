from cassandra.cluster import Cluster
from .config import settings

cluster = Cluster([settings.CASSANDRA_HOST])
session = cluster.connect()

def init_db():
    session.execute(f"""
        CREATE KEYSPACE IF NOT EXISTS {settings.CASSANDRA_KEYSPACE}
        WITH REPLICATION = {{ 'class': 'SimpleStrategy', 'replication_factor': 1 }}
    """)
    session.set_keyspace(settings.CASSANDRA_KEYSPACE)

init_db()

