import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSignOutAlt, FaBackspace } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./CreateaBook.css";

function CreateCustomer() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ Only check token on mount
  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const CreateData = {
      name,
      phone,
      email,
    };

    console.log("User Created:", CreateData);

    axios
      .post("http://localhost:8080/api/users", CreateData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        alert("User created successfully!");
        navigate("/UsersList"); // go back to list
      })
      .catch((error) => console.error("Error creating user:", error));
  };

  const Backbutton = () => {
    navigate("/UsersList", { replace: true });
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
      <h2 className="Book-Header">Create a User</h2>
      <form onSubmit={handleSubmit}>
        Name
        <input
          className="Createabook"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        Phone
        <input
          className="Createabook"
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        E-mail
        <input
          className="Createabook"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <button className="Create-Book-Button" type="submit">
          Create User
        </button>
      </form>
    </div>
  );
}

export default CreateCustomer;
