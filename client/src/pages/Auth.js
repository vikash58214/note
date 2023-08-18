import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import Axios from "axios";

const Auth = () => {
  const [_, setCookies] = useCookies(["access_token"]); // eslint-disable-next-line

  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleSwitch = () => {
    setIsSignup(!isSignup);
  };
  const [UserName, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      try {
        const reg = await Axios.post("http://localhost:3001/auth/register", {
          UserName,
          Password,
        });
        if (reg.data.message === "user already exist") {
          alert("user already exist");
        } else {
          alert("success");
          setUsername("");
          setPassword("");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await Axios.post("http://localhost:3001/auth/login", {
          UserName,
          Password,
        });

        if (
          response.data.message === "invalid" ||
          response.data.message === "invalid Password"
        ) {
          alert("invalid UserName or Password");
        } else {
          setCookies("access_token", response.data.token);
          window.localStorage.setItem("userID", response.data.user);
          navigate("/note");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="formm">
      <h1>{isSignup ? "SignUp" : "Login"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="username">
          <input
            type="text"
            id="UserName"
            placeholder="UserName"
            name="UserName"
            value={UserName}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="text"
            placeholder="Password"
            id="Password"
            name="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">{isSignup ? "register" : "Login"}</button>
      </form>
      <div className="change">
        <p style={{ fontSize: "15px" }}>
          {isSignup ? "Already hava an account" : "Don't have account"}
        </p>

        <button className="change-button" onClick={handleSwitch}>
          {isSignup ? "Login" : "Register"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
