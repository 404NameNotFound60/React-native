from .views import CourseList,CourseDetail,CourseExtra
from django.urls import path

urlpatterns = [
    path('',CourseList.as_view()),
    path('<int:userId>/',CourseDetail.as_view()),
    path('extra/<int:courseId>/',CourseExtra.as_view()),
]
