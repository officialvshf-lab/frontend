import { useState } from "react";
import axios from "axios";

export const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/login`,
        { email, password }
      );

      localStorage.setItem("adminToken", res.data.token);
      window.location.href = "/admin";
    } catch {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div style={box}>
      <h2>Admin Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>
    </div>
  );
};

const box = {
  maxWidth: "300px",
  margin: "100px auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px"
};
