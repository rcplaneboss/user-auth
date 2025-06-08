import React from "react";
import DOMPurify from "dompurify"; // To safely render HTML content

// Make sure you have FontAwesome installed and configured if you want the icon
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function NoteItem({ note, deleteNote, onEdit }) {
  // Added onEdit prop
  // note and deleteNote are passed as props from NoteList.js
  // Sanitize the HTML content before rendering to prevent XSS attacks
  const sanitizedContent = DOMPurify.sanitize(note.content, {
    USE_PROFILES: { html: true },
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-200 text-red-800";
      case "Medium":
        return "bg-yellow-200 text-yellow-800";
      case "Low":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col justify-between h-full">
      <h3 className="text-xl font-semibold text-blue-600 mb-2">{note.title}</h3>
      <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mb-4">
        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md font-medium">
          Category: {note.category}
        </span>
        <span
          className={`px-2 py-1 rounded-md font-medium ${getPriorityColor(note.priority)}`}
        >
          Priority: {note.priority}
        </span>
      </div>
      <div
        className="text-gray-800 leading-relaxed mb-4 overflow-hidden max-h-48 text-base quill-content-display"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      ></div>
      <div className="flex justify-between items-center pt-4 border-t border-gray-100 text-sm text-gray-500">
        <span className="flex flex-col">
          {/* Display createdAt and modificationTime from the note object */}
          <span>Created: {new Date(note.createdAt).toLocaleDateString()}</span>
          <span>
            Modified: {new Date(note.modificationTime).toLocaleDateString()}
          </span>
        </span>
        <div className="flex space-x-2">
          {" "}
          {/* Container for buttons */}
          <button
            onClick={() => onEdit(note)} // Call onEdit with the current note
            className="text-blue-500 hover:text-blue-700 transition-colors p-1 rounded"
            aria-label="Edit note"
          >
            {/* Using a simple emoji or text icon */}
            ✏️{" "}
            {/* Or <FontAwesomeIcon icon={faEdit} /> if using Font Awesome */}
          </button>
          <button
            onClick={() => deleteNote(note.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
            aria-label="Delete note"
          >
            Delete{" "}
            {/* Or <FontAwesomeIcon icon={faTrash} /> if using Font Awesome */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
