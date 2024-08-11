from django.urls import path

from teacherReader.teacher import views

urlpatterns = [
    path('', views.TeacherReaderView.as_view(), name='teacher-reader'),
    path('next-word/', views.NextWordView.as_view(), name='next-word'),
    path('previous-word/', views.PreviousWordView.as_view(), name='previous-word'),
    path('read-word/', views.ReadTheWord.as_view(), name='read-word'),
]
