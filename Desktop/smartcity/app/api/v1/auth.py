# app/api/v1/auth.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.auth_service import create_access_token, verify_user

router = APIRouter()

class LoginPayload(BaseModel):
    username: str
    password: str

@router.post("/login")
def login(payload: LoginPayload):
    user = verify_user(payload.username, payload.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user["username"], "role": user["role"]})
    return {"access_token": token, "token_type": "bearer"}
