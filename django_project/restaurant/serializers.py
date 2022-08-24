from django.contrib.auth import authenticate
from django.db.models import F, Q
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from restaurant.models import Item, Order, OrderItem, Table


class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = ['item_id', 'item_title', 'item_price', 'item_description', 'item_type', 'item_image']


class OrderItemsListSerializer(serializers.ModelSerializer):
    item_id = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ('order_item_id', 'item_id', 'status')

    def get_item_id(self, obj):
        item = Item.objects.get(item_id=obj.i.item_id)
        obj.i = item
        obj.save()
        return obj.i.item_id


class ItemsListSerializer(serializers.ModelSerializer):
    item_id = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['item_id', 'quantity']

    def get_item_id(self, obj):
        return obj.i.item_id


class OrderSerializer(serializers.Serializer):

    class Meta:
        fields = ['table_id', 'items']

    def to_internal_value(self, data):
        try:
            table, _ = Table.objects.get_or_create(table_id=data['table_id'])
            order = Order.objects.create(table_id_id=table.table_id)
            for item in data['items']:
                OrderItem.objects.create(i_id=item['item_id'], quantity=item['quantity'], o_id=order.order_id, status='ordered')
            order_items = OrderItem.objects.filter(o_id=order.order_id).annotate(item_id=F('i_id')).values('order_item_id', 'item_id', 'status')
            return table, order, order_items
        except KeyError as e:
            raise serializers.ValidationError(e)
        except ValueError as e:
            raise serializers.ValidationError(e)

    def to_representation(self, obj):
        return {
            "table_id": obj[0].table_id,
            "order_id": obj[1].order_id,
            "order_items": obj[2],
        }


class OrdersRetrieveSerializer(serializers.ModelSerializer):
    order_items = OrderItemsListSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['table_id', 'order_id', 'order_items', 'order_total']


class OrdersListSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['table_id', 'order_id', 'order_items']

    def get_order_items(self, obj):
        order_items_qs = OrderItem.objects.filter(o__order_id=obj.order_id)
        if self.context:
            order_items_qs = order_items_qs.filter(Q(status__in=['ordered', 'preparing', 'ready_to_serve'])).select_related()
        serializer = OrderItemsListSerializer(instance=order_items_qs, many=True, context=self.context)

        return serializer.data


class OrderItemsSerializer(serializers.ModelSerializer):
    item_id = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['order_item_id', 'item_id',  'status']

    def get_item_id(self, obj):
        return str(obj.i.item_id)


# Modified from base TokenSerializer, since we are not using password it is not included here
class StaffTokenSerializer(serializers.Serializer):
    username = serializers.CharField(
        label=_("Username"),
        write_only=True
    )
    token = serializers.CharField(
        label=_("Token"),
        read_only=True
    )

    def validate(self, attrs):
        username = attrs.get('username')
        if username:
            user = authenticate(request=self.context.get('request'), username=username)
            if not user:
                msg = _('Unable to log in with provided credentials.')
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = _('Must include "username"')
            raise serializers.ValidationError(msg, code='authorization')
        attrs['user'] = user
        return attrs

