from django.db import models
from authentication.models import Auth

class Bank(models.Model) : 
    user = models.ForeignKey(Auth,on_delete=models.CASCADE, null=True)
    bank = models.CharField(max_length=500)
    acountHolder = models.CharField(max_length=250)
    acNo = models.BigIntegerField()
    ifsc = models.CharField(max_length=50)
    status = models.CharField(max_length=50, default="pending")
    createdAt = models.DateTimeField(auto_now=True)

    class Meta : 
        unique_together = (("user",),)