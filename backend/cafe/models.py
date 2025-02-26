from django.db import models

class Customer(models.Model):
    name = models.CharField(max_length=100, unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return str(self.name)  # Ensure it's returning a string

class Item(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0) #type: ignore

    def __str__(self):
        return str(self.name)  # Ensure it's returning a string

class Sale(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    payment_method = models.CharField(max_length=50)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, editable=False)
    sale_date = models.DateTimeField(auto_now_add=True)

    # def save(self, *args, **kwargs):
    #     self.total_price = self.quantity * self.item.price
    #     super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.customer.name} - {self.item.name} - {self.total_price}"

class Expense(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    expense_date = models.DateTimeField(auto_now_add=True)
    category = models.CharField(max_length=100, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.amount} - {self.category if self.category else 'No category'}"  # Handle None value in category
