import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

axios.defaults.withCredentials = true;

// Set default headers for Axios
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Function to get CSRF token from cookies
const getCSRFToken = () => {
  const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
  return csrfCookie ? csrfCookie.split('=')[1] : null;
};

// Add CSRF token to Axios headers
axios.interceptors.request.use(config => {
  const csrfToken = getCSRFToken();
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
});

interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
  published_date?: string;
  quantity: number;
  is_issued?: boolean;
  issued_to?: number | null;
  issued_date?: string | null;
  cover_image?: string | File | null;
}

interface IssueRecord {
  id: string;
  studentName: string;
  bookId: string;
  issueDate: string;
  returned: boolean;
}

export const api = {
  // Auth endpoints
  signup: async (username: string, email: string, password: string) => {
    const response = await axios.post(`${BASE_URL}/api/accounts/signup/`, { username, email, password });
    return { success: true, ...response.data };
  },

  login: async (email: string, password: string) => {
    const response = await axios.post(`${BASE_URL}/api/accounts/login/`, { email, password });
    return { success: response.status === 200, ...response.data };
  },

  // Book endpoints
  getBooks: async () => {
    const response = await axios.get(`${BASE_URL}/api/book_data/books/`);
    return response.data;
  },

  addBook: async (book: Omit<Book, 'id'>) => {
    const formData = new FormData();
    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('quantity', String(book.quantity));
    if (book.description) formData.append('description', book.description);
    if (book.published_date) formData.append('published_date', book.published_date);
    if (book.cover_image) formData.append('cover_image', book.cover_image as File);
    const response = await axios.post(`${BASE_URL}/api/book_data/books/add/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  removeBook: async (id: string) => {
    const response = await axios.delete(`${BASE_URL}/api/book_data/books/${id}/remove/`);
    return response.data;
  },

  // Issue endpoints
  issueBook: async (studentName: string, bookId: string) => {
    const response = await axios.post(`${BASE_URL}/api/book_data/books/${bookId}/issue/`, { studentName });
    return response.data;
  },

  returnBook: async (studentName: string, bookId: string) => {
    const response = await axios.post(`${BASE_URL}/api/book_data/books/${bookId}/return/`, { studentName });
    return response.data;
  },
};
