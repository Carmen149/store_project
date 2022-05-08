import React, {Component} from "react";
import {ProductConsumer} from '../Context';
import {Table, Button} from 'react-bootstrap'

class Home extends Component{
    render(){
        return(
            <div className="container">
              <h3>Crud Operations</h3>
              <ProductConsumer>
                  {(value)=>{
                      return (
                          <Table striped bordered hover variant="dark" >
                              <tbody>
                                  <tr>
                                      <th>Id</th>
                                      <th>First name</th>
                                      <th>Last name</th>
                                      <th>Username</th>
                                      <th>Password</th>
                                      <th>Email</th>
                                      <th>Country</th>
                                      <th>City</th>
                                      <th>Street</th>
                                      <th>Number</th>
                                      <th>Phone</th>
                                  </tr>
                                  {value.customers.map(customer =>{
                                       return(
                                           <tr className="customer" key={customer.id}>
                                             
                                               <td>{customer.id}</td>
                                               <td>{customer.firstName}</td>
                                               <td>{customer.lastName}</td>
                                               <td>{customer.userName}</td>
                                               <td>{customer.password}</td>
                                               <td>{customer.email}</td>
                                               <td>{customer.country}</td>
                                               <td>{customer.city}</td>
                                               <td>{customer.street}</td>
                                               <td>{customer.number}</td>
                                               <td>{customer.phone}</td>
                                           </tr>
                                       )
                                  })}
                              </tbody>
                          </Table>
                      )
                  }}
              </ProductConsumer>

            </div>
        )
    }
}export default Home;