from django.contrib import admin
from .models import Course

class CourseModel(admin.ModelAdmin) : 
    list_display = (
        'id',
        'user',
        'title',
        'description',
        'level',
        'image',
        'duration',
        'durationIn',
        'price',
        'discount',
        'free',
        'live',
        'createdAt'
    )

admin.site.register(Course, CourseModel)