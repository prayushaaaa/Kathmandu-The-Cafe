from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Customer, Item, Sale, Expense, SaleItem
from .serializers import CustomerSerializer, ItemSerializer, SaleSerializer, ExpenseSerializer, SaleItemSerializer
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [AllowAny]

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [AllowAny]

class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

    def perform_create(self, serializer):
        customer_id = self.request.data.get('customer')
        if not customer_id:
            customer_id = 1  # Default to a specific customer ID (like an anonymous customer)

        sale = serializer.save(total_price=0, customer_id=customer_id)
        # Create the sale instance with total_price set to 0 initially
        sale = serializer.save(total_price=0)  # Setting default value to 0 for total_price

        # Get the sale items from the request
        sale_items_data = self.request.data.get('items', [])
        total_price = 0

        # If no sale items are provided, keep total_price as 0
        if not sale_items_data:
            sale.total_price = 0
            sale.save()
            return

        # Iterate through each item and create SaleItem instances
        for item_data in sale_items_data:
            try:
                item = Item.objects.get(id=item_data['item'])  # Get the Item object
            except ObjectDoesNotExist:
                return Response({"error": f"Item with id {item_data['item']} does not exist."}, status=status.HTTP_400_BAD_REQUEST)

            quantity = item_data['quantity']
            total_price += item.price * quantity

            # Create the SaleItem instance
            SaleItem.objects.create(sale=sale, item=item, quantity=quantity)

        # Set the total price of the sale and save it
        sale.total_price = total_price
        print(sale)
        sale.save()

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [AllowAny]
