from django.contrib import admin
from .models import Lesson

class LessonModel(admin.ModelAdmin) : 
    list_display = ('id','topic','title','createdAt')

admin.site.register(Lesson,LessonModel)