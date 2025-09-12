# services/auth_service.py
from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta
from app.core.config import settings

pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")

# For demo verify_user uses in-memory users
from app.models.users import USERS

def verify_user(username: str, password: str):
    # Replace with DB lookup + hashed password verification
    user = USERS.get(username)
    if not user:
        return None
    # for demo, skip password check; in prod use pwd_ctx.verify(password, user["password_hash"])
    return {"username": username, "role": user["role"]}

def create_access_token(data: dict, expires_minutes: int = 60*24):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})
    token = jwt.encode(to_encode, settings.JWT_SECRET, algorithm="HS256")
    return token
