import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const [plans, setPlans] = useState([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [editId, setEditId] = useState(null);

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch plans
  const fetchPlans = async () => {
    const res = await api.get("/plans");
    setPlans(res.data);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Create plan
  const createPlan = async () => {
    if (!title || !subject) return alert("Title & Subject required");
    await api.post("/plans", { title, subject });
    setTitle("");
    setSubject("");
    fetchPlans();
  };

  // Delete plan
  const deletePlan = async (id) => {
    await api.delete(`/plans/${id}`);
    fetchPlans();
  };

  // Mark completed
  const markDone = async (id) => {
    await api.put(`/plans/${id}`, { completed: true });
    fetchPlans();
  };

  // Update plan
  const updatePlan = async (id) => {
    await api.put(`/plans/${id}`, { title, subject });
    setEditId(null);
    setTitle("");
    setSubject("");
    fetchPlans();
  };

  // Logout handler
  const handleLogout = () => {
    logout();          // clears token inside AuthContext
    navigate("/");     // redirect to login/home
  };

  // Sort: incomplete first
  const sortedPlans = [...plans].sort(
    (a, b) => a.completed - b.completed
  );

  return (
    <div style={{ padding: 40 }}>
      <h2>📚 My Study Plans</h2>

      <button onClick={handleLogout}>Logout</button>

      <hr />

      <h3>Add New Plan</h3>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <button onClick={createPlan}>Add</button>

      <hr />

      <ul>
        {sortedPlans.map((p) => (
          <li key={p._id} style={{ marginBottom: 10 }}>
            {editId === p._id ? (
              <>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <button onClick={() => updatePlan(p._id)}>Save</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: p.completed ? "line-through" : "none",
                    marginRight: 10,
                  }}
                >
                  {p.title} - {p.subject}
                </span>

                {!p.completed && (
                  <button onClick={() => markDone(p._id)}>✔</button>
                )}
                <button
                  onClick={() => {
                    setEditId(p._id);
                    setTitle(p.title);
                    setSubject(p.subject);
                  }}
                >
                  ✏️
                </button>
                <button onClick={() => deletePlan(p._id)}>❌</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
