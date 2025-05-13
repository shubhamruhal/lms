
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/services/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const IssueBook = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState<Array<{ id: string; title: string; author: string; quantity: number }>>([]);
  const [isLoadingBooks, setIsLoadingBooks] = useState(true);

  // Form state
  const [studentName, setStudentName] = useState("");
  const [selectedBookId, setSelectedBookId] = useState("");

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const booksData = await api.getBooks();
        // Only show books with available quantity
        setBooks(booksData.filter(book => book.quantity > 0));
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load books",
          variant: "destructive",
        });
      } finally {
        setIsLoadingBooks(false);
      }
    };

    loadBooks();
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create a JSON payload for the issue data
      const issueData = {
        studentName,
        bookId: selectedBookId
      };
      
      // Log the formatted JSON payload
      console.log('Issue book payload:', JSON.stringify(issueData));
      
      const result = await api.issueBook(studentName, selectedBookId);

      if (result.success) {
        toast({
          title: "Success",
          description: "Book issued successfully",
        });

        // Reset form
        setStudentName("");
        setSelectedBookId("");
        
        // Refresh books list
        const booksData = await api.getBooks();
        setBooks(booksData.filter(book => book.quantity > 0));
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to issue book",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mr-4"
          >
            &larr; Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">Issue Book</h1>
        </div>

        <div className="form-container bg-white rounded-xl shadow-md">
          {isLoadingBooks ? (
            <div className="text-center py-8">Loading books...</div>
          ) : books.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No books available for issue.</p>
              <Button 
                variant="outline" 
                onClick={() => navigate("/add-book")}
                className="mt-4"
              >
                Add Books
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="studentName">Student Name</Label>
                <Input
                  id="studentName"
                  placeholder="Enter student name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bookSelect">Select Book</Label>
                <Select
                  value={selectedBookId}
                  onValueChange={setSelectedBookId}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a book" />
                  </SelectTrigger>
                  <SelectContent>
                    {books.map((book) => (
                      <SelectItem key={book.id} value={book.id}>
                        {book.title} by {book.author} (Available: {book.quantity})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Issuing Book..." : "Issue Book"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueBook;
