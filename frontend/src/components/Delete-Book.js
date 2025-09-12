import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function DeleteBook() {
  const { id } = useParams();   // get id from URL
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
      .delete(`http://localhost:8080/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      
      .then(() => {
        setLoading(false);
        navigate("/Booklist"); // back to list after delete
      })
      .catch((err) => {
        setError("Error deleting book: " + err.message);
        setLoading(false);
      });
  }, [id, navigate]);

  if (loading) return <p>Deleting book...</p>;
  if (error) return <p>{error}</p>;

  return null;
}

export default DeleteBook;
