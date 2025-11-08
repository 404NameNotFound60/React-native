from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Auth

class AuthAdmin(UserAdmin) : 
    list_display = (
        'id',
        'username',
        'password',
        'email',
        'fullname',
        'gender',
        'country',
        'isMobileVerified',
        'isEmailVerified',
        'is_active',
        'is_staff',
        'date_joined'
    )

admin.site.register(Auth, AuthAdmin)