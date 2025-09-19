# 📚 Library Management App

A full-stack Library Management System built with React (frontend) and Spring Boot + MongoDB (backend).
This project demonstrates secure authentication, CRUD operations, and a complete rental workflow.

# 🚀 Features

✅ Authentication & Authorization

Secure login/logout with JWT

Token stored in localStorage

Protected routes (React Router)

✅ Book Management

Add, edit, delete, search books

Track total, available, and rented copies

✅ User Management

View all users

See who rented which book

✅ Rental System

Rent a book if available

Toggle rental history per book

Rental dates with automatic expiry tracking

✅ UI / UX

Clean, responsive UI with React Icons

Book search by title or author

# 🛠 Tech Stack Frontend

⚛️ React (Hooks, Functional Components)

🧭 React Router (Navigation)

📡 Axios (API Requests)

🎨 CSS Modules + React Icons

# ⚙Backend

☕ Spring Boot (REST API)

🔐 Spring Security + JWT (Authentication & Authorization)

🗄️ MongoDB (Data Persistence)

🛠 Maven (Build Tool)

Requirements

Node.js >= 18.x

Java JDK 17+

MongoDB (local or cloud, e.g. Atlas)

# ⚡ Setup
Backend (Spring Boot + MongoDB)
# Clone repository
git clone https://github.com/yourusername/library-app.git
cd library-app/backend

# Run the app
mvn spring-boot:run


Backend runs on 👉 http://localhost:8080

Frontend (React)
cd library-app/frontend

# Install dependencies
npm install

# Run the app
npm start


Frontend runs on 👉 http://localhost:3000

# 🔑 Authentication Flow

User logs in → backend issues JWT

JWT stored in localStorage

All API requests include:

Authorization: Bearer <token>


Logout clears token + redirects to /login

# 📸 Screenshots

(Screenshots are coming.)

# 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to open an Issue or submit a Pull Request.

# ⭐ Why this project?

This app is built to showcase full-stack development skills:

Building a secure REST API with Spring Boot

Using MongoDB for persistence

Implementing JWT authentication

Developing a React frontend with state management and API calls

Clean and professional GitHub project setup
