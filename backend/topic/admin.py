from django.contrib import admin
from .models import Topic

class TopicModel(admin.ModelAdmin) : 
    list_display = ('id','course','title','createdAt')

admin.site.register(Topic,TopicModel)