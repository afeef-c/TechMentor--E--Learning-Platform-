from django.contrib import admin
from .models import Order,OrderItem,Payment

#class OrderAdmin(admin.ModelAdmin):
#    list_display = ('title', 'tutor', 'course_fee', 'is_active')
#    list_filter = ('is_active', 'tutor')
#    search_fields = ('title', 'tutor__username')

# Register your models here.
#admin.site.register(Order, OrderAdmin)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Payment)