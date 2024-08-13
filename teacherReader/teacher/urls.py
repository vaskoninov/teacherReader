from django.urls import path

from teacherReader.teacher import views

urlpatterns = [
    path('', views.FairyTaleChooser.as_view(), name='fairy-tale-chooser'),
    path('<slug:slug>/start/', views.TeacherReaderView.as_view(), name='teacher-reader'),
    path('<slug:slug>/next-word/', views.NextWordView.as_view(), name='next-word'),
    path('<slug:slug>/previous-word/', views.PreviousWordView.as_view(), name='previous-word'),
    path('read-word/', views.ReadTheWord.as_view(), name='read-word'),
]
