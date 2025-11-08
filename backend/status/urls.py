from .views import StatusList, StatusDetail
from django.urls import path

urlpatterns = [
    path('',StatusList.as_view()),
    path('<int:id>/',StatusDetail.as_view())
]
