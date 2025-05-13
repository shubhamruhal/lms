
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/services/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  quantity: number;
}

const BookList = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const booksData = await api.getBooks();
        setBooks(booksData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load books",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, [toast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="mr-4"
            >
              &larr; Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold">Book Inventory</h1>
          </div>
          <Button onClick={() => navigate("/add-book")}>+ Add Book</Button>
        </div>

        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="text-center py-12">Loading books...</div>
          ) : books.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No books in inventory.</p>
              <Button onClick={() => navigate("/add-book")}>Add Books</Button>
            </div>
          ) : (
            <Table>
              <TableCaption>Library Book Inventory</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>ISBN</TableHead>
                  <TableHead>Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>{book.id}</TableCell>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.isbn}</TableCell>
                    <TableCell>
                      <span className={book.quantity === 0 ? "text-red-500" : ""}>
                        {book.quantity}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookList;
