from django.db import models
from authentication.models import Auth

class Course(models.Model) : 
    user = models.ForeignKey(Auth,on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=200)
    description = models.CharField()
    category = models.CharField(max_length=100)
    level = models.CharField(max_length=100)
    image = models.CharField(null=True)
    duration = models.IntegerField()
    durationIn = models.CharField(max_length=50)
    price = models.IntegerField()
    discount = models.IntegerField()
    free = models.BooleanField(default=False)
    live = models.BooleanField(default=False)
    color = models.CharField(max_length=10)
    createdAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.id)