import React, { createContext, useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const NotesContext = createContext();

// Load initial state from localStorage
const initialState = JSON.parse(localStorage.getItem("notes")) || [];

const notesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTE":
      // Add new note to the beginning of the array
      return [action.payload, ...state];

    case "DELETE_NOTE":
      return state.filter((note) => note.id !== action.payload);

    case "UPDATE_NOTE":
      return state.map((note) =>
        note.id === action.payload.id ? action.payload : note
      );

    default:
      return state;
  }
};

export const NotesProvider = ({ children }) => {
  const [notes, dispatch] = useReducer(notesReducer, initialState);

  // Sync notes with localStorage whenever the notes state changes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Actions to be exposed via context
  const addNote = ({ title, category, priority, content = "" }) => {
    const now = new Date().toISOString(); // Get current timestamp
    const newNote = {
      id: uuidv4(),
      title,
      category,
      priority,
      content,
      createdAt: now,        // Creation timestamp
      modificationTime: now, // Initial modification timestamp
    };
    dispatch({ type: "ADD_NOTE", payload: newNote });
  };

  const deleteNote = (id) => {
    dispatch({ type: "DELETE_NOTE", payload: id });
  };

  const updateNote = (noteToUpdate) => {
    // Automatically update modificationTime when a note is updated
    const updatedNoteWithTime = {
      ...noteToUpdate,
      modificationTime: new Date().toISOString(),
    };
    dispatch({ type: "UPDATE_NOTE", payload: updatedNoteWithTime });
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, updateNote }}>
      {children}
    </NotesContext.Provider>
  );
};
