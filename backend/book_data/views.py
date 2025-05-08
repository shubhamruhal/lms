# books/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from django.shortcuts import get_object_or_404

from .models import Book
from .serializer import BookSerializer

class BookListView(APIView):
    """
    GET: Show all books
    """
    permission_classes = []  # Allow any user, or you can require authentication here

    def get(self, request):
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True, context={'request': request})
        return Response(serializer.data)


class BookAddView(APIView):
    """
    POST: Add new book
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookRemoveView(APIView):
    """
    DELETE: Remove a book by ID (only if not issued)
    """
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        book = get_object_or_404(Book, pk=pk)
        if book.is_issued:
            return Response({"detail": "Issued books cannot be removed."}, status=status.HTTP_400_BAD_REQUEST)
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BookIssueView(APIView):
    """
    POST: Issue a book to the authenticated user
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        book = get_object_or_404(Book, pk=pk)
        if book.is_issued:
            return Response({"detail": "Book is already issued."}, status=status.HTTP_400_BAD_REQUEST)

        book.is_issued = True
        book.issued_to = request.user
        book.issued_date = timezone.now().date()
        book.save()
        return Response({"detail": f"Book '{book.title}' issued to you."})


class BookReturnView(APIView):
    """
    POST: Return a book issued to the authenticated user
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        book = get_object_or_404(Book, pk=pk)
        if not book.is_issued:
            return Response({"detail": "Book is not issued."}, status=status.HTTP_400_BAD_REQUEST)

        if book.issued_to != request.user:
            return Response({"detail": "You cannot return a book issued to another user."}, status=status.HTTP_403_FORBIDDEN)

        book.is_issued = False
        book.issued_to = None
        book.issued_date = None
        book.save()
        return Response({"detail": f"Book '{book.title}' returned successfully."})
