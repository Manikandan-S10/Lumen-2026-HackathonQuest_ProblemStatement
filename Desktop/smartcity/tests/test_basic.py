# tests/test_basic.py
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_overview():
    resp = client.get("/api/v1/dashboard/overview")
    assert resp.status_code == 200
    assert "devices" in resp.json()
