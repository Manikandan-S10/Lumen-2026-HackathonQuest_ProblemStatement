# models/users.py
# simple in-memory users for demo
USERS = {
    "admin": {"username": "admin", "password_hash": "$2b$12$invalidhash", "role": "admin"},
    "engineer": {"username": "engineer", "password_hash": "$2b$12$invalidhash", "role": "engineer"},
}
