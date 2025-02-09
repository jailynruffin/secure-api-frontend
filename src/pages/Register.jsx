import { useState } from "react";
import API from "../api";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/register", { username, email, password });
      setMessage(`Registration successful! Welcome, ${response.data.user.username}`);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Register</h1>
        <form>
          <input type="text" placeholder="Username" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }

export default Register;

  