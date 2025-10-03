import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios, { all } from "axios";
import "./EditBook.css";

function EditUser() {
  const { id } = useParams(); // get book id from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    // fetch single book by ID
    axios
      .get(`http://localhost:8080/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data); // set the book data
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching book:", err);
        setError("Failed to fetch book");
        setLoading(false);
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const updateuser = {
      name: user.name,
      phone: user.phone,
      email: user.email,
    };
    axios
      .put(`http://localhost:8080/api/users/${id}`, updateuser, {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then(() => {
        console.log(updateuser);

        navigate("/UsersList");
      })
      .catch((err) => {
        setError("Error editing user: " + err.message);
      });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="Edit-Book" style={{ marginBottom: "10px" }}>
        <h1>Edit Book</h1>
        <label>Title:</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder={user.title}
          style={{ width: "50%", padding: "5px" }}
          required
        />
        <input
          type="text"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          placeholder={user.title}
          style={{ width: "50%", padding: "5px" }}
          required
        />
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder={user.email}
          style={{ width: "50%", padding: "5px" }}
          required
        />

        <button className="Submit-Edit" type="submit">
          Save Edit
        </button>
      </div>
    </form>
  );
}

export default EditUser;
