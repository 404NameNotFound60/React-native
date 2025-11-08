from .views import BankAcount, BankAcountByUser
from django.urls import path

urlpatterns = [
    path('',BankAcount.as_view()),
    path('<int:userId>/',BankAcountByUser.as_view()),
]