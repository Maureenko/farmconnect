from rest_framework import serializers
from users.models import User, FarmerProfile
from products.models import Product, Category
from orders.models import Order, OrderItem

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'first_name', 'last_name', 'phone']

class FarmerProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = FarmerProfile
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    farmer = UserSerializer(read_only=True)
    
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['farmer']

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    buyer = UserSerializer(read_only=True)
    farmer = UserSerializer(read_only=True)
    
    class Meta:
        model = Order
        fields = '__all__'