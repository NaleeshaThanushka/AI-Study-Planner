import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Notes = () => {
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };

  // Fetch notes
  const fetchNotes = async () => {
    const { data } = await axios.get("/api/notes", config);
    setNotes(data);
  };

  useEffect(() => {
    if (user) fetchNotes();
  }, [user]);

  // Create note
  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.post("/api/notes", { title, description }, config);
    setTitle("");
    setDescription("");
    fetchNotes();
  };

  // Delete note
  const deleteNote = async (id) => {
    await axios.delete(`/api/notes/${id}`, config);
    fetchNotes();
  };

  return (
    <div>
      <h2>Your Notes</h2>
      <form onSubmit={submitHandler}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Note</button>
      </form>

      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
