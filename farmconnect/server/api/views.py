from rest_framework import generics, permissions
from rest_framework.response import Response
from products.models import Product
from api.serializers import ProductSerializer
from ml.price_optimizer import PriceOptimizer

class ProductListView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        # Add filtering logic
        category = self.request.query_params.get('category')
        location = self.request.query_params.get('location')
        
        if category:
            queryset = queryset.filter(category=category)
        if location:
            queryset = queryset.filter(location__icontains=location)
            
        return queryset

class PriceOptimizationView(generics.GenericAPIView):
    permission_classes = [permissions.IsAdminUser]
    
    def post(self, request):
        """Retrain the price optimization model"""
        optimizer = PriceOptimizer()
        # Get training data from database
        products = Product.objects.all().values()
        df = pd.DataFrame(products)
        
        # Preprocess data
        X = df[['category', 'location', 'stock']]  # Features
        y = df['price']  # Target
        
        optimizer.train(X, y)
        return Response({"status": "Model retrained successfully"})