from django.contrib import admin
from .models import Bank

class BankModel(admin.ModelAdmin) : 
    list_display = ('id','user','bank','acountHolder','acNo','ifsc','createdAt')

admin.site.register(Bank, BankModel)