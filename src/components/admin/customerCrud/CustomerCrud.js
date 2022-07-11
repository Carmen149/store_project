import React, {Component} from 'react'
import axiosInstance from "../../../axios";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal } from 'react-bootstrap';
import EditFormCustomer from './EditFormCustomer'
import GetCustomer from './GetCustomer';
import './AlertFrame.css'





class CustomerCrud extends Component{
    constructor() {
        super();
        this.state = {
            customers: [],
            show:false,
            showGet:false,
            customer:{
                id:"",
                firstName:"",
                lastName:"",
                userName:"",
                password:"",
                email:"",
                country:"",
                city:"",
                street:"",
                number:"",
                phone:""
            },
            errorHolder:null,
            showEr:false

        }
    };
    handleShow=(id)=>{
        axiosInstance
            .get(
                "api/customers/"+id
            ).then(res => {
                let val = res.data;
                this.setState({
                    customer:val,
                    show:true
                })
            })
            .catch(error => {
                console.log(error);
            });
                       
                      
    } 
    handleShowGet=()=>{
        this.setState({
            
            showGet:true
        })
                       
                      
    } 
    handleCloseGet = (e) =>{this.setState({showGet:false});  }
    handleClose = (e) =>{this.setState({show:false});  this.componentDidMount();}
    componentDidMount() {
        axiosInstance.get("api/customers",)
            .then(res => {
                const val = res.data;
                this.setState({
                    customers: val
                });
               
                console.log(this.state.customers);
            })
            .catch(error => {
                console.log(error);
            });
    }
    inputChange=(e)=>{
        this.setState({
            id:e.id,
        })
    }
    handleChange=(e) =>{
        this.setState({
            [e.target.id]:e.target.value 
        })
        console.log(e.target.id);
    }
    getCustomer=(id)=>{
        console.log(id);
        axiosInstance.get("api/customers/"+id).
        then(res => {
            let val = res.data;
            console.log(val);
            this.setState({
            customer:val,
            showGet:true})
        })
        .catch(error => {
            console.log(error);
        });
     
    }
    delete=(id)=>{
        axiosInstance.delete("api/customers/"+id).
        then(res => {
            let val = res.data;
            console.log(val);
        })
        .catch(error => {
            console.log(error);
        });

        const newCustomers=this.state.customers.filter(customer=>customer.id!==id);
        this.setState(
            {customers:newCustomers}
        )
    }
    handleSumbit=(e)=>{
        e.preventDefault();
        console.log(this.state.firstName, this.state.lastName, this.state.userName, this.state.password, this.state.email,
                   this.state.country,this.state.city, this.state.number, this.state.street, this.state.phone);

        axiosInstance.post("api/customers",{
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "userName": this.state.userName,
            "password": this.state.password,
            "email": this.state.email,
            "country": this.state.country,
            "city": this.state.city,
            "street": this.state.street,
            "number": parseInt(this.state.number , 10 ),
            "phone": this.state.phone,
            "myFavoriteList":  []
        })
        .then(data => {this.setState( {customers:[data.data, ...this.state.customers]} );
            console.log(data);
            console.log(data.data);})
        .catch(err => this.setState( {errorHolder:err.response.data, showEr:true,}
        ))
    }
    
    render(){
        return(
        <>
            
            {this.state.errorHolder &&  <div className='alert'>
            <span className='close-button' onClick={()=>{this.setState({
                errorHolder:""
            })}}>X</span>
            <p className='errorHandler' >{this.state.errorHolder} </p>
            {console.log(this.state.errorHolder)}
            </div>}
            
            <div className="Crud" >    
                    <h1  className="text-center">Crud Operations Customer</h1> 
                    <br></br>
                    <br></br>
                    
                    <div style={{marginRight:"20px", marginLeft:"20px", overflow:'scroll'}}>
                        <Table striped bordered size="sm" hover variant="dark"  >
                            <thead>
                                <tr>
                                    <th className="text-center">Id</th>
                                    <th className="text-center">First name</th>
                                    <th className="text-center">Last name</th>
                                    <th className="text-center">Username</th>
                                    <th className="text-center">Password</th>
                                    <th className="text-center" style={{width: "130px"}} >Email</th>
                                    <th className="text-center">Country</th>
                                    <th className="text-center">City</th>
                                    <th className="text-center">Street </th>
                                    <th className="text-center">Number</th>
                                    <th className="text-center">Phone</th>
                                    <th className="text-center" style={{width: "70px"}}>Actions</th>
                                </tr>
                            
                                <tr className="text-center">
                                    <td><input type="text" id="id"  size='sm' style={{width: "30px"}} onChange ={this.handleChange} /> </td>
                                    <td><input type="text" id="firstName" size='sm' style={{width: "130px"}}  onChange ={this.handleChange} /> </td>
                                    <td><input type="text" id="lastName" size='sm'  style={{width: "130px"}}  onChange ={this.handleChange} /> </td>
                                    <td><input type="text" id="userName" size='sm'  style={{width: "130px"}}  onChange ={this.handleChange} /> </td>
                                    <td><input type="text" id="password" size='sm'  style={{width: "130px"}}  onChange ={this.handleChange} /> </td>
                                    <td><input type="text" id="email" size='sm'     style={{width: "200px"}}  onChange ={this.handleChange} /> </td>
                                    <td><input type="text" id="country" size='sm'   style={{width: "130px"}}  onChange ={this.handleChange} /> </td>
                                    <td><input type="text" id="city" size='sm'      style={{width: "130px"}}  onChange ={this.handleChange} /> </td>
                                    <td><input type="text" id="street" size='sm'    style={{width: "200px"}}  onChange ={this.handleChange} /> </td>
                                    <td><input type="number" id="number" size='sm'    style={{width: "50px"}}  onChange ={this.handleChange} /> </td>
                                    <td><input type="text" id="phone" size='sm'     style={{width: "130px"}}  onChange ={this.handleChange} /> </td>
                                    <td> <Button size='sm' variant="success" style={{width: "165px"}} onClick={this.handleSumbit}>Add </Button> </td>
                                </tr>
                            
                            </thead>

                            <tbody>
                                {this.state.customers.map((customer,i)=>(
                                <tr className='customer'  key={i}>
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
                                    <td className="text-center"  >
                                
                                    <Button size='sm' variant='primary' onClick={()=>{this.handleShow(customer.id)}} data-toggle="modal">Edit</Button>{' | '}
                                    <Button size='sm' variant='danger' onClick={()=>{this.delete(customer.id)}} >Delete </Button>{' | '}
                                    <Button size="sm" variant="warning" onClick={()=>{this.getCustomer(customer.id)}} data-toggle="modal">Get</Button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>

            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit Customer 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditFormCustomer customer={this.state.customer} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close Button
                    </Button>
                </Modal.Footer>
            </Modal>
        
            <Modal show={this.state.showGet} onHide={this.handleCloseGet}>
                <Modal.Header closeButton>
                    <Modal.Title>Get customer by Id</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <GetCustomer newCustomer={this.state.customer}>  </GetCustomer>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseGet}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
       )
    }
}

export default CustomerCrud;