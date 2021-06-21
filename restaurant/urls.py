from django.urls import path

from restaurant import views


urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('summary/', views.SummaryView.as_view(), name='summary'),
    path('staff/', views.StaffIndexView.as_view(), name='staff-index'),
    path('staff/login/', views.StaffLoginView.as_view(), name='staff-login'),
    path('staff/logout/', views.staff_logout, name='staff-logout'),
    path('staff/demand/<int:pk>/', views.DemandView.as_view(), name='demand'),
]

app_name = 'restaurant'
