# app/middleware/rbac.py
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request, HTTPException
from typing import Callable
from app.core.config import settings
from jose import JWTError, jwt   # uses python-jose

class RoleMiddleware(BaseHTTPMiddleware):
    """
    Starlette/FastAPI middleware that decodes a Bearer JWT (if present)
    and attaches payload to `request.state.user`. On invalid token -> 401.
    If no token, request.state.user = {"role": "anonymous"}.
    """
    async def dispatch(self, request: Request, call_next: Callable):
        auth = request.headers.get("Authorization") or request.headers.get("authorization")
        if auth and auth.startswith("Bearer "):
            token = auth.split(" ", 1)[1].strip()
            try:
                payload = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
                # payload is now accessible via request.state.user in routes
                request.state.user = payload
            except JWTError:
                raise HTTPException(status_code=401, detail="Invalid authentication token")
        else:
            request.state.user = {"role": "anonymous"}
        response = await call_next(request)
        return response

# Export the class under a name main.py expects:
rbac_middleware = RoleMiddleware
