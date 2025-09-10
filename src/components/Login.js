import React, {useEffect, useState } from "react";
import './Login.css'; // import the CSS file
 import { useNavigate } from 'react-router-dom';
 
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
const token = localStorage.getItem("token");
  const navigate = useNavigate();

     useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    navigate("/BookList", { replace: true });
  }
}, [navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("Login response:", data);

       if (data.status === "SUCCESS") {
      localStorage.setItem("token", data.token); // store token
      navigate("/BookList", { replace: true }); // prevent back to login

      } else {
        alert("Login failed!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="Login-Container">
      <h2 className="Login-Header" >Login</h2>
      <form   onSubmit={handleSubmit}>
        <input className="Login-Username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input className="Login-Password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="Login-Button" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
