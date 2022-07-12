
import React from 'react';
import {Button, Col,Form, Row} from "react-bootstrap";
import axiosInstance from '../axios';
import history from '../history';
import '../components/LogIn.css'
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";


class Register extends React.Component {
    
    constructor() {
        
        super();
        this.state = {
            firstName:" ",
            lastName:" ",
            userName: " ",
            password: " ",
            email:" ",
            country:" ",
            city:" ",
            street:" ",
            number:0,
            phone:" ",
            errorHolder:null,
            error:{},
            button:false
            
        
        };
       
    }
    componentDidMount(){
        this.connect();
    }
    connect() {
        console.log("In Connect");
        const URL = "http://localhost:8080/socket";
        const websocket = new SockJS(URL);
        const stompClient = Stomp.over(websocket);
        stompClient.connect({}, frame => {
            console.log("Conectat la " + frame);
            stompClient.subscribe("/topic/socket/api/customers", notification => {
                let message = notification.body;
                console.log(message);
                alert(message);

            })
        })
    }
    
    handleInput = event => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
        console.log(value);

    }
    handleName=event=>{
        const regex=/^([A-Z][a-z]{2,}[ '-]?([a-z][ -])?)*$/
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
        
     
       if(value.length<3){
           this.setState({
               error:{...this.state.error,[name]:"Name is to short. Name should contain at least 3 characters"},
               button:true

           })
       }
       else if(value.match(regex)==null){
        this.setState({
            error:{...this.state.error,[name]:"Name should start with a capital letter"},
            button:true
        })
       }
        else{
            this.setState({
                error:{...this.state.error,[name]:""},
                button:false

            })
        }
    }
    
    handleUserName=event=>{
        this.setState({
            userName:event.target.value
        })
        const userName=event.target.value
        axiosInstance.get("api/customers/checkedUserName/"+userName)
        .then(
           res => {
                this.setState({
                    error:{...this.state.error,userName:res.data},
                    button:true
                })
            }
        )
        .catch(error=>{
            console.log(error)
            
        })
    }
    handlePassword=event=>{
        this.setState({
            password:event.target.value
        })
        
        const password=event.target.value
        console.log(password)
        if(password.length<8 || password.length>20){
            this.setState({
                error:{...this.state.error,password:"Passowrd should contains at least 8 characters and at most 20 characters."},
                button:true
            })
        }
        else if(password.match(/[0-9]+/)==null){
            this.setState({
                error:{...this.state.error,password:"Passowrd should contains at least 1 digit"},
                button:true
            })
        }
        else if(password.match(/[A-Z]+/)==null){
            this.setState({
                error:{...this.state.error,password:"Passowrd should contains at least upper case alphabet"},
                button:true
            })
        }
        else if(password.match(/[a-z]+/)==null){
            this.setState({
                error:{...this.state.error,password:"Passowrd should contains at least lower case alphabet"},
                button:true
            })
        }
        else if(password.match(/[!@#$%&*()-+=^]+/)==null){
            this.setState({
                error:{...this.state.error,password:"Passowrd should contains  least one special character which includes !@#$%&*()-+=^"},
                button:true
            })
        }
        else if(password.match(/[ \t\n]+/)!=null){
            console.log(password)
            this.setState({
                error:{...this.state.error,password:"Passowrd shouldn't contain any white space"},
                button:true
            })
        }

        else{
            this.setState({
                error:{...this.state.error, password:""},
                button:false
            })
        }
    }
    handleEmail=event=>{
        this.setState({
            email:event.target.value
        })
        const email=event.target.value
        const regex=/^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/
        if(email.match(regex)==null){
            this.setState({
                error:{...this.state.error,email:"Email invalid"},
                button:true
            })
        }
        else{
            this.setState({
                error:{...this.state.error, email:""},
                button:false
            })
        }
        
    }
    handlePhone=event=>{
        this.setState({
            phone:event.target.value
        })
        const phone=event.target.value
        const regex=/^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(s|\.|-)?([0-9]{3}(s|\.|-|)){2}$/
        if(phone.match(regex)==null){
            this.setState({
                error:{...this.state.error,phone:"Phone invalid. Phone should contains 10 digits"},
                button:true
            })
        }
        else{
            this.setState({
                error:{...this.state.error, phone:""},
                button:false
            })
        }
        
    }
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
            myFavoriteList:  []

        }
        console.log(credentilas);
        

         
            axiosInstance.post("api/customers", credentilas)
            .then(
               res => {
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
                <div className='main-container'>
                    <Row className="mt-5">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-sm" style={{backgroundColor:'white', borderRadius:'20px'}}>
                            <Form  style={{backgroundColor:'white'}} onSubmit={this.onSubmitFun.bind(this)} >
                            <h1 className='text-center' style={{ fontSize:'2rem'}}>Register</h1>
                                <Form.Group  onChange={this.handleName} >
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="name"  placeholder="Firstname" name="firstName" required/>
                                    {this.state.error.firstName && <p style={{color:'red'}}>{this.state.error.firstName}</p>}
                                </Form.Group>

                                <Form.Group  onChange={this.handleName}>
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control type="name"  placeholder="Lastname" name="lastName" required />
                                    {this.state.error.lastName && <p style={{color:'red'}}>{this.state.error.lastName}</p>}
                                </Form.Group>
                                <Form.Group  onChange={this.handleUserName}>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="username"  placeholder="Username" name="userName" required/>
                                    {this.state.error.userName && <p style={{color:'red'}}>{this.state.error.userName}</p>}
                                </Form.Group>
                               
                                <Form.Group  onChange={this.handlePassword}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password"  name="password" required/>
                                    {this.state.error.password && <p style={{color:'red'}}>{this.state.error.password}</p>}
                                </Form.Group>
                                <Form.Group controlId="email" onChange={this.handleEmail}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email"  placeholder="Email" name="email" required />
                                    {this.state.error.email && <p style={{color:'red'}}>{this.state.error.email}</p>}
                                </Form.Group>
                                <Form.Group onChange={this.handleName}>
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control type="country"  placeholder="Country" name="country" required/>
                                    {this.state.error.country && <p style={{color:'red'}}>{this.state.error.country}</p>}
                                    
                                </Form.Group>
                                <Form.Group  onChange={this.handleName}>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="city"  placeholder="City" name="city" required/>
                                    {this.state.error.city && <p style={{color:'red'}}>{this.state.error.city}</p>}
                                </Form.Group>
                                <Form.Group  onChange={this.handleName}>
                                    <Form.Label>Street</Form.Label>
                                    <Form.Control type="street"  placeholder="Street" name="street" required/>
                                    {this.state.error.street && <p style={{color:'red'}}>{this.state.error.street}</p>}
                                </Form.Group>
                                <Form.Group  onChange={this.handleInput}>
                                    <Form.Label>Number</Form.Label>
                                    <Form.Control type="number"  placeholder="Number" name="number" required/>
                                </Form.Group>
                                <Form.Group onChange={this.handlePhone}>
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="phone"  placeholder="Phone" name="phone" required/>
                                    {this.state.error.phone && <p style={{color:'red'}}>{this.state.error.phone}</p>}
                                </Form.Group>
    
                                
                                <br></br>
                                <div className="d-flex justify-content-center">
                                <p>
                                    <Button  variant="success btn-block" type="submit" disabled={this.state.button}>
                                        Register
                                    </Button>
                                        {'   '}
                                    <Button variant="dark" onClick={this.goToLogIn}>Back</Button>{' '}
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

export default Register;
