# services/rbac_service.py
def has_permission(user_role: str, resource: str, action: str) -> bool:
    # naive RBAC example
    permissions = {
        "admin": ["*"],
        "engineer": ["read", "write"]
    }
    if user_role == "admin":
        return True
    return action in permissions.get(user_role, [])
