from django.contrib import admin

from teacherReader.teacher.models import FairyTaleText


# Register your models here.

@admin.register(FairyTaleText)
class FairyTaleTextAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'text')