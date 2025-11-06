import React, { useRef, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import "../styles.css";
import supabase from '../config/supabaseClient';

function TodoPage() {
  const [fetchError, setFetchError] = useState(null);
  const [notes, setNotes] = useState([]);
  const [formError, setFormError] = useState(null);
  const [inputText, setInputText] = useState({
    title: "",
    content: ""
  });

  const InputRef = useRef(null);

  // Fetch notes from Supabase on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const { data, error } = await supabase
        .from("Keeper-smart-app")
        .select()
        .order('created_at', { ascending: false }); // Optional: order by creation date

    if (error) {
      setFetchError('Could not fetch the notes');
      setNotes([]);
      console.error(error);
    }
    if (data) {
      setNotes(data);
      setFetchError(null);
    }
  };

  // Handles changes in input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputText((prevValue) => ({
      ...prevValue,
      [name]: value
    }));
  };

  // Adds a new note to Supabase
  const addList = async (e) => {
    e.preventDefault();

    // Validate input
    if (!inputText.title || !inputText.content) {
      setFormError('Please fill in all the fields correctly');
      return;
    }

    // Insert into Supabase
    const { data, error } = await supabase
        .from("Keeper-smart-app")
        .insert([
          {
            title: inputText.title,
            content: inputText.content
          }
        ])
        .select();

    if (error) {
      setFormError('Error adding note: ' + error.message);
      console.error(error);
      return;
    }

    if (data) {
      // Add the new note to the local state
      setNotes((prevNotes) => [data[0], ...prevNotes]);
      // Reset form
      setInputText({
        title: "",
        content: ""
      });
      setFormError(null);
      InputRef.current?.focus();
    }
  };

  // Deletes a note from Supabase
  const deleteItem = async (id) => {
    const { error } = await supabase
        .from("Keeper-smart-app")
        .delete()
        .eq('id', id);

    if (error) {
      console.error('Error deleting note:', error);
      setFetchError('Could not delete the note');
      return;
    }

    // Remove from local state
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
      <div className='head'>
        <Header />
        <CreateArea
            change={handleChange}
            listing={addList}
            value={inputText.title}
            val={inputText.content}
            myRef={InputRef}
        />

        {formError && <p className="error-message">{formError}</p>}
        {fetchError && <p className="error-message">{fetchError}</p>}

        <div>
          {notes.length > 0 ? (
              notes.map((note) => (
                  <Note
                      key={note.id}
                      id={note.id}
                      title={note.title}
                      content={note.content}
                      onDelete={deleteItem}
                  />
              ))
          ) : (
              !fetchError && <p>No notes yet. Create your first note!</p>
          )}
        </div>

        <Footer />
      </div>
  );
}

export default TodoPage;