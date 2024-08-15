from django.shortcuts import render
from rest_framework.generics import ListAPIView

from teacherReader.api_routes.serializers import FairyTaleSerializer
from teacherReader.teacher.models import FairyTaleText


class TalesListView(ListAPIView):
    serializer_class = FairyTaleSerializer
    queryset = FairyTaleText.objects.all()
