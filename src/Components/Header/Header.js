import Switch from '@mui/material/Switch';
import "./style.css";
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { useContext } from 'react';
import { TodoContext } from '../../Context/todoContext';



const Header = ()=>{
    const {SetSearchString, searchValue,setTheme,theme} = useContext(TodoContext);
    return (
        <div className='header'>
            <img src='https://blog.aysima.com/wp-content/uploads/2023/09/Google_Keep_icon_2020.svg_.png'/>
            <div className="search">
             <SearchSharpIcon style={{color:"black"}} />
             <input type="text" value={searchValue} onChange={(e)=>{SetSearchString(e.target.value)}} />
            </div>
            <div><Switch onChange={()=>{setTheme(!theme)}} /></div>
        </div>
    )
}

export default Header;