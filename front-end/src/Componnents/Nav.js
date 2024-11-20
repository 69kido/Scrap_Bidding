import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.clear();
    navigate("/signup"); // Changed from "/register" to "/signup"
  };

  return (
    <div>
      {auth ? (
        <ul className="navbar">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Sell">Sell Scrap</Link>
          </li>
          <li>
            <Link to="/Buy">Buy Scrap</Link>
          </li>
          <li>
            <Link to="/Price_Comparison">Price Comparison</Link>
          </li>
          <li>
            <Link onClick={Logout} to="/signup">
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="navbar">
          <li>
            <Link to="/signup">Sign Up</Link> {/* Changed to lowercase '/signup' */}
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
