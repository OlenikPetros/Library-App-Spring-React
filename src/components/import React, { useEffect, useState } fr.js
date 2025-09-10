import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye, FaSignOutAlt } from "react-icons/fa";
import './Booklist.css';

function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const [optionsusers, setOptionsusers] = useState([]);
  const [optionsbooks, setOptionsbooks] = useState([]);
  const token = localStorage.getItem("token");
  const [selectedusers, setSelectedusers] = useState(null);
  const [selectedbooks, setSelectedbooks] = useState(null);
  const [expiredDate, setExpiredDate] = useState("");
  const [rented, setRented] = useState([]);
  // 🔒 check login status
 useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
       navigate("/login", { replace: true }); // replace prevents back navigation
    return;

  }

  axios.get('http://localhost:8080/api/books', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
    setBooks(response.data);
  })
  .catch(error => {
    console.error("Error fetching books:", error);

    // if token expired or invalid → log out user
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
 navigate("/login", { replace: true });     }
  });
}, [navigate]);
 
const handleLogout = () => {
  localStorage.removeItem('token'); 
  navigate("/login", { replace: true }); // prevent back
};

   axios
      .get("http://localhost:8080/api/rentedbooks", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRented(res.data))
      .catch((error) => console.error("Error fetching rented books:", error));
  ;
const getRentedCount = (bookid) => {
  if (!bookid) return 0; // safety check
  return rented.filter(r => r.bookid === bookid).length;
};

const getAvailableCapacity = (book) => {
  if (!book) return 0; // safety check
  return book.capacity - getRentedCount(book.id);
};

// then use it
const available = getAvailableCapacity(books);
  const handleEdit = (id) => { navigate(`/edit/${id}`); };
const handleDelete = (id) => { navigate(`/delete/${id}`); };
const handleView = (id) => { navigate(`/Rentabook/${id}`); };

return (
  <div>
    <button className='logout-btn' onClick={handleLogout}>

  <FaSignOutAlt />      Singout 
</button>  
    <div className='Books'>
<button className="logout-btn" onClick={() => navigate("/UsersList")}>
  Users
</button>


      <h2>Books</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.thumbnailUrl && (
              <img 
                src={book.thumbnailUrl} 
                alt={book.title} 
                className="book-thumbnail"
              />
            )}
            <strong>{book.title}</strong> by {book.authors.join(', ')}
       Available capacity: {getAvailableCapacity(book)}

            <div className='buttons'>
             <button className='edit-btn' onClick={() => handleEdit(book.id)}><FaEdit /></button>
<button className='delete-btn' onClick={() => handleDelete(book.id)}><FaTrash /></button>
<button className='view-btn' onClick={() => handleView(book.id)}><FaEye /></button>
    </div>
          </li>
        ))}  
      </ul>
    </div>
</div>
  );
}

export default BookList;
