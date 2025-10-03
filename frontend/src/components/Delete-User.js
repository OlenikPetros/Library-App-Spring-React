import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function DeleteUser() {
  const { id } = useParams(); // get id from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log(id);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    axios
      .delete(`http://localhost:8080/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then(() => {
        setLoading(false);
        navigate("/Userslist"); // back to list after delete
      })
      .catch((err) => {
        setError("Error deleting book: " + err.message);
        setLoading(false);
      });
  }, [id, navigate]);

  return null;
}

export default DeleteUser;
