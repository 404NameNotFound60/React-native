from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Category

class CategoryModel(admin.ModelAdmin) : 
    list_display = (
        'id',
        'user',
        'title',
        'createdAt'
    )

admin.site.register(Category, CategoryModel)