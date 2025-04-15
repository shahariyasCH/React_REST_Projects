from django.db import models

class Book(models.Model):
    title=models.CharField(max_length=30)
    author=models.CharField(max_length=30)
    price=models.IntegerField()
    pages=models.IntegerField()
    language=models.CharField(max_length=30)
    image=models.ImageField(upload_to='images')
    def __str__(self):
        return self.title