import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const [cookie, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };
  return (
    <div className="navbar">
      <div className="logo">
        <p>ToDO</p>
      </div>
      <div className="nav-container">
        {/* <Link to="/">Home </Link>
        <Link to="/about">About</Link> */}
        {!cookie.access_token ? (
          <Link to="/auth">Login/Register</Link>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
