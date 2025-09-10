import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
  import { useNavigate } from 'react-router-dom';
  const ProtectedPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); // redirect if not logged in
    }
  }, [navigate]);
 
};

export default ProtectedPage;
