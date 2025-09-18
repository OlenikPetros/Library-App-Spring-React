<strong> ibrary Management App </strong>

A full-stack Library Management System built with React (frontend) and Spring Boot + MongoDB (backend).
This app allows administrators to manage books, users, and rentals in a simple, intuitive interface. 
 Features
 JWT Authentication (secure login / logout)

 Book Management (add, edit, delete, search books)

 User Management (list users, view who rented what)

 Rental System

Track total, free, and rented copies of each book

Toggle rental history for each book

Search books by title or author

Clean UI built with React + React Icons

Tech Stack
Frontend

React (hooks, functional components)

React Router (navigation)

Axios (API requests)

React Icons (UI icons)

CSS Modules (styling)

Backend

Spring Boot (REST API)

Spring Security + JWT (authentication & authorization)

MongoDB (data persistence)

Node.js
 (>= 18.x)

Java JDK 17
 or higher

Maven

MongoDB
 running locally or in the cloud

Backend Setup (Spring Boot + MongoDB)
# Clone the repository
git clone https://github.com/yourusername/library-app.git
cd library-app/backend

# Run the app
mvn spring-boot:run


Backend will run on http://localhost:8080

Frontend Setup (React)
cd library-app/frontend

# Install dependencies
npm install

# Run app
npm start


Frontend will run on http://localhost:3000

Authentication

JWT stored in localStorage after login

Each request includes Authorization: Bearer <token> header

Logout clears token and redirects to login

Screenshots

(screenshots...)

Contributing

Contributions, issues and feature requests are welcome!
Feel free to open an issue or submit a pull request.

(More Features are coming!!!)
