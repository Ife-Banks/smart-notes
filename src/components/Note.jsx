import React from "react";

// Note component receives props from parent
function Note({ id, title, content, onDelete, smoothie }) {
    // Function to handle delete button click
    const handleClick = () => {
        onDelete(id); // Call onDelete function passed from parent with note id
    };

    // If smoothie prop exists, use it (for backward compatibility)
    // Otherwise use individual props
    const noteTitle = smoothie ? smoothie.title : title;
    const noteContent = smoothie ? smoothie.content : content;
    const noteId = smoothie ? smoothie.id : id;

    return (
        <div className="note">
            <h1>{noteTitle}</h1>
            <p>{noteContent}</p>
            <button onClick={() => onDelete(noteId)}>DELETE</button>
        </div>
    );
}

export default Note;