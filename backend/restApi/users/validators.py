from rest_framework import serializers
import re

def password_validation(password: str) -> str:
    if len(password) < 8:
        raise serializers.ValidationError(
            {"password": "Minimum length is 8 characters."}
        )
    
    if not re.search(r"[A-Z]", password):
        raise serializers.ValidationError(
            {"password": "At least one character must be uppercase."}
        )
    
    if not re.search(r"[a-z]", password):
        raise serializers.ValidationError(
            {"password": "At least one character must be lowercase."}
        )
    
    return password