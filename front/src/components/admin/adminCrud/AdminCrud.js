import React, {Component} from 'react'
import axiosInstance from "../../../axios";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal } from 'react-bootstrap';
import EditFormAdmin from './EditFormAdmin'
import GetAdmin from './GetAdmin';
class AdminCrud extends Component{
    constructor() {
        super();
        this.state = {
            admins: [],
            show:false,
            showGet:false,
            admin:{
            id:"",
            firstName:"",
            lastName:"",
            userName:"",
            password:"",
            email:""
            },
            errorHolder:null

        }
    };
    handleShow=(id)=>{
        axiosInstance
            .get(
                "api/admin/"+id
            ).then(res => {
                let val = res.data;
                this.setState({
                    admin:val,
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
        axiosInstance.get("api/admin",)
        .then(res => {
            const val = res.data;
            this.setState({
                admins: val
            });
            //console.log(val);
            console.log(this.state.admins);
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
    getAdmin=(id)=>{
        console.log(id);
        axiosInstance.get("api/admin/"+id).
        then(res => {
            let val = res.data;
            console.log(val);
            this.setState({
            admin:val,
            showGet:true
            })
        })
        .catch(error => {
            console.log(error);
        });
    }
    delete=(id)=>{
        axiosInstance.delete("api/admin/"+id)
        .then(res => {
            let val = res.data;
            console.log(val); 
        })
        .catch(error => {
            console.log(error);
        });

        const newAdmins=this.state.admins.filter(admin=>admin.id!==id);
        this.setState(
            {admins:newAdmins}
        )

    }
    handleSumbit=(e)=>{
        e.preventDefault();
        console.log(this.state.firstName, this.state.lastName, this.state.userName, this.state.password, this.state.email);
        axiosInstance.post("api/admin",{
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "userName": this.state.userName,
            "password": this.state.password,
            "email": this.state.email
        })
        .then(data => {this.setState( {admins:[data.data, ...this.state.admins]} );
            console.log(data);
            console.log(data.data);})
        .catch(err => this.setState( {errorHolder:err.response.data} ))
    }
  
    render(){
        return(
       <>
         <div className="app-container" >
            <h1  className="text-center">Crud Operations admin</h1> 
            <br></br>
            <p style={{color:"red"}} id="errorHolder" >{this.state.errorHolder} </p>
            <div style={{marginRight:"20px", marginLeft:"20px"}}>
            <Table striped bordered size="lg" hover  variant="dark"  >
                <thead>
                    <tr>
                    <th className="text-center">Id</th>
                    <th className="text-center">First name</th>
                    <th className="text-center">Last name</th>
                    <th className="text-center">Username</th>
                    <th className="text-center">Password</th>
                    <th className="text-center" >Email</th>
                    <th className="text-center" style={{width: "70px"}}>Actions</th>
                    </tr>
                
                    <tr className="text-center">
                        <td><input type="text" id="id"  size='sm' style={{width: "30px"}} onChange ={this.handleChange} /> </td>
                        <td><input type="text" id="firstName" size='sm' style={{width: "130px"}}  onChange ={this.handleChange} /> </td>
                        <td><input type="text" id="lastName" size='sm'  style={{width: "130px"}}  onChange ={this.handleChange} /> </td>
                        <td><input type="text" id="userName" size='sm'  style={{width: "130px"}}  onChange ={this.handleChange} /> </td>
                        <td><input type="text" id="password" size='sm'  style={{width: "130px"}}  onChange ={this.handleChange} /> </td>
                        <td><input type="text" id="email" size='sm'     style={{width: "200px"}}  onChange ={this.handleChange} /> </td>
                   
                        <td> <Button size='sm' variant="success" style={{width: "165px"}} onClick={this.handleSumbit}>Add </Button> </td>
                    </tr>
                </thead>

                <tbody>
                {this.state.admins.map((admin,i)=>(
                    <tr className='admin'  key={i}>
                        <td>{admin.id}</td>
                        <td>{admin.firstName}</td>
                        <td>{admin.lastName}</td>
                        <td>{admin.userName}</td>
                        <td>{admin.password}</td>
                        <td>{admin.email}</td>
                        <td >
                        <Button size='sm' variant='primary' onClick={()=>{this.handleShow(admin.id)}} data-toggle="modal">Edit</Button>{' | '}
                        <Button size='sm' variant='danger' onClick={()=>{this.delete(admin.id)}} >Delete </Button>{' | '}
                        <Button size="sm" variant="warning" onClick={()=>{this.getAdmin(admin.id)}} data-toggle="modal">Get</Button>
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
                    Edit admin 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditFormAdmin admin={this.state.admin}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                    Close Button
                </Button>
            </Modal.Footer>
        </Modal>
    
        <Modal show={this.state.showGet} onHide={this.handleCloseGet}>
            <Modal.Header closeButton>
                <Modal.Title>Get admin by Id</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <GetAdmin newAdmin={this.state.admin}> </GetAdmin>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleCloseGet}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>
    )}
}

export default AdminCrud;