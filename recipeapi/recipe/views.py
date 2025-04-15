from django.contrib.auth.models import User
from django.db.models import Q
from django.http import Http404
from django.shortcuts import render
from rest_framework import viewsets, status
from recipe.models import Recipe, Review
from recipe.serializers import RecipeSerializer, UserSerializer, ReviewSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


class RecipeView(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer


class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LogoutView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        self.request.user.auth_token.delete()
        return Response( {'msg':'logout successfully'},status=status.HTTP_200_OK)


class SearchRecipes(APIView):
    def get(self,request):
        query=self.request.query_params.get('search')
        if query:
            r=Recipe.objects.filter(Q(recipe_name__icontains=query)|Q(ingredients__icontains=query)|Q(instructions__icontains=query)
                                    |Q(mealtype__icontains=query)|Q(cuisine__icontains=query))
            if not r.exists():
                return Response({'msg': 'no result found'}, status=status.HTTP_200_OK)
            recipes=RecipeSerializer(r,many=True,context={'request':request})
            return Response(recipes.data,status=status.HTTP_200_OK)
        else:
            return Response({'msg':'no result found'},status=status.HTTP_200_OK)

class Filterbycuisine(APIView):
    def get(self,request):
        query=self.request.query_params.get('search')
        if query:
            r=Recipe.objects.filter(cuisine__icontains=query)
            if not r.exists():
                return Response({'msg': 'no result found'}, status=status.HTTP_200_OK)
            recipes=RecipeSerializer(r,many=True,context={'request':request})
            return Response(recipes.data,status=status.HTTP_200_OK)
        else:
            return Response({'msg':'no result found'},status=status.HTTP_200_OK)


class Filterbymealtype(APIView):
    def get(self,request):
        query=self.request.query_params.get('search')
        if query:
            r=Recipe.objects.filter(mealtype__icontains=query)
            if not r.exists():
                return Response({'msg': 'no result found'}, status=status.HTTP_200_OK)
            recipes=RecipeSerializer(r,many=True,context={'request':request})
            return Response(recipes.data,status=status.HTTP_200_OK)
        else:
            return Response({'msg':'no result found'},status=status.HTTP_200_OK)


class Filterbyingredients(APIView):
    def get(self,request):
        query=self.request.query_params.get('search')
        if query:
            r=Recipe.objects.filter(ingredients__icontains=query)
            if not r.exists():
                return Response({'msg': 'no result found'}, status=status.HTTP_200_OK)
            recipes=RecipeSerializer(r,many=True,context={'request':request})
            return Response(recipes.data,status=status.HTTP_200_OK)
        else:
            return Response({'msg':'no result found'},status=status.HTTP_200_OK)


class Reviewcreate(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        id=request.data['id']
        c=request.data['comment']
        r=request.data['rating']
        u=self.request.user

        rec=Recipe.objects.get(id=id)
        r=Review.objects.create(user=u,recipe=rec,comment=c,rating=r)
        r.save()

        review=ReviewSerializer(r)
        return Response(review.data,status=status.HTTP_201_CREATED)

class Reviewlist(APIView):
    def get_object(self,pk):
        try:
            return Recipe.objects.get(pk=pk)
        except:
            raise Http404

    def get(self,request,pk):
        r=self.get_object(pk)
        rev=Review.objects.filter(recipe=r)
        review=ReviewSerializer(rev,many=True)
        return Response(review.data,status=status.HTTP_200_OK)