from django.db import models
from topic.models import Topic

class Lesson(models.Model) : 
    topic = models.ForeignKey(Topic,on_delete=models.CASCADE, null=True)
    title = models.CharField()
    video = models.CharField(null=True)
    assets = models.CharField(null=True)
    createdAt = models.DateTimeField(auto_now=True)