import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios, { all } from "axios";
import "./EditBook.css";

function EditBook() {
  const { id } = useParams(); // get book id from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState({
    authors: [],
  });
  const [error, setError] = useState("");
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    // fetch single book by ID
    axios
      .get(`http://localhost:8080/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setBook(response.data); // set the book data
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
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const updateBook = {
      title: book.title,
      authors: book.authors,
      categories: book.categories,
      thumbnailUrl: book.thumbnailUrl,
      longDescription: book.longDescription,
    };
    axios
      .put(
        `http://localhost:8080/api/books/${id}`,
        updateBook, // ✅ send the object directly
        { headers: { Authorization: `Bearer ${token}` } }
      )

      .then(() => {
        console.log(updateBook);

        navigate("/Booklist");
      })
      .catch((err) => {
        setError("Error editing book: " + err.message);
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
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder={book.title}
          style={{ width: "50%", padding: "5px" }}
          required
        />
        <label>Author:</label>
        <input
          type="text"
          name="authors"
          value={book.authors.join(", ")}
          onChange={(e) =>
            setBook({
              ...book,
              authors: e.target.value.split(",").map((a) => a.trim()),
            })
          }
          placeholder={book.authors} // correct syntax
          style={{ width: "50%", padding: "5px" }}
        />

        <label>Thumbnail:</label>
        {book.thumbnailUrl && (
          <img
            src={book.thumbnailUrl}
            alt={book.title}
            className="book-thumbnail"
          />
        )}
        <input
          type="text"
          name="thumbnailUrl"
          value={book.thumbnailUrl}
          onChange={handleChange}
          placeholder={book.thumbnailUrl}
          style={{ width: "50%", padding: "5px" }}
          required
        />
        <label>Categories:</label>
        <input
          type="text"
          name="author"
          value={book.categories ? book.categories.join(", ") : ""}
          onChange={handleChange}
          placeholder={book.categories} // correct syntax
          style={{ width: "50%", padding: "5px" }}
          required
        />
        <textarea
          name="longDescription"
          rows="10"
          value={book.longDescription}
          onChange={handleChange}
          placeholder={book.longDescription}
          style={{ padding: "5px", width: "100%" }}
          required
        />

        <button className="Submit-Edit" type="submit">
          Save Edit
        </button>
      </div>
    </form>
  );
}

export default EditBook;
