from rest_framework import serializers
from .models import CustomUser, TutorProfile
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'user_type')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            user_type=validated_data['user_type'],
            is_active=False  # Set to False by default
        )
        return user

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'user_type', 'bio', 'profile_pic', 'phone', 'is_active']

class TutorProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = TutorProfile
        fields = ['user', 'expertise', 'experience', 'documents', 'is_verified']
        read_only_fields = ['is_verified']  

    def update(self, instance, validated_data):
        if 'is_verified' in validated_data and self.context['request'].user.user_type != 'admin':
            raise serializers.ValidationError("Only admins can update the 'is_verified' field.")
        return super().update(instance, validated_data)
