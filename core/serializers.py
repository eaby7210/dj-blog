from rest_framework import serializers
from django.contrib.auth import get_user_model
from dj_rest_auth.serializers import (
    UserDetailsSerializer, PasswordChangeSerializer
)
from dj_rest_auth.registration.serializers import RegisterSerializer
from allauth.account.models import EmailAddress
User = get_user_model()


class CustomPasswordChangeSeralizer(PasswordChangeSerializer):
    current_password = serializers.CharField(required=True)

    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Current password is incorrect.")
        return value


class UserSerializer(UserDetailsSerializer):
    email_verified = serializers.SerializerMethodField()

    class Meta(UserDetailsSerializer.Meta):
        model = User
        fields = UserDetailsSerializer.Meta.fields + (
            'is_active', 'is_superuser', 'email_verified'
        )
        read_only_fields = UserDetailsSerializer.Meta.read_only_fields + (
            'is_active', 'is_superuser', 'role'
        )

    def get_email_verified(self, obj):
        """Checks if the user's email is verified"""
        try:
            email_address = EmailAddress.objects.get(user=obj, primary=True)
            return email_address.verified
        except EmailAddress.DoesNotExist:
            return False


class UserRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['first_name'] = self.validated_data.get('first_name', '')
        data['last_name'] = self.validated_data.get('last_name', '')
        return data

    def custom_signup(self, request, user):
        user.first_name = self.cleaned_data.get('first_name')
        user.last_name = self.cleaned_data.get('last_name')
        user.save()
