from django.urls import path

from teacherReader.api_routes import views

urlpatterns = [
    path("tales-list/", views.TalesListView.as_view(), name="tales-list"),
]
