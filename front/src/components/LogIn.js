
import React from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axiosInstance from '../axios';
import history from '../history';
import '../images/background.jpg'
import '../components/LogIn.css'
import {HiUserCircle} from 'react-icons/hi'
import {ImUser} from 'react-icons/im'
const background= new URL('../images/background.jpg',import.meta.url)

class LogIn extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            role:"",
        };
       
    }
    
    handleInput = event => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });

    };
    handleChangeSelect=(e)=> {    this.setState(  { role: e.target.value});
                                    }
    onSubmitFun =(e) => {
        e.preventDefault();
        console.log(this.state.role)
        console.log(this.state.username);
        console.log(this.state.password);
        let credentilas={
            role: this.state.role,
            username:this.state.username,
            password: this.state.password 

        }
         if(credentilas.role==="Admin"){
            axiosInstance.put("api/admin/login", credentilas)
            .then(
               res => {
                    console.log("Success");
                    localStorage.setItem("USER_ID", res.data.id);
                    history.push("/administration");
                    window.location.reload();
                }
            )
            .catch(error => {
                console.log(error)
            })
         }
         if(credentilas.role==="Customer"){
            axiosInstance.put("api/customers/logIn", credentilas)
            .then(
               res => {
                    console.log("Success");
                    localStorage.setItem("USER_ID", res.data.id);
                    history.push("/ring");
                    window.location.reload();
                }
            )
            .catch(error => {
                console.log(error)
            })
         }

         
    }
   goToPage=()=>{
       history.push("/register");
       window.location.reload();
   }

    render() {
        return (
            <>
            
                <div className='main-container'>
                    <Row className="mt-5" >
                        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-sm" style={{backgroundColor:'white', borderRadius:'20px'}}>
                            <Form style={{backgroundColor:'white'}} onSubmit={this.onSubmitFun.bind(this)} >
                                <h1 className='text-center' style={{ fontSize:'7rem'}}>{<HiUserCircle/>}</h1>
                                <Form.Group controlId="username" onChange={this.handleInput}>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="username"  placeholder="Username" name="username" />
                                </Form.Group>
    
                                <Form.Group controlId="password" onChange={this.handleInput}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password"  name="password"/>
                                </Form.Group>
                                <br></br>
                                <Form.Control as="select" onChange={this.handleChangeSelect}>
                                        <option>Open this select menu</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Customer">Customer</option>
                                     
                                </Form.Control>
                                <br></br>
                                <div className="d-flex justify-content-center">
                                <p>
                                    
                                    <Button variant="outline-success btn-block" type="submit">
                                    Login
                                </Button>
                                     {' '}  
                                <Button  variant="outline-info" onClick={this.goToPage}>
                                    Register
                                </Button>
                                
                                
                                    </p>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                   
                </div>
            </>
        );
    }

}

export default LogIn;
