import React from "react"; // Import React library

// Note component receives props from parent
function Note(props) {
  // Function to handle delete button click
  const handleClick = () => {
    props.onDelete(props.id); // Call onDelete function passed from parent with note id
  };

  return (
    <div className="note"> {/* Container for the note */}
      <h1>{props.title}</h1> {/* Display note title */}
      <p>{props.content}</p> {/* Display note content */}
      <button onClick={handleClick}>DELETE</button> {/* Delete button triggers handleClick */}
    </div>
  );
}

export default Note; // Export Note component for use in other files
