
import React from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axiosInstance from '../axios';
import history from '../history';




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
    //    console.log(value);

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
            axiosInstance.post("api/admin/login", credentilas)
            .then(
               res => {
                    // const val = res.data;
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
            axiosInstance.post("api/customers/login", credentilas)
            .then(
               res => {
                    // const val = res.data;
                    console.log("Success");
                    localStorage.setItem("USER_ID", res.data.id);
                    history.push("/customer");
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
                <Container>
                    <h1 className="shadow-sm text mt-5 p-3 text-center rounded">Login</h1>
                    <Row className="mt-5">
                        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                            <Form onSubmit={this.onSubmitFun.bind(this)} >
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
                   
                </Container>
            </>
        );
    }

}

export default LogIn;
