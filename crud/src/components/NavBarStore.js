import React,{Component} from 'react'
import { Link } from 'react-router-dom';
import DiamondIcon from '@mui/icons-material/Diamond'
import "./NavBarStore.css"
import {navItems} from "./NavItems"
import ButonStore from './ButonStore';

class NavBarStore extends Component{
  render(){
    return (
       <>
           <nav className='navbar-store'>
        
           <Link to="/" className="navbar-logo">
                 EUPHORIA
                 <DiamondIcon/>
           </Link>
           <ul className='nav-items'>
               {navItems.map((item)=>{
                   return(
                    <li key={item.id} className={item.cName}>
                         <Link  to={item.path}>{item.title}{" "}{item.icon} </Link>
                   </li>
                   );
                  
               })}
           </ul>
           
            <ButonStore/>
           </nav>
       </>
      )
  }
}

export default NavBarStore;