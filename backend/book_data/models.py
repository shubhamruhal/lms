from django.db import models
from django.contrib.auth.models import User

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    published_date = models.DateField(null=True, blank=True)

    is_issued = models.BooleanField(default=False)
    issued_to = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='issued_books')
    issued_date = models.DateField(null=True, blank=True)

    cover_image = models.ImageField(upload_to='book_covers/', null=True, blank=True)

    def __str__(self):
        return self.title