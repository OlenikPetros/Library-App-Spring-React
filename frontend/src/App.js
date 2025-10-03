import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import BookList from "./components/Booklist";
import UsersList from "./components/UsersList";
import RentedBooks from "./components/Rented";
import Rentabook from "./components/Rentabook";
import DeleteBook from "./components/Delete-Book";
import DeleteUser from "./components/Delete-User";
import EditUser from "./components/Edit-User";
import EditBook from "./components/EditBook.js";
import CreateaBook from "./components/CreateaBook.js";
import CreateCustomer from "./components/CreateCustomer.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Route for book list */}
        <Route path="/Booklist" element={<BookList />} />
        <Route path="/CreateaBook" element={<CreateaBook />} />
        <Route path="/CreateCustomer" element={<CreateCustomer />} />
        <Route path="/UsersList" element={<UsersList />} />
        <Route path="/RentedBooks" element={<RentedBooks />} />
        <Route path="/Rentabook/:idbook" element={<Rentabook />} />
        <Route path="/DeleteBook/:id" element={<DeleteBook />} />
        <Route path="/Delete-User/:id" element={<DeleteUser />} />
        <Route path="/Edit-User/:id" element={<EditUser />} />

        <Route path="/EditBook/:id" element={<EditBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
