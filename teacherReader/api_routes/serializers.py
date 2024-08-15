from rest_framework import serializers

from teacherReader.teacher.models import FairyTaleText


class FairyTaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = FairyTaleText
        fields = '__all__'
