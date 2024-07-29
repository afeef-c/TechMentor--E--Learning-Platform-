from rest_framework import permissions

class IsAdminOrTutor(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.is_staff or obj.tutor == request.user
