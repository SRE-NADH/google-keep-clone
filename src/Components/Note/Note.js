import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import "./style.css";
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { useState,useContext, useEffect } from 'react';
import { TodoContext } from '../../Context/todoContext';



const Note = ({item})=>{
 
    const [noteTheme,SetNoteTheme] = useState("azure"); // keep track of theme of note
    
    const {notes,swapNotes,deleteNote,setEditComponent,edit,updateNote} = useContext(TodoContext); 
    // for controlling colorpanel visibility
const [isClick,setIsClick] = useState(false);
   
    // set note Theme when changing edit 
    useEffect(()=>{
        if(item.color){
            SetNoteTheme(item.color);
        }
    },[edit]);  


    function contrlDragStart(e,id){
        e.dataTransfer.setData("parent",id);
        
    }

    // drag and drop functionality
    function controlOnDrop(e,targetId){
     let dragId =  e.dataTransfer.getData('parent');

     // iterate notes to find index of drag and drop elements
     let dragIndex = notes.findIndex((item)=> item.id===dragId);
     let dropIndex = notes.findIndex((item)=> item.id===targetId)
    
      // swap the elements in the array
      swapNotes(dragIndex,dropIndex);
    }


    // confirm delete before deleting note
    function handleDelete(e){
        const Confirmed = window.confirm('Are you sure you want to delete this note?');
        if(Confirmed){
            deleteNote(item);
        }
    }

  //handle color when click on the color    
 function handleColor(e){
    SetNoteTheme(e.target.getAttribute("data-color"));
    setIsClick(false);
    item.color = e.target.getAttribute("data-color");
    // update note array
    updateNote(item);
  }
   

    return (
        <div onDragStart={(e)=>{contrlDragStart(e,item.id)}}
         onDragOver={(e)=>{e.preventDefault()}}
         onDrop={(e)=>{controlOnDrop(e,item.id)}}
         draggable
         className={edit?"note":"note note-hover"} style={{backgroundColor:noteTheme}}>
            <div style={(edit && edit.id===item.id?{color:"blue"}:{color:"black"})   }>
                <div className='title-container'>
                    {item.title}
                </div>
               <div className='text-container'>
                    {item.text}
               </div>  
            </div>
         
          <div className="footer">
             <p>{item.date}</p>
             <div className='edit'onClick={()=>{ setEditComponent(item)}} ><EditNoteIcon /></div>
             <div className='delete'onClick={handleDelete} ><DeleteOutlineIcon/></div>
             {isClick ?<div className="colors"  >
                    <div onClick={handleColor} style={{backgroundColor:"#C0C0C0"}}  data-color="#C0C0C0" id="white"></div>
                    <div onClick={handleColor}  style={{backgroundColor:"#d7aefb"}}  data-color="#d7aefb" id="purple"></div>
                    <div onClick={handleColor}  style={{backgroundColor:"#fbbc04"}} data-color="#fbbc04" id="orange"></div>
                    <div onClick={handleColor}  style={{backgroundColor:"#a7ffeb"}}  data-color="#a7ffeb" id="teal"></div>
             </div> : <div className="color-icon"  onClick={()=>{setIsClick(true)}} >
                <ColorLensIcon/>
             </div> }
          </div>
        </div>
    )
}
export default Note;