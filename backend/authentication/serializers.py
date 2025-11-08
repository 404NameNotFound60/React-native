from rest_framework import serializers
from .models import Auth

class AuthticationSerializer(serializers.ModelSerializer) : 
    class Meta : 
        model = Auth
        fields = '__all__'

    def validate(self, attrs):
        return super().validate(attrs)