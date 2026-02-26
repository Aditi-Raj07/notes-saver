import React, { useState, useEffect } from "react";
import "./App.css";

function App() {

  // ===== States =====
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // ===== Load notes from localStorage on first render =====
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  // ===== Update localStorage whenever notes change =====
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // ===== Save Note =====
  const saveNote = () => {
    if (noteText.trim() === "") {
      alert("Note cannot be empty!");
      return;
    }

    const newNote = {
      id: Date.now(),
      content: noteText,
      date: new Date().toLocaleString()
    };

    setNotes([...notes, newNote]);
    setNoteText("");
  };

  // ===== Delete Note =====
  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
  };

  // ===== Edit Note =====
  const editNote = (id) => {
    const noteToEdit = notes.find(note => note.id === id);
    setNoteText(noteToEdit.content);
    deleteNote(id);
  };

  // ===== Clear All =====
  const clearAllNotes = () => {
    if (window.confirm("Delete all notes?")) {
      setNotes([]);
    }
  };

  // ===== Filtered Notes (Search) =====
  const filteredNotes = notes.filter(note =>
    note.content.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="container">
        <h2 className="title">📝✨ My Cute Notes</h2>

        {/* Textarea */}
        <textarea
          placeholder="Write your note..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />

        {/* Character Counter */}
        <p>Characters: {noteText.length}</p>

        {/* Buttons */}
        <button className="save-btn" onClick={saveNote}>Save</button>
        <button className="clear-btn" onClick={clearAllNotes}>Clear All</button>
        <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>

        {/* Search */}
        <input
          type="text"
          placeholder="Search notes..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {/* Notes Display */}
        <div className="notes-grid">
  {filteredNotes.map(note => (
    <div key={note.id} className="note">
      <p>{note.content}</p>
      <small>{note.date}</small>
      <br />
      <button className="edit-btn" onClick={() => editNote(note.id)}>Edit</button>
      <button className="delete-btn" onClick={() => deleteNote(note.id)}>Delete</button>
    </div>
  ))}
  </div>
</div>
         
        

      
    </div>
  );
}

export default App;