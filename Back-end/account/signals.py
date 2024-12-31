from django.contrib.auth.models import Group
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

User = get_user_model()

@receiver(post_save, sender=User)
def add_user_to_group(sender, instance, created, **kwargs):
    if created:
        customer_group, created = Group.objects.get_or_create(name="Customer")
        instance.groups.add(customer_group)
