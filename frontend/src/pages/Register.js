import { useState } from "react";
import api from "../api/axios";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      setMsg("Registration successful ✅ You can login now");
    } catch (err) {
      setMsg(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input name="name" placeholder="Name" onChange={handleChange} /><br/><br/>
        <input name="email" placeholder="Email" onChange={handleChange} /><br/><br/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br/><br/>
        <button type="submit">Register</button>
      </form>

      <p>{msg}</p>
    </div>
  );
};

export default Register;
