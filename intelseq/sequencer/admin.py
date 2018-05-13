from django.contrib import admin

# Register your models here.

from .models import User, MasterPattern, UserPattern

admin.site.register(User)
admin.site.register(MasterPattern)
admin.site.register(UserPattern)

