# print_settings.py
from app.core.config import settings
print(settings.model_dump())   # prints loaded settings as dict
