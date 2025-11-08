from .views import TopicList, TopicDetail, TopicCourse
from django.urls import path

urlpatterns = [
    path('',TopicList.as_view()),
    path('<int:id>/',TopicDetail.as_view()),
    path('course/<int:id>/',TopicCourse.as_view())
]
