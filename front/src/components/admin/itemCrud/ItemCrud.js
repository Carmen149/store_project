import React,{Component} from "react";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal } from 'react-bootstrap';
import GetNewItem from "./GetItem";
import EditFormItem from "./EditFormItem";
import axiosInstance from "../../../axios";
class ItemCrud extends Component{
    constructor() {
        super();
        this.state = {
            items: [],
            show:false,
            showGet:false,
            showDesc:false,
            item:{
                idItem:"",
                name:"",
                price:0,
                description:"",
                material:"",
                availability:2,
                size:"",
                type:"RING"
            },
            errorHolder:null

        }
    };

    handleShow=(idItem)=>{
        axiosInstance.get("api/items/"+idItem)
        .then(res => {
            let val = res.data;
                this.setState({
                    item:val,
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
    handleShowDesc=(description)=>{
        this.setState({
            description:description,
            showDesc:true
        })
    }
    handleCloseDesc=(e)=>{this.setState({showDesc:false});}
    handleCloseGet = (e) =>{this.setState({showGet:false});  }
    handleClose = (e) =>{this.setState({show:false});  this.componentDidMount();}
    componentDidMount() {
        axiosInstance.get("api/items",)
        .then(res => {
            const val = res.data;
            this.setState({
                items: val
            });
            console.log(this.state.items);
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
    handleChange=(e)=>{
        this.setState({
            item:{
                ...this.state.item,
                [e.target.id]:e.target.value
            }    
        })
        console.log(e.target.value);
        console.log(e.target.id);  
    }
    getItem=(idItem)=>{
        console.log(idItem);
        axiosInstance.get("api/items/"+idItem).
        then(res => {
            let val = res.data;
            console.log(val);
            this.setState({
            item:val,
            showGet:true
            })
        })
        .catch(error => {
            console.log(error);
        });
    
    }
    delete=(idItem)=>{
        axiosInstance.delete("api/items/"+idItem
        ).then(res => {
            let val = res.data;
            console.log(val); 
        })
        .catch(error => {
            console.log(error);
        });

        const newItems=this.state.items.filter(item=>item.idItem!==idItem);
        this.setState(
            {items:newItems}
        )
    }
    handleSumbit=(e)=>{
        e.preventDefault();
        let credentilas={
            "name": this.state.item.name,
            "price": parseInt(this.state.item.price , 10 ),
            "description": this.state.item.description,
            "material": this.state.item.material,
            "availability": parseInt(this.state.item.availability),
            "size": this.state.item.size,
            "type": this.state.item.type 
        }
        console.log(credentilas);
        axiosInstance.post("api/items", credentilas)
        .then(data => {this.setState( {items:[data.data, ...this.state.items]} );
            console.log(data);
            console.log(data.data);})
        .catch(err => this.setState( {errorHolder:err.response.data} ))
    }
    render(){
        return(
       <>
        <div className="app-container"  >
                <h1  className="text-center">Crud Operations item</h1> 
                <br></br>
                <p style={{color:"red"}}>{this.state.errorHolder} </p>
                <div style={{marginRight:"20px", marginLeft:"20px",  overflowY:'scroll'}}>
                <Table striped bordered size="sm" hover variant="dark"  >
                    <thead>
                        <tr>
                            <th className="text-center">Id</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Description</th>
                            <th className="text-center">Material</th>
                            <th className="text-center">Availability</th>
                            <th className="text-center">Size</th>
                            <th className="text-center">Type</th>
                            <th className="text-center" style={{width: "70px"}}>Actions</th>
                        </tr>
                    
                        <tr className="text-center">
                            <td><input type="text" id="idItem"  size='sm' style={{width: "30px"}} onChange ={this.handleChange} /> </td>
                            <td><input type="text" id="name" size='sm' style={{width: "235px"}}  onChange ={this.handleChange} /> </td>
                            <td><input type="number" id="price" step='0.01' size='sm'  style={{width: "130px"}}  onChange ={this.handleChange} /> </td>
                            <td><input type="text-area" row={6} id="description" size='sm'  style={{width: "170px"}}  onChange ={this.handleChange} /> </td>
                            <td><input type="text" id="material" size='sm'  style={{width: "160px"}}  onChange ={this.handleChange} /> </td>
                            <td><input type="number" id="availability" size='sm'     style={{width: "100px"}}  onChange ={this.handleChange} /> </td>
                            <td><input type="number" id="size" size='sm'   style={{width: "130px"}}  onChange ={this.handleChange} /> </td>
                            <td><input type="text" id="type" size='sm'      style={{width: "130px"}}  onChange ={this.handleChange} /> </td>
                            <td> <Button size='sm' variant="success" style={{width: "165px"}} onClick={this.handleSumbit}>Add</Button> </td>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.items.map((item,i)=>(
                            <tr className='item'  key={i}>
                                <td>{item.idItem}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td className="text-center"><Button variant="dark" data-toggle="modal"  onClick={()=>{this.handleShowDesc(item.description)}}>Show Description</Button></td>
                                <td>{item.material}</td>
                                <td>{item.availability ? "valabil" : "epuizat"}</td>
                                <td>{item.size===null ? "-" : item.size}</td>
                                <td>{item.type}</td>
                                <td>
                                <Button size='sm' variant='primary' onClick={()=>{this.handleShow(item.idItem)}} data-toggle="modal">Edit</Button>{' | '}
                                <Button size='sm' variant='danger' onClick={()=>{this.delete(item.idItem)}} >Delete </Button>{' | '}
                                <Button size="sm" variant="warning" onClick={()=>{this.getItem(item.idItem)}} data-toggle="modal">Get</Button>
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
                        Edit item 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditFormItem item={this.state.item} />
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close Button
                        </Button>
                </Modal.Footer>
            </Modal>
        
            <Modal show={this.state.showGet} onHide={this.handleCloseGet}>
                <Modal.Header closeButton>
                    <Modal.Title>Get item by Id</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <GetNewItem newItem={this.state.item}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseGet}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={this.state.showDesc} onHide={this.handleCloseDesc}>
                <Modal.Header closeButton>
                    <Modal.Title>View Description</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>{this.state.description} </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseDesc}>Close</Button>
                </Modal.Footer>
            </Modal>
       </>
    )}
}

export default ItemCrud;