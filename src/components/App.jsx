
import React, {useEffect, useState} from 'react';
import ThemeContext from './context/ThemeContext';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import TodoPage from './TodoPage';
function App() {

    const[user, setUser] =useState(()=>{
      return JSON.parse(localStorage.getItem('user')) || []
    })

    const [theme,setTheme] = useState('light')

    useEffect(()=>{
      localStorage.setItem('user',JSON.stringify(user))
    },[user])
    const userContext ={
      user,
      theme,
      setUser,
      setTheme

    }
   
  return (
    <ThemeContext.Provider value={userContext}>
      <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/Home' element={<TodoPage/>} />
      </Routes>
    </Router>
    </ThemeContext.Provider>
  )
}

export default App; // Export App component