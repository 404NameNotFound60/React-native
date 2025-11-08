from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('status/',include('status.urls')),
    path('auth/',include('authentication.urls')),
    path('bank/',include('bank.urls')),
    path('course/',include('course.urls')),
    path('category/',include('category.urls')),
    path('topic/',include('topic.urls')),
    path('lesson/',include('lesson.urls')),
]
