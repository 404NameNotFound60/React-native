from rest_framework import serializers
from .models import Lesson

class LessonSerializiers(serializers.ModelSerializer) : 
    class Meta: 
        model = Lesson
        fields = '__all__'