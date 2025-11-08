from django.db import models
from authentication.models import Auth

class Category(models.Model) : 
    user = models.ForeignKey(Auth,on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=200)
    createdAt = models.DateTimeField(auto_now=True)