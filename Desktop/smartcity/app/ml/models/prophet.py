# ml/models/prophet.py
from prophet import Prophet

def train_prophet(df):
    m = Prophet()
    m.fit(df)
    return m
