from django import forms
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

from restaurant.models import Demand


class DemandForm(forms.ModelForm):

    class Meta:
        model = Demand
        fields = ['status']


class StaffLoginForm(forms.Form):
    username = forms.CharField()
    role = forms.IntegerField()

    def clean(self):
        try:
            user = User.objects.get(username=self.cleaned_data.get('username'))
        except User.DoesNotExist:
            raise ValidationError('Username does not exist')
        if user.employee.role != self.cleaned_data.get('role'):
            raise ValidationError('User with selected role does not exist')
        self.user = user
