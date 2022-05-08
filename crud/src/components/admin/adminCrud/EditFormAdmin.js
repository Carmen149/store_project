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
        // console.log(updatedadmin);

       
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
            <Button variant="success" type="submit" >
                Edit admin
            </Button>
        </Form>

     )
}

export default EditFormAdmin;