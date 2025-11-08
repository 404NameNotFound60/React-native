from .views import CategoryList,CategoryDetail
from django.urls import path

urlpatterns = [
    path('',CategoryList.as_view()),
    path('<int:id>/',CategoryDetail.as_view())
]
