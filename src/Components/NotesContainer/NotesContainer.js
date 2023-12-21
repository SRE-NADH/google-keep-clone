import { TodoContext } from "../../Context/todoContext";
import Note from "../Note/Note";
import CreateNote from "../CreateNote/CreateNote";
import { useState,useContext } from "react";
import "./style.css"

const NotesContainer = ()=>{

    let {notes,searchValue} = useContext(TodoContext);
    let newArr=notes;
    if(searchValue){
     // filter notes array according to search value   
     newArr = notes.filter((item)=>{ return item.text.toLowerCase().includes(searchValue.toLowerCase())||  item.title.toLowerCase().includes(searchValue.toLowerCase())})
    }

    return (
           <div className="notes">
              {newArr.slice().reverse().map((item)=>(
                 <Note key={item.id} item={item}/>
              ))}
          </div>
    )
}
 export default NotesContainer;