import React from 'react';
import NoteItem from './NoteItem.jsx'; // Ensure correct path with .jsx

function NoteList({ notes, deleteNote, onEdit }) { // Added onEdit prop
  if (notes.length === 0) {
    return (
      <p className="text-center text-gray-500 p-4 border border-dashed border-gray-300 rounded-md mt-4">
        No notes found. Start by creating one!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
      {notes.map((note) => (
        // Pass onEdit down to NoteItem
        <NoteItem key={note.id} note={note} deleteNote={deleteNote} onEdit={onEdit} />
      ))}
    </div>
  );
}

export default NoteList;
