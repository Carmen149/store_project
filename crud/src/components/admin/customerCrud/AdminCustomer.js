import React, { Component } from 'react';
import CustomerCrud from './CustomerCrud'
import Sidebar from '../../Sidebar'
import ReorderIcon from '@mui/icons-material/Reorder';
import { Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import './AdminCrustomer.css'



class AdminCustomer extends Component{
  constructor() {
    super();
    this.state = { showMenu: false };
    this.toggleMenu = this.toggleMenu.bind(this);

  }
  toggleMenu = function() {
    this.setState({ showMenu: !this.state.showMenu });
  }
render(){
    return (
      <div className='AdminCrustomer'>
        <Navbar bg="" variant="dark"  >
            {this.state.showMenu ? <div className='side'><Button  variant="secondary" active onClick={this.toggleMenu}><ReorderIcon/></Button></div> : <Button variant="light" onClick={this.toggleMenu}><ReorderIcon/></Button>}
        </Navbar>
            <div>
               {this.state.showMenu ?
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)",}}>
                  <Sidebar/> 
                  <CustomerCrud/>
                </div> :
                  <CustomerCrud/>

                }
            </div>
            
      </div>
    )
  }
 
}

export default AdminCustomer