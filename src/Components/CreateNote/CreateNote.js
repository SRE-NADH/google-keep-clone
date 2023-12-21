import { useEffect, useState,useContext } from "react";
import { nanoid } from "nanoid";
import { TodoContext } from "../../Context/todoContext";
import "./style.css";
import ColorLensIcon from '@mui/icons-material/ColorLens';



const CreateNote = ()=>{
    
const [text,SetText]= useState("");

const {updateNote,addNote,edit,setEditComponent} = useContext(TodoContext);

const [title,setTitle] = useState("");


const [color,setColor] = useState("#EBECED");

// for controlling colorpanel visibility
const [isClick,setIsClick] = useState(false); 



//  mount all data to the component 
useEffect(()=>{
    if(edit){
        SetText(edit.text);
        setColor(edit.color);
        setTitle(edit.title);
    }
},[edit]);


function handleData(){
    if(text.trim().length<=0 && title.trim().length<=0) return;
    //  edit data
    if(edit){
       edit.text=text;
       edit.color=color;
       edit.title = title;
       updateNote(edit);
       setEditComponent(null);
    }
    //save data
   else{
    let date = new Date();
    let obj = {
        id : nanoid(),
        title:title,
        text: text,
        color:color,
        date:  date.toLocaleDateString()
    }
     addNote(obj);
     }
     SetText("");
     setTitle("");
     setColor("#EBECED");
 }
  
 function handleColor(e){
   setColor(e.target.getAttribute("data-color"));
   setIsClick(false);
 }



    return (
        <div style={{backgroundColor:color}} className={edit?"create-note center-box":"create-note"}
        
         >
           <input placeholder="Title" style={{backgroundColor:color}} value={title}  onChange={(e)=>{setTitle(e.target.value)}} />
           <textarea    style={{backgroundColor:color}} value={text}   onChange={(e)=>{SetText(e.target.value)}} rows='8'
				cols='10'
				placeholder='Type to add a note...'
			>
          </textarea>
        <div className="footer">
             <button onClick={handleData} >save</button>
             {isClick ?<div className="colors"  >
                    <div onClick={handleColor} style={{backgroundColor:"#C0C0C0"}}  data-color="#C0C0C0" ></div>
                    <div onClick={handleColor}  style={{backgroundColor:"#d7aefb"}}  data-color="#d7aefb" ></div>
                    <div onClick={handleColor}  style={{backgroundColor:"#fbbc04"}} data-color="#fbbc04" ></div>
                    <div onClick={handleColor}  style={{backgroundColor:"#a7ffeb"}}  data-color="#a7ffeb" ></div>
                    <div onClick={handleColor}  style={{backgroundColor:"#EBECED"}}  data-color="#EBECED" ></div>
             </div> : <div onClick={()=>{setIsClick(true)}}  className="color-icon">
                <ColorLensIcon/>
             </div> }
            
             
          </div>

        </div>
    )
}
export default CreateNote;