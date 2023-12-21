import Header from "./Components/Header/Header";
import NotesContainer from "./Components/NotesContainer/NotesContainer";
import { useState,useEffect } from "react";
import CreateNote from "./Components/CreateNote/CreateNote";


function App() {
  return (
   <div  className="app" >
      <Header />
      <hr/>
      <div className="create-note-container"><CreateNote/></div>
     < NotesContainer />
   </div>
  );
}

export default App;
