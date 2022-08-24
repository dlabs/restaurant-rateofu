from django.contrib import admin
from restaurant.models import Item, UpdatedUser, Table, Order, OrderItem
from rest_framework.authtoken.admin import TokenAdmin

TokenAdmin.raw_id_fields = ['user']


class UpdatedUserAdmin(admin.ModelAdmin):
    search_fields = ('username', 'role')
    list_filter = ('role', )
    list_display = ('username', 'role')


class ItemAdmin(admin.ModelAdmin):
    search_fields = ('item_id', )
    list_filter = ('item_type', )
    list_display = ('item_title', 'item_id', 'item_price', 'item_type')


class TableAdmin(admin.ModelAdmin):
    search_fields = ('table_id', )
    list_display = ('table_id', )


class OrderAdmin(admin.ModelAdmin):
    search_fields = ('order_id', 'table')
    list_display = ('order_id', 'table_id', 'order_total')


class OrderItemAdmin(admin.ModelAdmin):
    search_fields = ('order_item_id', 'o', 'i')
    list_display = ('order_item_id', 'o', 'item', 'status')

    def item(self, obj):
        return obj.i.item_title

    def order(self, obj):
        return obj.o.order_id


admin.site.register(UpdatedUser, UpdatedUserAdmin)
admin.site.register(Item, ItemAdmin)
admin.site.register(Table, TableAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
