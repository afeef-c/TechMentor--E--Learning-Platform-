from django.core.management.base import BaseCommand
from users.models import CustomUser, TutorProfile


class Command(BaseCommand):
    help = 'Create TutorProfile for existing tutor users'

    def handle(self, *args, **kwargs):
        tutors = CustomUser.objects.filter(user_type='tutor')
        for tutor in tutors:
            TutorProfile.objects.get_or_create(user=tutor)
        self.stdout.write(self.style.SUCCESS('Successfully created TutorProfiles for existing tutors'))
