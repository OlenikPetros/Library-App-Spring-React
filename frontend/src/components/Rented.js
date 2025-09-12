import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaEye, FaSignOutAlt } from "react-icons/fa";
import "./Booklist.css";
import { PiFacebookLogoThin } from "react-icons/pi";

function Rented() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [rented, setRented] = useState([]);
  const [books, setBooks] = useState([]);

  // 🔒 check login status
  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true }); // replace prevents back navigation
      return;
    }

    axios
      .get("http://localhost:8080/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Users:", error);

        // if token expired or invalid → log out user
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
        }
      });
  }, [navigate]);
  axios
    .get("http://localhost:8080/api/books ", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setBooks(response.data);
    })
    .catch((error) => {
      console.error("Error fetching Users:", error);
    });
  axios
    .get("http://localhost:8080/api/rentedbooks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setRented(response.data);
    })
    .catch((error) => {
      console.error("Error fetching RentedBooks:", error);
    });
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };
  const handleDelete = (id) => {
    navigate(`/delete-user/${id}`);
  };
  const handleView = (id) => {
    navigate(`/view-user/${id}`);
  };

  return (
    <div>
      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt /> Singout
      </button>

      <div className="Books">
        <button className="logout-btn" onClick={() => navigate("/BookList")}>
          Books
        </button>
        <h2>Rented</h2>
        <button className="logout-btn" onClick={() => navigate("/Rentabook")}>
          Rent
        </button>
        <ul>
          {rented.map((renteduser) => (
            <li key={renteduser._id}>
              <strong>{renteduser.bookid}</strong> <br />
              📞 {renteduser.personid} <br />
              ✉️ {renteduser.capacity}
              ✉️ {renteduser.whenrented}
              ✉️ {renteduser.expired}
              <div className="buttons">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(renteduser._id)}
                >
                  <FaEdit />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(renteduser._id)}
                >
                  <FaTrash />
                </button>
                <button
                  className="view-btn"
                  onClick={() => handleView(renteduser._id)}
                >
                  <FaEye />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Rented;
