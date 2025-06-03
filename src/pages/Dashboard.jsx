import React, { useContext, useState } from "react";
import { NotesContext } from "../context/NotesContext";
import { UserButton } from "@clerk/clerk-react";

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
     <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-blue-600">iNote</h1>
                  </div>
                  <div className="flex items-center">
                    {/*<span className="mr-4 text-gray-700">Welcome, {username}!</span>*/}
                    {/* User Button (mock of Clerk's UserButton) */}
                    <div className="relative">
                      <UserButton />
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
              {/* Note Form */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Add a New Note</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="What's on your mind?"
                    className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  />
                  <button
                    onClick={addNote}
                    className="!rounded-button bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors sm:w-auto w-full cursor-pointer"
                  >
                    Add Note
                  </button>
                </div>
              </div>

              {/* Notes List */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Your Notes</h2>
                
                {notes.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-sticky-note text-blue-400 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">No notes yet</h3>
                    <p className="text-gray-500">Add your first note to get started!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notes.map(note => (
                      <div key={note.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <p className="text-gray-800 break-words">{note.content}</p>
                          <button 
                            onClick={() => deleteNote(note.id)}
                            className="text-red-500 hover:text-red-700 ml-2 cursor-pointer"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                        <p className="text-xs text-gray-500">{note.timestamp}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </main>
          </div>
  );
};

export default Dashboard;
