import React from 'react'
import { Container } from 'react-bootstrap'
import { Table,Button } from 'react-bootstrap'
import axiosInstance from '../../axios'
import { Modal } from 'react-bootstrap'
import {Alert} from 'react-bootstrap'

class ActivityComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      activity:[],
      nameClient:[],
      idClient: 0,
      customer:"",
      activityClientList:[],
      show:false
    }
  };
  componentDidMount() {
    axiosInstance.get("api/activity",)
    .then(res => {
      const val = res.data;
      this.setState({
       activity:val
      })
    })
    .catch(error => {
      console.log(error);
    }); 
  }
  handleChange=(e) =>{
    this.setState({
      idClient:e.target.value
    })
  }
  handleSumbit=()=>{
    axiosInstance.get("api/customers/"+this.state.idClient)
    .then(res => {
      const val = res.data;
      console.log(val);
      this.setState({
        customer:val,
        show:true
      })
    })
    .catch(error => {
      alert("Nu exista")
    }); 
    axiosInstance.get("api/activity/"+this.state.idClient)
    .then(res => {
      const val = res.data;
      console.log(val)
      this.setState({
        activityClientList:val
      })  
    })
    .catch(error => {
      console.log(error);
    }); 

  }
  handleClose = (e) =>{this.setState({show:false});  }
  render(){
    return (
      <div>
        <Container>
          <h1 className='text-center'>Activitate</h1>
          <br></br>
          <div style={{marginRight:"20px", marginLeft:"20px"}}>
            <div className='text-center'>
            <input type="text" style={{width: "700px"}} placeholder='Search Client activity*' onChange ={this.handleChange} ></input>
              <Button size='sm' variant="info" style={{width: "100px", marginLeft:"20px"}} onClick={this.handleSumbit}>Search</Button> 
            </div>
            
            <br></br><br></br>
            <Table striped bordered size="lg" hover variant="dark"   >
              <thead>
                <tr>
                  <th className="text-center">Id</th>
                  <th className="text-center">Id Client</th>
                  <th className="text-center">User Client</th>
                  <th className="text-center">Data</th>
                  <th className="text-center">Time log in</th>
                  <th className="text-center">Time log out</th>
                </tr>  
              </thead>

              <tbody>
                {this.state.activity.map((a,i)=>(
                  <tr className='admin'  key={i}>
                    <td>{a.id}</td>
                    <td>{a.idClient}</td>
                    <td>{a.userName}</td>
                    <td>{a.date}</td>
                    <td>{a.logInTime}</td>
                    <td>{a.logOutTime}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Container>
                
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Activitatea Clientului
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='text-center'>{this.state.customer.userName}</div>
            <br></br><br></br>
            <div>
              <Table striped bordered size="lg" hover variant="dark"   >
                <thead>
                  <tr>
                    <th className="text-center">Id</th>
                    <th className="text-center">Id Client</th>
                    <th className="text-center">User Client</th>
                    <th className="text-center">Data</th>
                    <th className="text-center">Time log in</th>
                    <th className="text-center">Time log out</th>
                  </tr>  
                </thead>

                <tbody>
                  {this.state.activityClientList.map((a,i)=>(
                    <tr className='admin'  key={i}>
                      <td>{a.id}</td>
                      <td>{a.idClient}</td>
                      <td>{a.userName}</td>
                      <td>{a.date}</td>
                      <td>{a.logInTime}</td>
                      <td>{a.logOutTime}</td>
                    </tr>
                  ))}
                </tbody>

              </Table>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
             Close Button
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default ActivityComponent;