from django.contrib import admin

from restaurant.models import Demand, Employee, Item, Order


admin.site.register(Demand)
admin.site.register(Employee)
admin.site.register(Item)
admin.site.register(Order)
