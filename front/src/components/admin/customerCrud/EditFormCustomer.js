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
    const [error, setError] =useState({});
    const [button, setButton]=useState(false);
    const setNameFirst=(event)=>{
        const value=event.target.value
        console.log(value)
        setFirstName(value);
        const regex=/^([A-Z][a-z]{2,}[ '-]?([a-z][ -])?)*$/
        
        if(value.length<3){
            setError({
                ...error,firstName:"Name is to short. Name should contain at least 3 characters"
            })
            setButton(true)
        }
        else if(value.match(regex)==null){
            setError({
            ...error,firstName:"Name should start with a capital letter"
            })
            setButton(true)
        }
        else{
            setError({
                ...error,firstName:""

            })
            setButton(false)
        }
   }
   const setNameLast=(event)=>{
        const value=event.target.value
        console.log(value)
        setLastName(value);
        const regex=/^([A-Z][a-z]{2,}[ '-]?([a-z][ -])?)*$/
        
        if(value.length<3){
            setError({
                ...error,lastName:"Name is to short. Name should contain at least 3 characters"
            })
            setButton(true)
        }
        else if(value.match(regex)==null){
            setError({
            ...error,lastName:"Name should start with a capital letter"
            })
            setButton(true)
        }
        else{
            setError({
                ...error,lastName:""

            })
            setButton(false)
        }
    }
    const setUsername=(event)=>{
        const value=event.target.value
        const regex=/^[a-zA-Z0-9\\._\\-]{3,}$/
        setUserName(value)
        if(value!=customer.userName){
            axiosInstance.get("api/customers/checkedUserName/"+value)
            .then(
            res => {
                setError({
                    ...error,userName:res.data
                })
                if(res.data!=""){
                    setButton(true)
                }
                else{
                    if(value.match(regex)==null){
                        setError({
                            ...error,userName:"Username should contain at least 3 character"
                        })
                        setButton(true)
                    }else{
                        setError({
                            ...error,userName:""
            
                        })
                        setButton(false)
                    }
                }
            } )
            .catch(error=>{
                console.log(error) 
            })
        }
    }
    const setFieldPassword=(event)=>{
        const password=event.target.value
        setPassword(password)
        if(password.length<8 || password.length>20){
            setError({
                ...error,password:"Passoword should contains at least 8 characters and at most 20 characters."
            })
            setButton(true)
        }
        else if(password.match(/[0-9]+/)==null){
            setError({
                ...error,password:"Passoword should contains at least 1 digit"
            })
            setButton(true)
        }
        else if(password.match(/[A-Z]+/)==null){
            setError({
                ...error,password:"Passoword should contains at least upper case alphabet"
            })
            setButton(true)
        }
        else if(password.match(/[a-z]+/)==null){
            setError({
                ...error,password:"Passoword should contains at least lower case alphabet"
            })
        }
        else if(password.match(/[!@#$%&*()-+=^]+/)==null){
            setError({
                ...error,password:"Passoword should contains  least one special character which includes !@#$%&*()-+=^"
            })
            setButton(true)
        }
        else if(password.match(/[ \t\n]+/)!=null){
            console.log(password)
            setError({
                ...error,password:"Passoword shouldn't contain any white space"
            })
            setButton(true)
        }

        else{
            setError({
                ...this.state.error, password:""
            })
            setButton(false)
        }

    }
    const setFieldEmail=(event)=>{
        const email=event.target.value
        setEmail(email)
        const regex=/^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/
        if(email.match(regex)==null){
            setError({
                ...error,email:"Email invalid"
            })
            setButton(true)
        }
        else{
            setError({
                ...error, email:""
            })
            setButton(false)
        }
        
    }
    const setFieldCountry=(event)=>{
        const value=event.target.value
        console.log(value)
        setCountry(value);
        const regex=/^([A-Z][a-z]{2,}[ '-]?([a-z][ -])?)*$/
        
        if(value.length<3){
            setError({
                ...error,country:"Name is to short. Name should contain at least 3 characters"
            })
            setButton(true)
        }
        else if(value.match(regex)==null){
            setError({
            ...error,country:"Name should start with a capital letter"
            })
            setButton(true)
        }
        else{
            setError({
                ...error,country:""

            })
            setButton(false)
        }
   }
   const setFieldCity=(event)=>{
        const value=event.target.value
        console.log(value)
        setCity(value);
        const regex=/^([A-Z][a-z]{2,}[ '-]?([a-z][ -])?)*$/
        
        if(value.length<3){
            setError({
                ...error,city:"Name is to short. Name should contain at least 3 characters"
            })
            setButton(true)
        }
        else if(value.match(regex)==null){
            setError({
            ...error,city:"Name should start with a capital letter"
           })
           setButton(true)
        }
        else{
            setError({
                ...error,city:""

            })
            setButton(false)
        }
   }
   const setFieldStreet=(event)=>{
        const value=event.target.value
        console.log(value)
        setStreet(value);
        const regex=/^([A-Z][a-z]{2,}[ '-]?([a-z][ -])?)*$/
        
        if(value.length<3){
            setError({
                ...error,street:"Name is to short. Name should contain at least 3 characters"
            })
            setButton(true)
        }
        else if(value.match(regex)==null){
            setError({
            ...error,street:"Name should start with a capital letter"
            })
            setButton(true)
        }
        else{
            setError({
                ...error,street:""

            })
            setButton(false)
        }
   }
   const setFieldPhone=(event)=>{
        const phone=event.target.value
        const regex=/^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(s|\.|-)?([0-9]{3}(s|\.|-|)){2}$/
        setPhone(phone)
        if(phone.match(regex)==null){
            setError({
                ...error,phone:"Phone invalid. Phone should contains 10 digits"
            })
            setButton(true)
        }
        else{
            setError({
                ...error, phone:""
            })
            setButton(false)
        }
   }
    
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
            console.log("Success");
            }
        )
        .catch(error=>{
            console.log(error)
        })
    }

     return (

        <Form onSubmit={handleSubmit}>
            <Form.Group  onChange={setNameFirst}>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="name" placeholder="First Name *" name="firstName" defaultValue={firstName} required/>
                {error.firstName && <p style={{color:'red'}}> {error.firstName}</p>}
            </Form.Group>
            <br></br>
            <Form.Group onChange={setNameLast}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last Name *" name="lastName" defaultValue={lastName} required/>
                {error.lastName && <p style={{color:'red'}}> {error.lastName}</p>}
            </Form.Group>
            <br></br>
            <Form.Group onChange={setUsername}>
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" placeholder="Username *" name="userName" defaultValue={userName} required/>
                {error.userName && <p style={{color:'red'}}> {error.userName}</p>}
            </Form.Group>
            <br></br>
            <Form.Group onChange={setFieldPassword}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password *" name="password" defaultValue={password} required/>
                {error.password && <p style={{color:'red'}}> {error.password}</p>}
            </Form.Group>
            <br></br>
            <Form.Group onChange={setFieldEmail}>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email *" name="email" defaultValue={email} required/>
                {error.email && <p style={{color:'red'}}> {error.email}</p>}
            </Form.Group>
            <br></br>
            <Form.Group onChange={setFieldCountry}>
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" placeholder="Country *" name="country" defaultValue={country} required/>
                {error.country && <p style={{color:'red'}}> {error.country}</p>}
            </Form.Group>
            <br></br>
            <Form.Group onChange={setFieldCity}>
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="City *" name="city" defaultValue={city} required/>
                {error.city && <p style={{color:'red'}}> {error.city}</p>}
            </Form.Group>
            <br></br>
            <Form.Group onChange={setFieldStreet}>
                <Form.Label>Street</Form.Label>
                <Form.Control as="textarea" placeholder="Street *" rows={3} name="street" defaultValue={street} required/>
                {error.street && <p style={{color:'red'}}> {error.street}</p>}
            </Form.Group>
            <br></br>
            <Form.Group onChange={(e)=>{setNumber(e.target.value)}}>
                <Form.Label>Number</Form.Label>
                <Form.Control type="number" placeholder="Number *" name="number" defaultValue={number} required/>
            </Form.Group>
            <br></br>
            <Form.Group onChange={setFieldPhone}>
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" placeholder="Phone *" name="phone" defaultValue={phone}  required/>
                {error.phone && <p style={{color:'red'}}> {error.phone}</p>}
            </Form.Group>
            <br></br>
            <Button variant="success" type="submit" disabled={button} onChange={setButton} >
                Edit Customer
            </Button>
        </Form>
    )
}

export default EditFormCustomer;