from django.contrib.auth.models import User
from rest_framework import serializers
from recipe.models import Recipe, Review


class RecipeSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField('get_image_url')
    image = serializers.ImageField(required=False)
    class Meta:
        model=Recipe
        fields="__all__"

    def get_image_url(self,obj):
        request=self.context.get('request')
        photo_url=obj.image.url
        return request.build_absolute_uri(photo_url)


class UserSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields=['id','username','password','email','first_name','last_name']


    def create(self,validated_data):
        u=User.objects.create_user(username=validated_data['username'],
                                   password=validated_data['password'],
                                   email=validated_data['email'],
                                   first_name=validated_data['first_name'],
                                   last_name=validated_data['last_name'])
        return u


class ReviewSerializer(serializers.ModelSerializer):
    name=serializers.SerializerMethodField('get_user')
    date=serializers.SerializerMethodField('get_date')
    class Meta:
        model=Review
        fields=['recipe','user','comment','rating','created','name','date']

    def get_user(self,obj):
        return obj.user.username
    def get_date(self,obj):
        return obj.created.date()