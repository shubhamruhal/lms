from django.urls import path
from .views import (
    BookListView,
    BookAddView,
    BookRemoveView,
    BookIssueView,
    BookReturnView,
)

urlpatterns = [
    path('books/', BookListView.as_view(), name='book-list'),
    path('books/add/', BookAddView.as_view(), name='book-add'),
    path('books/<int:pk>/remove/', BookRemoveView.as_view(), name='book-remove'),
    path('books/<int:pk>/issue/', BookIssueView.as_view(), name='book-issue'),
    path('books/<int:pk>/return/', BookReturnView.as_view(), name='book-return'),
]
