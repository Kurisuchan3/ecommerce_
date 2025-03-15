import React, { useState } from "react";
import axios from "../api"; // Axios configured with baseURL
import { useNavigate } from "react-router-dom";

const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  console.log("🔵 Login Button Clicked!");
  console.log("🔵 Login Attempt:", { email, password });

  try {
      await axios.get("/sanctum/csrf-cookie");
      console.log("🟢 CSRF Cookie Set");

      const response = await axios.post("/login", { email, password });
      console.log("🟢 Login Response:", response.data);

      if (response.data.token) {
          sessionStorage.setItem("user", JSON.stringify(response.data.user));
          sessionStorage.setItem("token", response.data.token);
          navigate("/dashboard");
      } else {
          console.log("🔴 No token received");
          setError("Login failed. No token received.");
      }
  } catch (err) {
      console.error("🔴 Login Error:", err.response ? err.response.data : err);
      setError(err.response?.data?.message || "Login failed.");
  }

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
