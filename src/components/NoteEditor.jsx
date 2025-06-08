import React, { useState, useEffect } from "react";
// Removed ReactQuill imports as it's not currently used
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// NoteEditor now accepts noteToEdit, onSave (for both add/update), and onCancel
const NoteEditor = ({ noteToEdit, onSave, onCancel }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteCategory, setNoteCategory] = useState("Personal");
  const [notePriority, setNotePriority] = useState("Medium");
  const [noteContent, setNoteContent] = useState("");

  // Use useEffect to pre-fill the form when noteToEdit changes (i.e., when starting an edit)
  useEffect(() => {
    if (noteToEdit) {
      setNoteTitle(noteToEdit.title);
      setNoteCategory(noteToEdit.category);
      setNotePriority(noteToEdit.priority);
      setNoteContent(noteToEdit.content);
    } else {
      // Clear form if no noteToEdit (i.e., switching back to add mode)
      setNoteTitle("");
      setNoteCategory("Personal");
      setNotePriority("Medium");
      setNoteContent("");
    }
  }, [noteToEdit]); // Re-run this effect whenever noteToEdit changes

  const handleSave = () => {
    if (!noteTitle.trim() || !noteContent.trim()) {
      alert("Note title and content cannot be empty!");
      return;
    }

    // Call the onSave prop, passing the structured note data
    // The Dashboard component will decide if it's an add or an update
    onSave({
      title: noteTitle,
      category: noteCategory,
      priority: notePriority,
      content: noteContent,
    });

    // Form clearing is now handled by the useEffect after onSave sets editingNote to null
    // (or if it's a new note, it clears itself after dispatching addNote)
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="noteTitle"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Note Title
        </label>
        <input
          type="text"
          id="noteTitle"
          placeholder="Note Title"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label
            htmlFor="category"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Category
          </label>
          <select
            id="category"
            value={noteCategory}
            onChange={(e) => setNoteCategory(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-400 bg-white"
          >
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="School">School</option>
            <option value="Ideas">Ideas</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex-1">
          <label
            htmlFor="priority"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Priority
          </label>
          <select
            id="priority"
            value={notePriority}
            onChange={(e) => setNotePriority(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-400 bg-white"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Start typing your note...
        </label>
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Start typing your note..."
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-400 h-32"
        ></textarea>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleSave} // Call the new handleSave
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
        >
          {noteToEdit ? "Update Note" : "Save Note"} {/* Dynamic button text */}
        </button>

        {noteToEdit && ( // Show Cancel button only in edit mode
          <button
            onClick={onCancel} // Call the onCancel prop
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
