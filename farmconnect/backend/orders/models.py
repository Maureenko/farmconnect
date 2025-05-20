from django.db import models
from core.models import TimeStampedModel
from users.models import User
from products.models import Product

class Order(TimeStampedModel):
    PENDING = 'pending'
    CONFIRMED = 'confirmed'
    SHIPPED = 'shipped'
    DELIVERED = 'delivered'
    CANCELLED = 'cancelled'
    
    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (CONFIRMED, 'Confirmed'),
        (SHIPPED, 'Shipped'),
        (DELIVERED, 'Delivered'),
        (CANCELLED, 'Cancelled'),
    ]
    
    CARD = 'card'
    CASH = 'cash'
    BANK = 'bank'
    
    PAYMENT_METHOD_CHOICES = [
        (CARD, 'Credit Card'),
        (CASH, 'Cash on Delivery'),
        (BANK, 'Bank Transfer'),
    ]
    
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    farmer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='farmer_orders')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_address = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=PENDING)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    payment_status = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Order #{self.id} - {self.get_status_display()}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return f"{self.quantity} x {self.product.name}"