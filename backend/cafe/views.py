from rest_framework import viewsets
from .models import Customer, Item, Sale, Expense
from .serializers import CustomerSerializer, ItemSerializer, SaleSerializer, ExpenseSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all() #type: ignore

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all() #type: ignore
    serializer_class = ItemSerializer

class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all() #type: ignore
    serializer_class = SaleSerializer

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all() #type: ignore
    serializer_class = ExpenseSerializer
