from django.db import models
from django.contrib.auth import get_user_model
from ml.price_optimizer import PriceOptimizer

User = get_user_model()

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('VEGETABLES', 'Vegetables'),
        ('FRUITS', 'Fruits'),
        ('GRAINS', 'Grains'),
        ('LIVESTOCK', 'Livestock'),
    ]
    
    seller = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    optimized_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    location = models.CharField(max_length=255)
    stock = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        """Override save to calculate optimized price"""
        if not self.optimized_price:
            optimizer = PriceOptimizer()
            features = {
                'category': self.category,
                'location': self.location,
                'stock': self.stock,
                # Add more features as needed
            }
            self.optimized_price = optimizer.predict_optimal_price(features)
        super().save(*args, **kwargs)