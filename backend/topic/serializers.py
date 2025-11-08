from rest_framework import serializers
from .models import Topic

class TopicSerializiers(serializers.ModelSerializer) : 
    class Meta: 
        model = Topic
        fields = '__all__'