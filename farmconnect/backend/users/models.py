from django.contrib.auth.models import AbstractUser
from django.db import models
from core.models import TimeStampedModel, Location

class User(AbstractUser, TimeStampedModel):
    FARMER = 'farmer'
    BUYER = 'buyer'
    ADMIN = 'admin'
    
    ROLE_CHOICES = [
        (FARMER, 'Farmer'),
        (BUYER, 'Buyer'),
        (ADMIN, 'Admin'),
    ]
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default=BUYER)
    phone = models.CharField(max_length=20, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    
    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"

class FarmerProfile(Location, TimeStampedModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='farmer_profile')
    farm_name = models.CharField(max_length=255)
    farm_description = models.TextField(blank=True)
    certification = models.CharField(max_length=255, blank=True)
    years_of_experience = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return f"{self.farm_name} ({self.user.username})"