import React, { useEffect, useState } from 'react';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  }, [navigate]); // Add navigate as a dependency

  const collectData = async () => {
    let result = await fetch("http://localhost:5000/register", {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    result = await result.json();
    localStorage.setItem("user", JSON.stringify(result));
    navigate('/');
  };

  return (
    <div className="main-content">
  <h1>Register</h1>
  <div className="input-box">
    <input type="text" placeholder="Username" required value={name} onChange={(e) => setName(e.target.value)} />
    <FaUser className="icon" />
  </div>
  <div className="input-box">
    <input type="text" placeholder="E-mail" required value={email} onChange={(e) => setEmail(e.target.value)} />
    <FaEnvelope className="icon" />
  </div>
  <div className="input-box">
    <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
    <FaLock className="icon" />
  </div>
  <button className="register-button" onClick={collectData}>Register</button>
</div>
  );
}

export default SignUp;
