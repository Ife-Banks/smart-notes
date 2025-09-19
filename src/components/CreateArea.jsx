import React, { useState,useRef } from "react"; // Import React and useState hook
import '../styles.css'

// CreateArea component receives props from parent
function CreateArea(props) {
  return (
    
      <form className='todoform'>
        {/* Input field for note title, value and change handler passed from parent */}
        <input
        className='todoinput'
          name="title"
          placeholder="Title"
          onChange={props.change}
          value={props.value}
          ref={props.myRef}
        />
        {/* Textarea for note content, value and change handler passed from parent */}
        <textarea
        className='todotext'
          name="content"
          placeholder="Take a note..."
          rows="3"
          onChange={props.change}
          value={props.val}
        />
        {/* Button to add note, click handler passed from parent */}
        <button className='todobtn' onClick={props.listing}>Add</button>
      </form>
   
  );
}

export default CreateArea; // Export the component for use in other files
