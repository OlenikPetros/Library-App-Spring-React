import React, { useEffect, useState, useRef  } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaBook,  FaEdit, FaTrash, FaEye, FaSignOutAlt } from "react-icons/fa";
import './Booklist.css';

function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const [rentedbooks, setRentedBooks] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  // 🔒 check login status
 useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
       navigate("/login", { replace: true }); // replace prevents back navigation
    return;

  }

 axios.get('http://localhost:8080/api/books', {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(response => {
    setBooks(response.data);
  })
  .catch(error => {
    console.error("Error fetching books:", error);
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    }
  });
axios.get('http://localhost:8080/api/users', {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(response => {
    setUsers(response.data);
  })
  .catch(error => {
    console.error("Error fetching rentedbooks:", error);
  });
  // fetch rentedbooks
  axios.get('http://localhost:8080/api/rentedbooks', {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(response => {
    setRentedBooks(response.data);
  })
  .catch(error => {
    console.error("Error fetching rentedbooks:", error);
  });

}, [navigate]);
 
   
const getRentedCount = (bookid) => {
  if (!bookid) return 0; // safety check
  return rentedbooks.filter(r => r.bookid == bookid).length;
};
const findfusers= (users);
const handleLogout = () => {
  localStorage.removeItem('token'); 
  navigate("/login", { replace: true }); // prevent back
};
  const handleEdit = (id) => { navigate(`/edit/${id}`); };
const handleDelete = (id) => { navigate(`/delete/${id}`); };
const handleRent = (id) => { navigate(`/Rentabook/${id}`); };
  
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.authors.join(", ").toLowerCase().includes(searchTerm.toLowerCase())
  );
  const showexp = useRef(null);

  const toggleDiv = () => {
    if (showexp.current.style.display == "none") {
      showexp.current.style.display = "block";
    } else {
      showexp.current.style.display = "none";
    }
  };
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
        <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="searchbar"
      />
        {filteredBooks.map((book)=> (
          
          
          <li key={book.id}>
            {book.thumbnailUrl && (
              <img 
                src={book.thumbnailUrl} 
                alt={book.title} 
                className="book-thumbnail"
              />
            )}
            <strong>{book.title}</strong> by {book.authors.join(', ')}
                         <strong>       Free: {book.capacity-getRentedCount(book.id)}
</strong> 

 <br></br>
            <div className='buttons'>
<button className='show-info-btn' onClick={() => {
  const div = document.getElementById("showexp");
  if (div) {
    div.style.display = div.style.display === "none" ? "block" : "none";
  }
}}>
  Rented Info
</button>
             <button className='edit-btn' onClick={() => handleEdit(book.id)}><FaEdit /></button>
<button className='delete-btn' onClick={() => handleDelete(book.id)}><FaTrash /></button>
 {book.capacity - getRentedCount(book.id) > 0 ? (
  <button className='rent-btn' onClick={() => handleRent(book.id)}>
    <FaBook  />
  </button>
) : (
  <button className='rent-btn' disabled>
    <FaBook  />
  </button>
  
)}
<br></br>
<br></br>



    </div>
     
     <div id='showexp'
     style={{  display: "none" }}
>
   <br></br>
      {rentedbooks
  .filter(r => r.bookid == book.id ) 
  .map(r => {
const user = users.find(u => u._id == r.personid);
     return (
       
      
      <p  key={r.expired}>
        Rented at : {new Date(r.whenrented).toLocaleDateString("en-GB")}
         {" "}
         <br></br>
        Expire at: {new Date(r.expired).toLocaleDateString("en-GB")} 
        <br></br>
        {" "}by {user ? user.name : "Unknown"}
      </p>
    );
  })
}
        </div>  </li>
        ))}  
        
      </ul>
    
    </div>
</div>
  );
}

export default BookList;
