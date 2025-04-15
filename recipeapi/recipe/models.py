from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

class Recipe(models.Model):
    recipe_name=models.CharField(max_length=20)
    ingredients=models.CharField(max_length=100)
    instructions=models.TextField()
    mealtype=models.CharField(max_length=30)
    cuisine=models.CharField(max_length=30)
    image=models.ImageField(upload_to="images")

class Review(models.Model):
    recipe=models.ForeignKey(Recipe,on_delete=models.CASCADE)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    comment=models.TextField()
    rating=models.IntegerField(default=1,validators=[MinValueValidator(1),MaxValueValidator(5)])
    created=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.recipe.recipe_name