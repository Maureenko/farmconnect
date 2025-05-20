from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from users.models import User, FarmerProfile
from products.models import Product
from orders.models import Order
from .serializers import (
    UserSerializer, FarmerProfileSerializer,
    ProductSerializer, OrderSerializer
)

class ProductListView(generics.ListCreateAPIView):
    queryset = Product.objects.filter(available=True)
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(farmer=self.request.user)

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class OrderListView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role == User.FARMER:
            return Order.objects.filter(farmer=user)
        return Order.objects.filter(buyer=user)
    
    def perform_create(self, serializer):
        serializer.save(buyer=self.request.user)