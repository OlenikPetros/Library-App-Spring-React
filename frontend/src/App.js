import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import BookList from "./components/Booklist";
import UsersList from "./components/UsersList";
import RentedBooks from "./components/Rented";
import Rentabook from "./components/Rentabook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for login page */}
        <Route path="/login" element={<Login />} />

        {/* Route for book list */}
<Route path="/Booklist" element={<BookList />} />
<Route path="/UsersList" element={<UsersList />} />
      <Route path="/RentedBooks" element={<RentedBooks />} />
      <Route path="/Rentabook/:idbook" element={<Rentabook />} />

        </Routes>
    
    </BrowserRouter>
  );
}

export default App;
