import { createContext, useCallback, useEffect, useState } from "react";

export const TodoContext = createContext();

export const TodoContextProvider = ({children})=>{

 const [notes,setNotes] = useState([]); // keep track of array of notes
 const [edit,SetEdit] = useState(null); // keep track of object we want to edit
 const [searchValue,SetSearchValue] = useState(""); // keep track of search value
 const [theme,SetTheme] = useState(false); // keep track of theme


 // control theme
 useEffect(()=>{
    if(!theme){
       document.body.style.backgroundColor= "white";
       document.body.style.color = "black";
    }
    else{
      document.body.style.backgroundColor= "#202124";
    }
  },[theme])

// to avoid unwanted rerendering
 const setEditComponent = useCallback((value)=>{
    SetEdit(value);
 },[]);

 const SetSearchString = useCallback((value)=>{
     SetSearchValue(value);
 },[]) ;

 const setTheme = useCallback((value)=>{
  SetTheme(value);
 },[]);

 

 useEffect(()=>{
    if(localStorage.getItem('notes')){ // if there any thing is stored on local storage
        let arr = JSON.parse(localStorage.getItem('notes'));
        setNotes(arr);
     }
 },[]);

 // for adding notes into the array
 function addNote(value){
    let arr =  [...notes,value];
    localStorage.setItem('notes',JSON.stringify(arr));
   setNotes(arr);
 }

 // for delete notes
 function deleteNote(value){
    let arr = notes.filter((item)=>{
        return item.id!==value.id;
      });
      localStorage.setItem('notes',JSON.stringify(arr));
      setNotes(arr);
 }
 
 // for edit nodes
 function updateNote(value){
    let index;
    for(let i=0;i<notes.length;i++){
        if(value.id===notes[i].id){
            index = i;
            break;
        }
    }
    let arr = structuredClone(notes);
    arr[index] = value;
    localStorage.setItem('notes',JSON.stringify(arr));
    setNotes(arr);
 }

 // for drag and drop functionality
 function swapNotes(index_1,index_2){
    let arr = structuredClone(notes);
    let tmp = arr[index_1];
    arr[index_1]=arr[index_2];
    arr[index_2]=tmp;
    localStorage.setItem('notes',JSON.stringify(arr));
    setNotes(arr);
 }

 
    return (
        <TodoContext.Provider value={
            {
            notes,
            addNote,
            deleteNote,
            updateNote,
            swapNotes,
            setEditComponent,
            edit,
            SetSearchString,
            searchValue,
            setTheme,
            theme
            }
        } >
            {children}
        </TodoContext.Provider>
    )
}

