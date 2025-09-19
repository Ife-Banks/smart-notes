import React, { useRef } from 'react'
import { useEffect, useState } from "react"; // Import useState hook from React
import Header from "./Header"; // Import Header component
import Footer from "./Footer"; // Import Footer component
import Note from "./Note"; // Import Note component
import CreateArea from "./CreateArea"; // Import CreateArea component
import "../styles.css"

function TodoPage() {

    // State for input fields (title and content)
  const [inputText, setInputText] = useState({
    title: "",
    content: ""
  });

  // State for list of notes
  const [list, setList] = useState(()=>{
    return JSON.parse(localStorage.getItem('list')) || []
  });

  const InputRef = useRef(focus)

  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list))
  },[list])

  // Handles changes in input fields
  const handleChange = (event) => {
    const { name, value } = event.target; // Destructure name and value from event
    setInputText((prevValue) => ({
      ...prevValue, // Keep previous values
      [name]: value // Update the changed field
    }));
    // console.log(inputText); // Debug: log current inputText
  };

  // Adds a new note to the list
  const addList = (e) => {
    setList((prevValue) => [
      ...prevValue, // Keep previous notes
      inputText // Add new note
    ]);
    setInputText({
      title: "",
      content: ""
    }); // Reset input fields
    e.preventDefault();
    InputRef.current.focus() // Prevent default form submission
  };

  // Deletes a note by its index
  const deleteItem = (id) => {
    setList((prevValue) =>
      prevValue.filter((_, index) => index !== id) // Remove note with matching index
    );
  };

  return (
    <div className='head'>
      <Header /> {/* Render Header */}
      <CreateArea
        change={handleChange} // Pass input change handler
        listing={addList} // Pass add note handler
        value={inputText.title} // Pass title value
        val={inputText.content} 
        myRef={InputRef}// Pass content value
      />
      <div>
        {/* Render each note in the list */}
        {list.map((note, index) => (
          <Note
            key={index} // Unique key for each note
            id={index} // Pass index as id
            title={note.title} // Pass note title
            content={note.content} // Pass note content
            onDelete={deleteItem} // Pass delete handler
          />
        ))}
      </div>
      <Footer /> {/* Render Footer */}
    </div>
  );
}

export default TodoPage