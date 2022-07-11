import React,{Component} from 'react'
import { Link } from 'react-router-dom';
import DiamondIcon from '@mui/icons-material/Diamond'
import "./NavBarStore.css"
import {navItems} from "./NavItems"
import axiosInstance from "../axios";
import history from '../history'
import './ButonStore.css'
class NavBarStore extends Component{
  logOut=()=>{
      let idCustomer=localStorage.getItem("USER_ID")
      axiosInstance.put("api/customers/logOut/"+idCustomer)  
      .then(
        res => {
          console.log("aici")
        }
        )
        .catch(error => {
            console.log(error)
        });
       localStorage.removeItem("USER_ID");
       localStorage.removeItem("idOrder");
       history.push("/log-in");
       window.location.reload();
    

  }
  render(){
    return (
       <>
           <nav className='navbar-store'>
        
           <Link to="" className="navbar-logo">
                 EUPHORIA
                 <DiamondIcon/>
           </Link>
           <ul className='nav-items'>
               {navItems.map((item,index)=>{
                   return(
                    <li key={index} className={item.cName}>
                         <Link  to={item.path}>{item.title}{""}{item.icon} </Link>
                   </li>
                   );
                  
               })}
           </ul>
           
           <button className="btn-store" onClick={this.logOut}>LogOut</button>
           </nav>
       </>
      )
  }
}

export default NavBarStore;