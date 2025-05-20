import stripe
from django.conf import settings

stripe.api_key = settings.STRIPE_SECRET_KEY

def create_payment_intent(amount, currency='usd'):
    try:
        intent = stripe.PaymentIntent.create(
            amount=int(amount * 100),  # Convert to cents
            currency=currency,
            metadata={'integration_check': 'accept_a_payment'},
        )
        return {
            'client_secret': intent.client_secret,
            'status': intent.status,
            'id': intent.id
        }
    except Exception as e:
        return {'error': str(e)}