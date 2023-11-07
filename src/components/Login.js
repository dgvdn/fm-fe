import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../utils/authUtils";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && !isTokenExpired(accessToken)) {
      navigate("/dashboard");
    }
  }, [navigate]);
  

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const data = {
      username: username,
      password: password,
    };
  
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const responseData = await response.json();
  
        // Assuming the response contains an accessToken field
        const accessToken = responseData.accessToken;
        console.log(accessToken);
  
        // You can store the access token in localStorage or a state management system
        // For example, to store in localStorage:
        localStorage.setItem("accessToken", accessToken);

        // Redirect to the home page
        navigate("/dashboard");
      } else {
        // Handle login error, e.g., show an error message.
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border rounded-md"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded-md"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
