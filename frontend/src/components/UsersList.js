import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaEye, FaSignOutAlt } from "react-icons/fa";
import "./Booklist.css";
import { PiFacebookLogoThin } from "react-icons/pi";

function Userspage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // 🔒 check login status
  useEffect(() => {
    const token = localStorage.getItem("token");
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const handleEdit = (id) => {
    navigate(`/Edit-User/${id}`);
  };
  const handleDelete = (id) => {
    navigate(`/Delete-User/${id}`);
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
        <button
          className="edit-btn"
          onClick={() => navigate("/CreateCustomer")}
        >
          Create a User
        </button>
        <h2>Users</h2>

        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <strong>{user.name}</strong>
              <p>
                📞 {user.phone}{" "}
                <span style={{ marginLeft: "20px" }}>✉️ {user.email}</span>
              </p>
              <div className="buttons">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(user._id)}
                >
                  <FaEdit />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Userspage;
