import React from "react";
import { Form, Button } from "react-bootstrap"
import {useState} from 'react';
import axiosInstance from "../../../axios";

const EditFormCustomer = ({customer}) =>{
    const idCustomer = customer.id;
    const [firstName, setFirstName] = useState(customer.firstName);
    const [lastName, setLastName] = useState(customer.lastName);
    const [userName, setUserName] = useState(customer.userName);
    const [password, setPassword] = useState(customer.password);
    const [email, setEmail] = useState(customer.email);
    const [country, setCountry] = useState(customer.country);
    const [city, setCity] = useState(customer.city);
    const [street, setStreet] = useState(customer.street);
    const [number, setNumber] = useState(customer.number);
    const [phone, setPhone] = useState(customer.phone);
  

    const updatedCustomer = {firstName,lastName,userName,password, email,country,city,street,number,phone}
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(updatedCustomer);
        let credentilas={
            id:idCustomer,
            firstName:updatedCustomer.firstName,
            lastName:updatedCustomer.lastName,
            userName: updatedCustomer.userName,
            password:updatedCustomer.password,
            email:updatedCustomer.email,
            country:updatedCustomer.country,
            city:updatedCustomer.city,
            street:updatedCustomer.street,
            number:updatedCustomer.number,
            phone:updatedCustomer.phone,


        }
        console.log(credentilas);
        axiosInstance.put("api/customers", credentilas)
        .then(
           res => {
                // const val = res.data;
                console.log("Success");
                //localStorage.setItem("USER_ID", res.data.id);
               // history.push("/log-in");
               // window.location.reload();
            }
        )
        .catch(error=>{
            console.log(error)
        })
        // console.log("aici");
        // console.log(id);
        // console.log(updatedCustomer);

       
    }

     return (

        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="First Name *"
                    name="firstName"
                    value={firstName}
                    onChange={(e)=> { setFirstName(e.target.value)}}
                   
                />
            </Form.Group>
            <br></br>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Last Name *"
                    name="lastName"
                    value={lastName}
                    onChange={(e)=> { setLastName(e.target.value)}}
                    
                />
            </Form.Group>
            <br></br>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Username *"
                    name="userName"
                    value={userName}
                    onChange={(e)=> { setUserName(e.target.value)}}
                 
                />
                
            </Form.Group>
            <br></br>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Password *"
                    name="password"
                    value={password}
                    onChange={(e)=> { setPassword(e.target.value)}}
                   
                  
                />
            </Form.Group>
            <br></br>
            <Form.Group>
                <Form.Control
                    type="email"
                    placeholder="Email *"
                    name="email"
                    value={email}
                    onChange={(e)=> { setEmail(e.target.value)}}
                    
                  
                />
            </Form.Group>
            <br></br>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Country *"
                    name="country"
                    value={country}
                    onChange={(e)=> { setCountry(e.target.value)}}
                />
            </Form.Group>
            <br></br>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="City *"
                    name="city"
                    value={city}
                    onChange={(e)=> { setCity(e.target.value)}}
                />
            </Form.Group>
            <br></br>
            <Form.Group>
                <Form.Control
                    as="textarea"
                    placeholder="Street *"
                    rows={3}
                    name="street"
                    value={street}
                    onChange={(e)=> {setStreet(e.target.value)}}
                    
                  
                />
            </Form.Group>
            <br></br>
            <Form.Group>
                <Form.Control
                    type="number"
                    placeholder="Number *"
                    name="number"
                    value={number}
                    onChange={(e)=> { setNumber(parseInt(e.target.value),10)}}
                  
                  
                />
            </Form.Group>
            <br></br>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Phone *"
                    name="phone"
                    value={phone}
                    onChange={(e)=> {setPhone(e.target.value)}}
                   
                  
                />
            </Form.Group>
            <br></br>
            
          
            <Button variant="success" type="submit" >
                Edit Customer
            </Button>
        </Form>

     )
}

export default EditFormCustomer;