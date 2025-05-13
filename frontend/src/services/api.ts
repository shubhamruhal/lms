import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

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
  isbn: string;
  quantity: number;
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
    const response = await axios.get(`${BASE_URL}/book_data/books/`);
    return response.data;
  },

  addBook: async (book: Omit<Book, 'id'>) => {
    const response = await axios.post(`${BASE_URL}/book_data/books/`, book);
    return response.data;
  },

  removeBook: async (id: string) => {
    const response = await axios.delete(`${BASE_URL}/book_data/books/${id}/`);
    return response.data;
  },

  // Issue endpoints
  issueBook: async (studentName: string, bookId: string) => {
    const response = await axios.post(`${BASE_URL}/book_data/issue/`, { studentName, bookId });
    return response.data;
  },
};
