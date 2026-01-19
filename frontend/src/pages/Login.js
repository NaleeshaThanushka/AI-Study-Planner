import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // ✅ Correct handleLogin
  const handleLogin = async (e) => {
    e.preventDefault(); // prevent form reload
    try {
      const res = await api.post("/auth/login", { email, password });

      // Store token
      localStorage.setItem("token", res.data.token);

      // Optional message
      setMsg("Login successful!");
      
      // Navigate to Dashboard
      navigate("/dashboard");
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br/><br/>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/><br/>

        <button type="submit">
          Login
        </button>
      </form>

      <p>{msg}</p>

      {/* Optional: Test Protected API */}
      <button
        onClick={async () => {
          try {
            const res = await api.get("/protected");
            alert(res.data.message);
          } catch (err) {
            alert(err.response?.data?.message || "Access denied");
          }
        }}
      >
        Test Protected API
      </button>
    </div>
  );
};

export default Login;
