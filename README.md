# Library Management System (LMS)

## Project Summary
The Library Management System (LMS) is a web-based application designed to simplify and automate the management of library resources. It allows users to add, remove, list, issue, and return books, as well as manage user authentication and book cover images. The system features a modern, responsive UI and is built using Django for the backend and React for the frontend.

## Technologies Used
- **Backend:** Django, Django REST Framework
- **Frontend:** React, TypeScript, Tailwind CSS
- **Database:** SQLite
- **Version Control:** Git & GitHub

## Features
- Add, remove, and list books
- Issue and return books
- User authentication
- Book cover image upload
- Responsive and modern UI

## Project Structure
```
backend/    # Django backend (API, models, authentication)
frontend/   # React frontend (UI, API calls)
```

## How to Run the Project

### Prerequisites
- Python 3.x
- Node.js & npm

### Backend (Django)
1. Open a terminal and navigate to the `backend` directory:
   ```sh
   cd backend
   ```
2. Install dependencies (if needed):
   ```sh
   pip install -r requirements.txt
   ```
3. Apply migrations:
   ```sh
   python manage.py migrate
   ```
4. Start the Django development server:
   ```sh
   python manage.py runserver
   ```

### Frontend (React)
1. Open a new terminal and navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React development server:
   ```sh
   npm run dev
   ```

### Accessing the Application
- The backend API will be available at: `http://localhost:8000/`
- The frontend app will be available at: `http://localhost:5173/` (or as shown in your terminal)

## Screenshots
- Dashboard
- ![image](https://github.com/user-attachments/assets/efef764e-611f-4496-893b-ae9f9f63b727)

- Book List
- Add Book
- Issue/Return Book

## Future Improvements
- Search and filter books
- Role-based access
- Email notifications
- Analytics dashboard

---

Feel free to contribute or raise issues for improvements!
