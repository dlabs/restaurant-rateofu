from django.contrib import admin

from restaurant.models import Employee, Item, Order


admin.site.register(Employee)
admin.site.register(Item)
admin.site.register(Order)
