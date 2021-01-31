import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const authObject = {
      "Project-ID": process.env.REACT_APP_PROJECT_ID,
      "User-Name": userName,
      "User-Secret": password,
    };
    try {
      await axios.get("https://api.chatengine.io/chats", {
        headers: authObject,
      });
      localStorage.setItem("username", userName);
      localStorage.setItem("password", password);
      window.location.reload();
    } catch (error) {
      setError("Oops! incorrect credentials.");
    }
  };
  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">React Chat Application</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            placeholder="Username.."
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            required
          />
          <input
            type="password"
            className="input"
            placeholder="Password.."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <div align="center">
            <button type="submit" className="button">
              <span>Start Chatting</span>
            </button>
          </div>
          <h2 className="error">{error}</h2>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
