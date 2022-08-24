from django.contrib.auth.backends import ModelBackend
from rest_framework import authentication

from restaurant.models import UpdatedUser


class AuthNoPassword(ModelBackend):
    def authenticate(self, request, username=None, **kwargs):
        try:
            return UpdatedUser.objects.get(username=username)
        except UpdatedUser.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return UpdatedUser.objects.get(pk=user_id)
        except UpdatedUser.DoesNotExist:
            return None


class BearerAuthentication(authentication.TokenAuthentication):
    keyword = 'Bearer'
