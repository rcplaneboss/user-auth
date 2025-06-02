import React, { useContext, useState } from "react";
import { NotesContext } from "../context/NotesContext";

const Dashboard = () => {
  const { notes, addNote, deleteNote } = useContext(NotesContext);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (newNote.trim()) {
      addNote(newNote);
      setNewNote("");
    }
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4 md:px-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter a new note"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <button
          onClick={handleAddNote}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      <ul className="space-y-3">
        {notes.length === 0 ? (
          <li className="text-gray-500">No notes yet.</li>
        ) : (
          notes.map((note, index) => (
            <li
              key={index}
              className="flex justify-between items-center border-b pb-2"
            >
              <span>{note}</span>
              <button
                onClick={() => deleteNote(index)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
