import React, { useContext, useState } from "react";
import { NotesContext } from "../context/NotesContext"; // Ensure path is correct
import { UserButton } from "@clerk/clerk-react"; // Assuming Clerk is integrated
import NoteEditor from "../components/NoteEditor.jsx"; // Path to your NoteEditor component
import NoteList from "../components/NoteList.jsx";   // Path to your NoteList component

const Dashboard = () => {
  // Get all necessary context functions and state
  const { notes, addNote, deleteNote, updateNote } = useContext(NotesContext);

  // State for filtering and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [sortBy, setSortBy] = useState('createdAt'); // 'createdAt', 'modificationTime', 'priority'

  // New state for managing editing mode
  const [editingNote, setEditingNote] = useState(null); // Holds the note object being edited

  // Function to start editing a note
  const handleStartEditing = (note) => {
    setEditingNote(note); // Set the note to be edited
  };

  // Function to save/update a note (called from NoteEditor)
  const handleSaveNote = (noteData) => {
    if (editingNote) {
      // If editingNote exists, it means we are updating
      updateNote({ ...editingNote, ...noteData }); // Merge existing note data with updated fields
      setEditingNote(null); // Exit editing mode
    } else {
      // Otherwise, it's a new note
      addNote(noteData);
    }
  };

  // Function to cancel editing
  const handleCancelEditing = () => {
    setEditingNote(null); // Exit editing mode
  };

  // Filtering and Sorting Logic (remains the same)
  const filteredAndSortedNotes = notes
    .filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'All' || note.category === filterCategory;
      const matchesPriority = filterPriority === 'All' || note.priority === filterPriority;
      return matchesSearch && matchesCategory && matchesPriority;
    })
    .sort((a, b) => {
      if (sortBy === 'createdAt') {
        return new Date(b.createdAt) - new Date(a.createdAt); // Newest first
      } else if (sortBy === 'modificationTime') {
        return new Date(b.modificationTime) - new Date(a.modificationTime); // Newest first
      } else if (sortBy === 'priority') {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">iNote</h1>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <UserButton />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex flex-wrap lg:flex-nowrap gap-8">
        {/* Note Editor Section */}
        <section className="w-full lg:w-1/2 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50 h-fit">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {editingNote ? "Edit Note" : "Add a New Note"}
          </h2>
          {/* Pass the note to edit and the specific save/cancel handlers */}
          <NoteEditor
            noteToEdit={editingNote} // Pass the note if in edit mode
            onSave={handleSaveNote}   // Centralized save function for add/update
            onCancel={handleCancelEditing} // Handler for cancel button (only visible in edit mode)
          />
        </section>

        {/* Notes List and Controls Section */}
        <section className="w-full lg:w-1/2 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Notes</h2>

          {/* Filtering and Sorting Controls */}
          <div className="flex flex-wrap gap-3 mb-6">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="All">All Categories</option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="School">School</option>
              <option value="Ideas">Ideas</option>
              <option value="Other">Other</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="createdAt">Sort by Created Date</option>
              <option value="modificationTime">Sort by Modified Date</option>
              <option value="priority">Sort by Priority</option>
            </select>
          </div>

          {/* Note List Component */}
          <NoteList
            notes={filteredAndSortedNotes}
            deleteNote={deleteNote}
            onEdit={handleStartEditing} // Pass the new handler
          />
        </section>
      </main>

      {/* Optional: Footer */}
      <footer className="text-center mt-8 pt-6 border-t border-gray-200 text-gray-600 text-sm max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p>Designed by <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Your Company/Name</a></p>
      </footer>
    </div>
  );
};

export default Dashboard;
