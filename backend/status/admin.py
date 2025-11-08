from django.contrib import admin
from .models import Status

class StatusModel(admin.ModelAdmin) : 
    list_display = ('id','user','title','color','createdAt')

admin.site.register(Status, StatusModel)