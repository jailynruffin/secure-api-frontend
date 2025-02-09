import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/login", { email, password });
      setMessage(`Login successful! Welcome, ${response.data.user.username}`);
      localStorage.setItem("token", response.data.token); // Save token for authentication
      setTimeout(() => navigate("/dashboard"), 1000); // Redirect after login
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Login</h1>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
  

export default Login;

  