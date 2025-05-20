import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import joblib
import os
from django.conf import settings

class PriceOptimizer:
    def __init__(self):
        self.model_path = os.path.join(settings.BASE_DIR, 'ml/models/price_model.pkl')
        try:
            self.model = joblib.load(self.model_path)
        except:
            self.model = None
    
    def train_model(self, data_path):
        # Load and preprocess data
        df = pd.read_csv(data_path)
        X = df.drop('price', axis=1)
        y = df['price']
        
        # Train-test split
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
        
        # Train model
        model = RandomForestRegressor(n_estimators=100)
        model.fit(X_train, y_train)
        
        # Evaluate
        preds = model.predict(X_test)
        mae = mean_absolute_error(y_test, preds)
        print(f"Model trained with MAE: {mae}")
        
        # Save model
        joblib.dump(model, self.model_path)
        self.model = model
        
        return mae
    
    def predict_price(self, features):
        if not self.model:
            raise Exception("Model not trained or loaded")
        
        # Convert features to DataFrame
        df = pd.DataFrame([features])
        
        # Make prediction
        return self.model.predict(df)[0]