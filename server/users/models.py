from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from scrape.models import Scrape
# Create your models here.
class AccountManager(BaseUserManager):
    def create_user(self, email, username, password=None, **kwargs):
        if not email:
            raise ValueError("Email is required")
        
        if not username:
            raise ValueError("Username is required")
        
        user = self.model(
            email=self.normalize_email(email),
            username = username,
        )
        
        user.set_password(password)
        user.save()
        return user
        
    def create_superuser(self, email, username, password=None, **kwargs):
        user = self.create_user(
            email=self.normalize_email(email),
            username = username,
            password = password
        )
        
        user.is_admin = True
        user.is_staff = True
        user.is_superuser= True
        
        user.save()
        return user
    
class Account(AbstractBaseUser):
    email = models.EmailField(null=False, blank=False, unique=True)
    username = models.CharField(max_length=50, blank=False, null=False)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    points = models.IntegerField(default=0)
    tracks = models.ManyToManyField(Scrape, related_name='subscribers', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = AccountManager() 

    # field should be used as the unique identifier for authentication purposes
    USERNAME_FIELD = 'email'

    # fields are required when creating a new user via the createsuperuser
    # 'username' field is required in addition to the 'email' field.
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        # "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        # "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True
    
    class Meta:
        db_table = 'users_account'
    