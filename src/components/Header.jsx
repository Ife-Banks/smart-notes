import React,{useContext} from "react";
import ThemeContext from './context/ThemeContext';
import { Typewriter } from 'react-simple-typewriter'
function Header() {
  const {user} = useContext(ThemeContext)
  const time =new Date()
  const Hour= time.getHours()
  if(Hour <12){
    var Greetings = "Good Morning"
  }
  else if (Hour < 17) {
    Greetings = 'Good Afternoon'
  } else {
    Greetings = 'Good Evening';
  }

  const FullGreetings = `${Greetings}, ${user.fName}`;
  return (
    <header>
      <h1>
        <Typewriter 
        words={[FullGreetings]}
        typeSpeed={60}
        cursor
        cursorStyle='|'
        cursorBlinking
        />
      </h1>
    </header>
  );
}

export default Header;
