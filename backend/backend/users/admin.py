from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser,TutorProfile
from django.core.exceptions import ValidationError
from django import forms


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'username', 'first_name', 'last_name', 'is_staff', 'is_active', 'user_type')
    list_filter = ('is_staff', 'is_active', 'user_type')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('username', 'first_name', 'last_name', 'bio', 'profile_pic', 'phone','user_type')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('email', 'username')
    ordering = ('email',)

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
    list_display = ('user', 'expertise', 'experience')
    search_fields = ('user__username', 'expertise')