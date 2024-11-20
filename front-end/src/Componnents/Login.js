import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = await response.json();
    localStorage.setItem("user", JSON.stringify(result));
    if(email==="admin" && password==="admin"){
      navigate("/admin");
    }else{
      navigate("/");
    }
    
  };

  return (
    <div className="wrapper">
  <h1>Login</h1>
  <div className="input-box">
    <input type="text" placeholder="E-mail" required value={email} onChange={(e) => setEmail(e.target.value)} />
    <FaUser className="icon" />
  </div>
  <div className="input-box">
    <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
    <FaLock className="icon" />
  </div>
  <button className="submit-button" onClick={handleLogin}>Login</button>
</div>

  );
};

export default Login;
