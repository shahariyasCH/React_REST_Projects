from django.contrib.auth.models import User
from django.db.models import Q
from django.shortcuts import render
from rest_framework import viewsets, status
from books.models import Book
from books.serializer import BookSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from books.serializer import UserSerializer

from rest_framework.permissions import IsAuthenticated
class BookView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class SearchBooks(APIView):
    def get(self,request):
        query=self.request.query_params.get('search')
        if query:
            b=Book.objects.filter(Q(title__icontains=query)|Q(author__icontains=query))
            if not b.exists():
                return Response({'msg': 'no result found'}, status=status.HTTP_200_OK)
            books=BookSerializer(b,many=True,context={'request':request})
            return Response(books.data,status=status.HTTP_200_OK)
        else:
            return Response({'msg':'no result found'},status=status.HTTP_200_OK)


class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LogoutView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        self.request.user.auth_token.delete()
        return Response({'msg':'logout successfully'},status=status.HTTP_200_OK)