##Library Management App 

A full-stack Library Management System built with React (frontend) and Spring Boot + MongoDB (backend).
This app allows administrators to manage books, users, and rentals in a simple, intuitive interface. 
 Features
 
 JWT Authentication (secure login / logout) 

 Book Management (add, edit, delete, search books)

 User Management (list users, view who rented what)

<strong>Rental System</strong>

Track total, free, and rented copies of each book

Toggle rental history for each book

Search books by title or author

Clean UI built with React + React Icons

<strong>Tech Stack Frontend</strong>

React (hooks, functional components)

React Router (navigation)

Axios (API requests)

React Icons (UI icons)

CSS Modules (styling)

<strong>Backend</strong>

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
 
<strong>Backend Setup (Spring Boot + MongoDB)</strong>

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

<strong>Screenshots</strong>

(screenshots...)

<strong>Contributing</strong>

Contributions, issues and feature requests are welcome!
Feel free to open an issue or submit a pull request.

<strong>(More Features are coming!!!)</strong>
