from rest_framework import serializers
from .models import Customer, Item, Sale, Expense, SaleItem
from decimal import Decimal

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

class SaleItemSerializer(serializers.ModelSerializer):
    item_name = serializers.CharField(source='item.name', read_only=True)
    price_per_unit = serializers.DecimalField(source='item.price', read_only=True, max_digits=10, decimal_places=3)

    class Meta:
        model = SaleItem
        fields = ['item', 'item_name', 'quantity', 'price_per_unit', 'total_price']

    def get_total_price(self, obj):
        return obj.item.price * obj.quantity

class SaleSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.name', read_only=True)
    items = SaleItemSerializer(many=True, source='sale_items', read_only=True)  # related_name 'sale_items'
    total_price = serializers.DecimalField(max_digits=10, decimal_places=3, read_only=True)

    class Meta:
        model = Sale
        fields = ['id', 'customer_name', 'payment_method', 'total_price', 'sale_date', 'items']

    def create(self, validated_data):
        # Extract items data from the request
        items_data = validated_data.pop('sale_items', [])

        # Create the Sale instance
        sale = Sale.objects.create(**validated_data)

        total_price = Decimal('0.00')

        # Now process the items data, creating SaleItem instances
        for item_data in items_data:
            item = Item.objects.get(id=item_data['item'].id)  # Get item object
            quantity = item_data['quantity']
            total_price += item.price * quantity
            SaleItem.objects.create(sale=sale, item=item, quantity=quantity)

        # Now that the SaleItems are created, update the Sale's total_price
        sale.total_price = total_price
        sale.save()

        return sale


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'
