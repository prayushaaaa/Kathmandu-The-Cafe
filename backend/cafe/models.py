from django.db import models
from decimal import Decimal

class Customer(models.Model):
    name = models.CharField(max_length=100, unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return str(self.name)

class Item(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=3)
    stock = models.IntegerField()

    def __str__(self):
        return str(self.name)

class Sale(models.Model):
    customer = models.ForeignKey('Customer', on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=50)
    total_price = models.DecimalField(max_digits=10, decimal_places=3, editable=False)
    sale_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer.name} - {self.sale_date} - {self.total_price}"

class SaleItem(models.Model):
    sale = models.ForeignKey(Sale, related_name="sale_items", on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def __str__(self):
        return f"{self.sale.customer.name} - {self.item.name} - {self.quantity}"

    @property
    def total_price(self):
        # Ensure both item price and quantity are decimals to avoid errors during multiplication
        item_price = Decimal(self.item.price)  # item.price is a Decimal field
        quantity = Decimal(self.quantity)      # Convert quantity to Decimal explicitly
        return item_price * quantity  # Perform the multiplication

class Expense(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=3)
    expense_date = models.DateTimeField(auto_now_add=True)
    category = models.CharField(max_length=100, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.amount} - {self.category if self.category else 'No category'}"
