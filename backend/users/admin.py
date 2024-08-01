from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, TutorProfile
from django.core.exceptions import ValidationError
from django import forms

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'username', 'first_name', 'last_name', 'is_staff', 'is_active', 'user_type')
    list_filter = ('is_staff', 'is_active', 'user_type')
    
    search_fields = ('email', 'username')
    
admin.site.register(CustomUser, CustomUserAdmin)

class TutorProfileForm(forms.ModelForm):
    class Meta:
        model = TutorProfile
        fields = '__all__'

    def clean_user(self):
        user = self.cleaned_data.get('user')
        if user.user_type != 'tutor':
            raise ValidationError('Only users with user_type "tutor" can have a TutorProfile.')
        return user

class TutorProfileAdmin(admin.ModelAdmin):
    form = TutorProfileForm
    list_display = ('user', 'expertise', 'experience', 'is_verified')
    search_fields = ('user__username', 'expertise')
    readonly_fields = ('is_verified',)  # make is_verified read-only for all users

    def get_readonly_fields(self, request, obj=None):
        readonly_fields = super(TutorProfileAdmin, self).get_readonly_fields(request, obj)
        if not request.user.is_superuser:
            readonly_fields = ('is_verified',)
        return readonly_fields

admin.site.register(TutorProfile, TutorProfileAdmin)
