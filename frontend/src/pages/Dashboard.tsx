
import { useAuth } from "@/context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { BookPlus, BookUser, BookX, Book, ArrowLeft, LogOut } from "lucide-react";

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const menuItems = [
    {
      title: "Add Book",
      icon: <BookPlus size={48} className="text-library-primary mb-4" />,
      description: "Add new books to library inventory",
      path: "/add-book",
    },
    {
      title: "Issue Book",
      icon: <BookUser size={48} className="text-library-primary mb-4" />,
      description: "Issue books to students",
      path: "/issue-book",
    },
    {
      title: "Return Book",
      icon: <ArrowLeft size={48} className="text-library-primary mb-4" />,
      description: "Process book returns",
      path: "/return-book",
    },
    {
      title: "Book List",
      icon: <Book size={48} className="text-library-primary mb-4" />,
      description: "View all books in inventory",
      path: "/book-list",
    },
    {
      title: "Remove Book",
      icon: <BookX size={48} className="text-library-primary mb-4" />,
      description: "Remove books from inventory",
      path: "/remove-book",
    },
    {
      title: "Logout",
      icon: <LogOut size={48} className="text-library-primary mb-4" />,
      description: "Exit the application",
      path: "/logout",
      action: () => {
        navigate("/");
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Library Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">
            Manage your library's operations with ease
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <div
              key={item.title}
              className="dashboard-card cursor-pointer"
              onClick={() => item.action ? item.action() : navigate(item.path)}
            >
              {item.icon}
              <h3 className="text-xl font-semibold mt-2">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-1 text-center">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
