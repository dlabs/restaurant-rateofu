from rest_framework import viewsets, status, mixins
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.exceptions import NotAuthenticated
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from restaurant.auth import BearerAuthentication
from restaurant.models import Item, Order, OrderItem
from restaurant.serializers import ItemSerializer, OrdersRetrieveSerializer, OrderSerializer, OrderItemsListSerializer, \
    StaffTokenSerializer, OrdersListSerializer


# POST /api/login
class StaffLogin(ObtainAuthToken):
    serializer_class = StaffTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'bearer_token': token.key})


# GET /api/menu-items
class ItemsViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def list(self, request, *args, **kwargs):
        try:
            serializer = self.serializer_class(self.queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# This viewset is used for GET (retrieve, list) and POST
class OrdersViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.ListModelMixin):
    queryset = Order.objects.all()
    serializer_class = OrdersRetrieveSerializer

    def get_queryset(self):
        if self.request.query_params.get('has_unfinished_items') and self.request.user.is_authenticated:
            return self.queryset.filter(order_items__status__in=['ordered', 'preparing', 'ready_to_serve'])
        else:
            return self.queryset

    def retrieve(self, request, pk=None, *args, **kwargs):
        try:
            order = self.get_queryset().get(order_id=pk)
        except self.get_queryset().model.DoesNotExist:
            return Response(False, status=status.HTTP_404_NOT_FOUND)
        try:
            serializer = self.serializer_class(order)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        orders = self.get_queryset().distinct()
        if request.user.is_authenticated:
            serializer = OrdersListSerializer(orders, many=True,
                                              context=self.request.query_params.get('has_unfinished_items'))
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": NotAuthenticated.default_detail}, status=status.HTTP_401_UNAUTHORIZED)

    def create(self, request, *args, **kwargs):
        try:
            serializer = OrderSerializer(data=request.data)
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class OrderItemsViewSet(viewsets.GenericViewSet, mixins.UpdateModelMixin):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemsListSerializer
    authentication_classes = [BearerAuthentication]
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.serializer_class(instance, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(True, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

