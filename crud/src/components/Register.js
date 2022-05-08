
import React from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axiosInstance from '../axios';
import history from '../history';




class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName:"",
            lastName:"",
            userName: "",
            password: "",
            email:"",
            country:"",
            city:"",
            street:"",
            number:0,
            phone:"",
            errorHolder:null
            
        };
       
    }
    
    handleInput = event => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
        console.log(value);

    };
  
    onSubmitFun =(e) => {
        e.preventDefault();
        
      
        let credentilas={
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            userName: this.state.userName,
            password:this.state.password,
            email:this.state.email,
            country:this.state.country,
            city:this.state.city,
            street:this.state.street,
            number:parseInt(this.state.number , 10 ) ,
            phone:this.state.phone,

        }
        console.log(credentilas);
        

         
            axiosInstance.post("api/customers", credentilas)
            .then(
               res => {
                    // const val = res.data;
                    console.log("Success");
                    localStorage.setItem("USER_ID", res.data.id);
                    history.push("/log-in");
                    window.location.reload();
                }
            )
            .catch(error=>{
                console.log(error)
            })
         
         

         
    }
   goToLogIn=(e)=>{
    history.push("/log-in");
    window.location.reload();
   }

    render() {
        return (
            <>
                <Container>
                    <h1 className="shadow-sm text mt-5 p-3 text-center rounded">Register</h1>
                    <Row className="mt-5">
                        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                            <Form onSubmit={this.onSubmitFun.bind(this)} >
                                <Form.Group controlId="firstname" onChange={this.handleInput}>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="firstname"  placeholder="Firstname" name="firstName" />
                                </Form.Group>
                                <Form.Group controlId="lastname" onChange={this.handleInput}>
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control type="lastname"  placeholder="Lastname" name="lastName" />
                                </Form.Group>
                                <Form.Group controlId="username" onChange={this.handleInput}>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="username"  placeholder="Username" name="userName" />
                                </Form.Group>
                               
                                <Form.Group controlId="password" onChange={this.handleInput}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password"  name="password"/>
                                </Form.Group>
                                <Form.Group controlId="email" onChange={this.handleInput}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email"  placeholder="Email" name="email" />
                                </Form.Group>
                                <Form.Group controlId="country" onChange={this.handleInput}>
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control type="country"  placeholder="Country" name="country" />
                                </Form.Group>
                                <Form.Group controlId="city" onChange={this.handleInput}>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="city"  placeholder="City" name="city" />
                                </Form.Group>
                                <Form.Group controlId="street" onChange={this.handleInput}>
                                    <Form.Label>Street</Form.Label>
                                    <Form.Control type="street"  placeholder="Street" name="street" />
                                </Form.Group>
                                <Form.Group controlId="number" onChange={this.handleInput}>
                                    <Form.Label>Number</Form.Label>
                                    <Form.Control type="number"  placeholder="Number" name="number" />
                                </Form.Group>
                                <Form.Group controlId="phone" onChange={this.handleInput}>
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="phone"  placeholder="Phone" name="phone" />
                                </Form.Group>
    
                                
                                <br></br>
                                <div className="d-flex justify-content-center">
                                <p>
                                    <Button variant="success btn-block" type="submit">
                                        Register
                                    </Button>
                                        {'   '}
                                    <Button variant="dark" onClick={this.goToLogIn}>Back</Button>{' '}
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

export default Register;
