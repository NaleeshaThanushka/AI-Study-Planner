import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "../pages/Dashbord.css";

const Dashboard = () => {
  const [plans, setPlans] = useState([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [editId, setEditId] = useState(null);

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchPlans = async () => {
    const res = await api.get("/plans");
    setPlans(res.data);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const createPlan = async () => {
    if (!title || !subject) return alert("Title & Subject required");
    await api.post("/plans", { title, subject });
    setTitle("");
    setSubject("");
    fetchPlans();
  };

  const deletePlan = async (id) => {
    await api.delete(`/plans/${id}`);
    fetchPlans();
  };

  const markDone = async (id) => {
    await api.put(`/plans/${id}`, { completed: true });
    fetchPlans();
  };

  const updatePlan = async (id) => {
    await api.put(`/plans/${id}`, { title, subject });
    setEditId(null);
    setTitle("");
    setSubject("");
    fetchPlans();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getOpenAISuggestion = async () => {
    try {
      if (!subject) return alert("Enter subject first");
      const res = await api.post("/ai/suggest", { subject, hours: 3 });
      alert(res.data.suggestion);
    } catch {
      alert("Failed to get AI suggestion");
    }
  };

  const sortedPlans = [...plans].sort((a, b) => a.completed - b.completed);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>📚 My Study Plans</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="add-plan">
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
        <button className="ai-btn" onClick={getOpenAISuggestion}>
          AI Suggestion
        </button>
      </div>

      <ul className="plan-list">
        {sortedPlans.map((p) => (
          <li key={p._id} className="plan-item">
            {editId === p._id ? (
              <>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
                <input value={subject} onChange={(e) => setSubject(e.target.value)} />
                <button onClick={() => updatePlan(p._id)}>Save</button>
              </>
            ) : (
              <>
                <span
                  className={`plan-text ${p.completed ? "completed" : ""}`}
                >
                  {p.title} - {p.subject}
                </span>

                <div className="plan-actions">
                  {!p.completed && (
                    <button className="done-btn" onClick={() => markDone(p._id)}>
                      ✔
                    </button>
                  )}
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditId(p._id);
                      setTitle(p.title);
                      setSubject(p.subject);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deletePlan(p._id)}
                  >
                    ❌
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
