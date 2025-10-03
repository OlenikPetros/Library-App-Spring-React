import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaBackspace } from "react-icons/fa";
import Select from "react-select";
import "./Rentabook.css";
import { useParams } from "react-router-dom";

function Rentabook() {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [rented, setRented] = useState([]);
  const { idbook } = useParams();
  const [optionsusers, setOptionsusers] = useState([]);
  const [optionsbooks, setOptionsbooks] = useState([]);

  const [selectedusers, setSelectedusers] = useState(null);
  const [selectedbooks, setSelectedbooks] = useState(null);
  const [expiredDate, setExpiredDate] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    // Fetch users
    axios
      .get("http://localhost:8080/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(res.data);
        const formatted = res.data.map((u) => ({
          value: u._id,
          label: u.name,
        }));
        setOptionsusers(formatted);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
        }
      });

    // Fetch books
    axios
      .get("http://localhost:8080/api/books", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBooks(res.data))
      .catch((error) => console.error("Error fetching books:", error));

    // Fetch rented books
    axios
      .get("http://localhost:8080/api/rentedbooks", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRented(res.data))
      .catch((error) => console.error("Error fetching rented books:", error));
  }, [token, navigate]);

  // regenerate book options AFTER we have rented data
  useEffect(() => {
    if (books.length > 0) {
      const formatted = books.map((b) => ({
        value: b.id,
        label: `${b.title} (Available: ${b} - ${b.capacity})`,
        capacity: b.capacity,
      }));
      setOptionsbooks(formatted);
    }
  }, [books, rented]);

  const handleRentSubmit = () => {
    if (!selectedusers || !expiredDate) {
      alert("Please select a book, user, and expire date.");
      return;
    }

    const rentData = {
      bookid: idbook,
      personid: selectedusers.value,
      capacity: 1,
      expired: expiredDate,
      whenrented: new Date().toISOString(),
    };

    console.log("Rent data:", rentData);

    axios
      .post("http://localhost:8080/api/rentedbooks", rentData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Rented successfully:", res.data);
        alert("Book rented successfully!");
        setSelectedbooks(null);
        setSelectedusers(null);
        setExpiredDate("");
        navigate("/BookList");
      })
      .catch((error) => console.error("Error renting book:", error));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };
  const book = books.find((b) => b.id == idbook);
  const Backbutton = () => {
    navigate("/Booklist", { replace: true });
  };
  return (
    <div>
      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt /> Signout
      </button>

      <div className="Books">
        <button className="logout-btn" onClick={Backbutton}>
          <FaBackspace /> Back
        </button>
        <h2>Rent a Book</h2>
        <div>
          {book ? (
            <div>
              <h3>{book.title}</h3>
              {book.thumbnailUrl && (
                <img src={book.thumbnailUrl} alt={book.title} />
              )}
              <p>Author: {book.authors.join(", ")}</p>
              <p>
                {" "}
                Description: <br></br>
                {book.longDescription}
              </p>
            </div>
          ) : (
            <p>Book not found or still loading...</p>
          )}
        </div>

        {/* Select User */}
        <div className="p-10 w-65">
          {/* Dropdown first */}
          <Select
            options={optionsusers}
            value={selectedusers}
            onChange={setSelectedusers}
            placeholder="Search and select a user..."
            isSearchable
          />

          {/* Label or extra text below */}
        </div>
        <br></br>
        {/* Expired Date */}
        <div className="expiredate">
          <label>Expired Date:</label>
          <input
            type="date"
            value={expiredDate}
            onChange={(e) => setExpiredDate(e.target.value)}
            style={{ width: "30%", height: "100%", fontSize: "16px" }}
          />
          {expiredDate && (
            <p>
              {" "}
              Expire on:{" "}
              {expiredDate
                ? new Date(expiredDate).toLocaleDateString("en-GB")
                : ""}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="p-4">
          <button className="Submit-Button" onClick={handleRentSubmit}>
            Rent Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default Rentabook;
