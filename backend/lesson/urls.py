from .views import LessonList, LessonDetail, TopicLesson
from django.urls import path

urlpatterns = [
    path('',LessonList.as_view()),
    path('<int:id>/',LessonDetail.as_view()),
    path('topic/<int:id>/',TopicLesson.as_view())
]
