from django.urls import path, include
from rest_framework.routers import DefaultRouter
from cafe.views import CustomerViewSet, ItemViewSet, SaleViewSet, ExpenseViewSet, delete_sale

router = DefaultRouter()
router.register(r'customers', CustomerViewSet)
router.register(r'items', ItemViewSet)
router.register(r'sales', SaleViewSet)
router.register(r'expenses', ExpenseViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
     path('api/sales/delete/<int:sale_id>/', delete_sale, name='delete_sale'),
]
