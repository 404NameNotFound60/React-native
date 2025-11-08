from django.db import models
from course.models import Course

class Topic(models.Model) : 
    course = models.ForeignKey(Course,on_delete=models.CASCADE, null=True)
    title = models.CharField()
    createdAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.id)