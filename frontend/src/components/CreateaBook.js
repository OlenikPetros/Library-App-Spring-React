import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSignOutAlt, FaBackspace } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./CreateaBook.css";

function CreateaBook() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [pagecount, SetpageCount] = useState("");
  const [capacity, setcapacity] = useState("");
  const [publishedDate, setpublishedDate] = useState("");
  const [thumbnailUrl, setthumbnailUrl] = useState("");
  const [shortDescription, setshortDescription] = useState("");
  const [longDescription, setlongDescription] = useState("");
  const [bookstatus, setbookstatus] = useState("");
  const [authors, setauthors] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ Fetch books once on mount
  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    axios
      .get("http://localhost:8080/api/books", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBooks(res.data))
      .catch((error) => console.error("Error fetching books:", error));
  }, [token, navigate]);

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload

    const CreateData = {
      title,
      pageCount: parseInt(pagecount),
      capacity: parseInt(capacity),
      publishedDate,
      thumbnailUrl,
      shortDescription,
      longDescription,
      status: bookstatus,
      authors,
      categories,
    };

    console.log("Book Created:", CreateData);

    axios
      .post("http://localhost:8080/api/books", CreateData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        alert("Book created successfully!");
      })
      .catch((error) => console.error("Error creating book:", error));
  };
  const Backbutton = () => {
    navigate("/Booklist", { replace: true });
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="Book-Container">
      <button className="back-btn" onClick={Backbutton}>
        <FaBackspace /> Back
      </button>
      <h2 className="Book-Header">Create a Book</h2>
      <form onSubmit={handleSubmit}>
        Title
        <input
          className="Createabook"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        PageCount
        <input
          className="Createabook"
          type="number"
          placeholder="PageCount"
          value={pagecount}
          onChange={(e) => SetpageCount(e.target.value)}
        />
        Capacity
        <input
          className="Createabook"
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setcapacity(e.target.value)}
          required
        />
        Published Date
        <input
          className="Createabook"
          type="date"
          value={publishedDate}
          onChange={(e) => setpublishedDate(e.target.value)}
        />
        ThumbnailUrl
        <input
          className="Createabook"
          type="text"
          placeholder="ThumbnailUrl"
          value={thumbnailUrl}
          onChange={(e) => setthumbnailUrl(e.target.value)}
        />
        {thumbnailUrl ? (
          <img src={thumbnailUrl} className="book-thumbnail" alt="thumbnail" />
        ) : null}
        Short Description
        <textarea
          className="Createabook"
          rows="10"
          placeholder="Short Description"
          value={shortDescription}
          onChange={(e) => setshortDescription(e.target.value)}
        />
        Long Description
        <textarea
          className="Createabook"
          rows="10"
          placeholder="Long Description"
          value={longDescription}
          onChange={(e) => setlongDescription(e.target.value)}
          required
        />
        Status
        <input
          className="Createabook"
          type="text"
          placeholder="Status"
          value={bookstatus}
          onChange={(e) => setbookstatus(e.target.value)}
        />
        Authors
        <input
          className="Createabook"
          type="text"
          placeholder="Authors (Comma separated)"
          value={authors.join(", ")}
          onChange={(e) =>
            setauthors(e.target.value.split(",").map((a) => a.trim()))
          }
        />
        Categories
        <input
          className="Createabook"
          type="text"
          placeholder="Categories (Comma separated)"
          value={categories.join(", ")}
          onChange={(e) =>
            setCategories(e.target.value.split(",").map((c) => c.trim()))
          }
        />
        <br />
        <button className="Create-Book-Button" type="submit">
          Create a Book
        </button>
      </form>
    </div>
  );
}

export default CreateaBook;
