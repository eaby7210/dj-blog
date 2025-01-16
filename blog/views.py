from rest_framework import viewsets, permissions
from .models import Post
from .serializers import PostListSerializer, PostDetailSerializer


class OpenPostViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A read-only viewset for listing and retrieving posts for all users.
    """
    queryset = Post.objects.all()
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.action == 'list':
            return PostListSerializer
        if self.action == 'retrieve':
            return PostDetailSerializer
        return super().get_serializer_class()


class UserPostViewSet(viewsets.ModelViewSet):
    """
    A viewset for authenticated users to create, edit,
    and delete their own posts.
    """
    permission_classes = [permissions.IsAuthenticated]
    # permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Post.objects.filter(author=self.request.user)

    def get_serializer_class(self):
        if self.action in ['list']:
            return PostListSerializer
        return PostDetailSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
