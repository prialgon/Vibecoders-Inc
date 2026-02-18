from rest_framework import serializers

def password_validation(password: str) -> str:
    if len(password) <= 8:
        raise serializers.ValidationError(
            {"password": "Minimum length is more than 8 characters."}
        )
    
    if not any(character == character.upper() for character in password):
        raise serializers.ValidationError(
            {"password": "At least one character must be uppercase."}
        )
    
    if not any(character == character.lower() for character in password):
        raise serializers.ValidationError(
            {"password": "At least one character must be lowercase."}
        )
    
    return password