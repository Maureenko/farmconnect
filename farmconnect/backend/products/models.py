from django.db import models
from core.models import TimeStampedModel
from users.models import User

class Category(TimeStampedModel):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return self.name

class Product(TimeStampedModel):
    VEGETABLES = 'vegetables'
    FRUITS = 'fruits'
    DAIRY = 'dairy'
    GRAINS = 'grains'
    OTHER = 'other'
    
    CATEGORY_CHOICES = [
        (VEGETABLES, 'Vegetables'),
        (FRUITS, 'Fruits'),
        (DAIRY, 'Dairy'),
        (GRAINS, 'Grains'),
        (OTHER, 'Other'),
    ]
    
    KG = 'kg'
    G = 'g'
    LB = 'lb'
    PIECE = 'piece'
    DOZEN = 'dozen'
    
    UNIT_CHOICES = [
        (KG, 'Kilogram'),
        (G, 'Gram'),
        (LB, 'Pound'),
        (PIECE, 'Piece'),
        (DOZEN, 'Dozen'),
    ]
    
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    unit = models.CharField(max_length=10, choices=UNIT_CHOICES, default=KG)
    farmer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products')
    available = models.BooleanField(default=True)
    organic = models.BooleanField(default=False)
    harvest_date = models.DateField(null=True, blank=True)
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    
    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"