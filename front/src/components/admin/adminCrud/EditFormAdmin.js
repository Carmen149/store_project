import React from "react";
import { Form, Button } from "react-bootstrap"
import {useState} from 'react';
import axiosInstance from "../../../axios";

const EditFormAdmin = ({admin}) =>{
    const idadmin = admin.id;
    const [firstName, setFirstName] = useState(admin.firstName);
    const [lastName, setLastName] = useState(admin.lastName);
    const [userName, setUserName] = useState(admin.userName);
    const [password, setPassword] = useState(admin.password);
    const [email, setEmail] = useState(admin.email);
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
        if(value!=admin.userName){
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
            }
        )
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
            setButton(true)
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
                ...error, password:""
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
    const updatedadmin = {firstName,lastName,userName,password, email}
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(updatedadmin);
        let credentilas={
            id:idadmin,
            firstName:updatedadmin.firstName,
            lastName:updatedadmin.lastName,
            userName: updatedadmin.userName,
            password:updatedadmin.password,
            email:updatedadmin.email
        }
        console.log(credentilas);
        axiosInstance.put("api/admin", credentilas)
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
            <Button variant="success" type="submit" disabled={button} onChange={setButton} >
                Edit admin
            </Button>
        </Form>

     )
}

export default EditFormAdmin;