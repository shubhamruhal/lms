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
- Login
  ![image](https://github.com/user-attachments/assets/1fb62570-d6d0-4eca-bda4-157bed8752cd)
- Sign Up
  ![image](https://github.com/user-attachments/assets/bc3bd8a7-f902-496c-9c7b-17ddaae64815)
- Dashboard
  ![image](https://github.com/user-attachments/assets/f670a66b-f597-4be0-bf4e-9d41b0b10dc5)
- Book List
  ![image](https://github.com/user-attachments/assets/f5c59781-406a-4092-8130-24aa802fc8ae)

- Add Book
  ![image](https://github.com/user-attachments/assets/a6dd6040-be7b-4f5d-b404-68a8b709ae55)
- Remove book
  ![image](https://github.com/user-attachments/assets/adf1f935-f2a7-406d-98ae-2e89d1913fda)

- Issue/Return Book
- ![image](https://github.com/user-attachments/assets/6bd9bd29-bd6c-4ec4-b6c1-5e24fdc90c31)


## Future Improvements
- Search and filter books
- Role-based access
- Email notifications
- Analytics dashboard
- recommendation system
- online book reservation system for students

---

Feel free to contribute or raise issues for improvements!
