import React from 'react'
import { useState,useContext } from "react";
import ThemeContext from './context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import "../login.css"

function Login() {
    const {user, setUser} = useContext(ThemeContext)
    const navigate = useNavigate()
    const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: ""
  });

  const Submit =(e) => {
    e.preventDefault()
    if (!contact.fName || !contact.lName || !contact.email) {
  alert("Please fill out all fields");
  return;
}setUser(contact)
    setContact(
        {
    fName: "",
    lName: "",
    email: ""
  }
    )
    navigate('/Home');
  }

  const handleChange = (event) => {
    const { value,name } = event.target;
    setContact((prevValue) => (
        {
        ...prevValue,
         [name]: value
        })
        
      //Too long way
      // if (name === 'fName'){
      //   return {
      //     fName:value,
      //     lName:prevValue.lName,
      //     email:prevValue.email
      //   }
      // } else if (name === 'lName'){
      //   return {
      //     fName:prevValue.fName,
      //     lName:value,
      //     email:prevValue.email
      //   }
      // }
      // else if (name === 'email'){
      //   return {
      //     fName:prevValue.fName,
      //     lName:prevValue.lName,
      //     email:value
      //   }
      // }
    )
  };
  return (
     <div className="container">
      <h1>
       Login
      </h1>

      <form onSubmit={Submit}>
        <input name="fName" className='logininput' onChange={handleChange}   placeholder="First Name" value={contact.fName} />
        <input name="lName"  className='logininput' onChange={handleChange} placeholder="Last Name" value={contact.lName}/>
        <input className='logininput' name="email"
        onChange={handleChange} placeholder="Email" value={contact.email}/>
        <button  className='btn' type='submit' >Submit</button>
      </form>
    </div>
  )
}

export default Login