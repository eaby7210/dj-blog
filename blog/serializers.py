from rest_framework import serializers
from .models import Post


class PostListSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'title', 'image', 'author', 'created_at']

    def get_author(self, obj):
        first_name = obj.author.first_name
        last_name = obj.author.last_name
        if first_name and last_name:
            return f"{first_name} {last_name}"
        return obj.author.username


class PostDetailSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'image',
                  'author', 'created_at', 'updated_at']

    def get_author(self, obj):
        first_name = obj.author.first_name
        last_name = obj.author.last_name
        if first_name and last_name:
            return f"{first_name} {last_name}"
        return obj.author.username
