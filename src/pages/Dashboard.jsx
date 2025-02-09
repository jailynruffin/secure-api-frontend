import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        setMessage("Unauthorized! Please log in.");
        setTimeout(() => navigate("/login"), 2000);
        return;
      }
  
      try {
        const response = await API.get("/auth/me", {
          headers: { Authorization: token },
        });
        console.log("User data:", response.data.user); // Debug: Check user data
        setUser(response.data.user); // Set the user state
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to fetch user data");
        localStorage.removeItem("token");
        setTimeout(() => navigate("/login"), 2000);
      }
    };
  
    fetchUserData();
  }, [navigate]);
  

  return (
    <div>
      <h1>Dashboard</h1>
      {message && <p>{message}</p>}
      {user ? (
        <div>
          <h2>Welcome, {user.username || "User"}!</h2>
          <p>Email: {user.email || "Not available"}</p>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
