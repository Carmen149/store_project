
import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Routes as Switch,
    Navigate as Redirect
} from "react-router-dom";
import LogIn from './components/LogIn';
import Customer from './components/Customer';
import Register from './components/Register';
import AdminAdmin from './components/admin/adminCrud/AdminAdmin';
import Admin from './components/Admin';
import AdminCustomer from './components/admin/customerCrud/AdminCustomer';
import ItemCrud from './components/admin/itemCrud/ItemCrud';
import NavBarStore from './components/NavBarStore';
import Ring from './components/item/Ring';
import Bracelet from './components/item/Bracelet';
import Earrings from './components/item/Earrings';
import Necklace from './components/item/Necklace';
import Charm from './components/item/Charm';
import Cart from './components/Cart';
import AdminItem from './components/admin/itemCrud/AdminItem';
function App () {
  const defaultRoute = window.location.pathname === "/" ? <Redirect to="/log-in"/> : undefined;

  return(
    <Router>
    <Switch>
        <Route exact path="/log-in" element={<LogIn/>}/>
        <Route exact path="/administration" element={<Admin/>}/>
        <Route exact path="/customer" element={<Customer/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/admin" element={<AdminAdmin/>}/>
        <Route exact path="/admin-customer" element={<AdminCustomer/>}/>
        <Route exact path="/item" element={<AdminItem/>}/>
        {/* <Route exact path="/navbar" element={<NavBarStore/>}/> */}
        <Route exact path="/charm" element={<Charm/>}/>
        <Route exact path="/necklace" element={<Necklace/>}/>
        <Route exact path="/bracelet" element={<Bracelet/>}/>
        <Route exact path="/earrings" element={<Earrings/>}/>
        <Route exact path="/ring" element={<Ring/>}/>
        <Route exact path="/cart" element={<Cart/>}/>

       

    </Switch>
    {defaultRoute}
     </Router>
  )
 
 
}

export default App;
