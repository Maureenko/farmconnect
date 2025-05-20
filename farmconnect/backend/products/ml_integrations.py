import joblib
import pandas as pd
from django.conf import settings
import os

class PriceOptimizer:
    def __init__(self):
        model_path = os.path.join(settings.BASE_DIR, 'ml/models/price_model.pkl')
        self.model = joblib.load(model_path)
    
    def predict_optimal_price(self, product_data):
        # Convert product data to DataFrame
        df = pd.DataFrame([product_data])
        
        # Make prediction
        optimal_price = self.model.predict(df)
        
        return optimal_price[0]