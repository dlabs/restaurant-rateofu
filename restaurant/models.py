from django.contrib.auth.models import User
from django.db import models
from django.urls import reverse


class Employee(models.Model):
    WAITER = 0
    BARMAN = 1
    CHEF = 2
    ROLE_CHOICES = [
        (WAITER, 'Waiter'),
        (BARMAN, 'Barman'),
        (CHEF, 'Chef'),
    ]
    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES)
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='employee')

    def __str__(self):
        return f'{self.get_role_display()} {self.user.username}'


class Item(models.Model):
    FOOD = 0
    DRINK = 1
    TYPE_CHOICES = [
        (FOOD, 'Food'),
        (DRINK, 'Drink'),
    ]
    type = models.PositiveSmallIntegerField(choices=TYPE_CHOICES)
    name = models.CharField(max_length=100)
    price = models.FloatField()

    def __str__(self):
        return self.name


class Demand(models.Model):
    NEW = 0
    PROCESSED = 1
    READY = 2
    SERVED = 3
    STATUS_CHOICES = [
        (NEW, 'New'),
        (PROCESSED, 'Processed'),
        (READY, 'Ready'),
        (SERVED, 'Served'),
    ]
    status = models.PositiveSmallIntegerField(
        choices=STATUS_CHOICES, default=NEW)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f'{self.item} ({self.quantity}), {self.get_status_display()}'

    def get_absolute_url(self):
        return reverse('restaurant:demand', args=[self.pk])

    def cost(self):
        return self.item.price * self.quantity


class Order(models.Model):
    demands = models.ManyToManyField(Demand)
    complete = models.BooleanField(default=False)

    def cost(self):
        return sum(demand.cost() for demand in self.demands.all())

    def served(self):
        for demand in self.demands.all():
            if demand.status != Demand.SERVED:
                return False
        return True
