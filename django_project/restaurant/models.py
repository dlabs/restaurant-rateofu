import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import Sum, F


class UpdatedUser(AbstractUser):
    ROLES = [('chef', 'Chef'), ('barman', 'Barman'), ('waiter', 'Waiter')]

    username = models.CharField(unique=True, max_length=64, editable=True, verbose_name="Uporabniško ime")
    role = models.CharField(max_length=16, choices=ROLES, verbose_name="User roles")

    class Meta:
        verbose_name_plural = "Users"
        verbose_name = "User"


class Table(models.Model):
    table_id = models.CharField(primary_key=True, max_length=64, verbose_name="Table ID")

    class Meta:
        verbose_name_plural = "Tables"
        verbose_name = "Table"


class Item(models.Model):
    TYPES = [("food", "Food"), ("drink", "Drink")]

    item_id = models.UUIDField(primary_key=True, default=uuid.uuid1, editable=True, verbose_name="Item ID")
    item_title = models.CharField(max_length=256, verbose_name="Title")
    item_price = models.FloatField(verbose_name="Price")
    item_description = models.CharField(max_length=256, verbose_name="Description")
    item_type = models.CharField(choices=TYPES, max_length=256, verbose_name="Type")
    item_image = models.URLField(verbose_name="Image URL")

    class Meta:
        verbose_name_plural = "Items"
        verbose_name = "Item"


class Order(models.Model):
    order_id = models.UUIDField(primary_key=True, default=uuid.uuid1, editable=True, verbose_name="Order ID")
    table_id = models.ForeignKey(Table, on_delete=models.CASCADE, verbose_name="Related Table")

    class Meta:
        verbose_name_plural = "Orders"
        verbose_name = "Order"

    @property
    def order_total(self):
        return OrderItem.objects.filter(o__order_id=self.order_id).aggregate(
            val=Sum(F('i__item_price') * F('quantity'), default=0))['val']


class OrderItem(models.Model):
    STATUS = [("ordered", "Ordered"), ("preparing", "Preparing"),
              ("ready_to_serve", "Ready to serve"), ("delivered", "Delivered")]

    order_item_id = models.UUIDField(primary_key=True, default=uuid.uuid1, editable=True, verbose_name="Order-Item ID")
    o = models.ForeignKey(Order, null=True, blank=True, on_delete=models.CASCADE, verbose_name="Order", related_name='order_items')
    i = models.ForeignKey(Item, null=True, blank=True,  on_delete=models.CASCADE, verbose_name="Item ID", related_name='items')
    quantity = models.IntegerField(default=0, verbose_name="Quantity of the item in the order")
    status = models.CharField(choices=STATUS, max_length=256, verbose_name="Status")

    class Meta:
        verbose_name_plural = "OrderItems"
        verbose_name = "OrderItem"

