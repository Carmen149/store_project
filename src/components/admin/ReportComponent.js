
import React from 'react'
import { Container } from 'react-bootstrap'
import { Table } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import axiosInstance from '../../axios'
class ReportComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            zi1:0,
            luna1:0,
            an1:0,
            zi2:0,
            luna2:0,
            an2:0,
            idClient:0,
            priceMin:0,
            priceMax:0,
            type:"",
            showDesc:false,
            description:'',
            descriere:[ 'Acest raport afiseaza toate produdele cumparate intr-o zi. Introduceti data in campul data1.',
                        'Acest raport afiseaza pentru fiecare client suma cheltuita in mai multe zile cuprinse intre data1 si data2.',
                        'Acest raport afiseaza lista de produse favorite a unui client.',
                        'Acest raport afiseaza detaliile despre unui client.',
                        'Acest raport afiseaza produsele care apartin tipului specificat si care au pretul cuprins intre intervalul definit de pretMin si pretMax.',
                        'Acest raport afiseaza produsul cel mai cumparat din fiecare categorie']
        }
        
    };
    handleShowDesc=(index)=>{
        this.setState({
            description:this.state.descriere[index],
            showDesc:true
        })
    }
    handleCloseDesc=(e)=>{this.setState({showDesc:false});}
    raport1=()=>{
        console.log(this.state.zi1);
        console.log(this.state.luna1);
        console.log(this.state.an1);

        axiosInstance.get("api/command/report/"+this.state.zi1+"/"+this.state.luna1+"/"+this.state.an1)
        .then(data => {console.log(data.data);})
        .catch(err => this.setState( {errorHolder:err.response.data} ))
    }
    raport2=()=>{
        console.log(this.state.zi1);
        console.log(this.state.luna1);
        console.log(this.state.an1);

        console.log(this.state.zi2);
        console.log(this.state.luna2);
        console.log(this.state.an2);

        axiosInstance.get("api/customers/reportCustomers/"+this.state.zi1+"/"+this.state.luna1+"/"+this.state.an1+"/"+this.state.zi2+"/"+this.state.luna2+"/"+this.state.an2)
        .then(data => {console.log(data.data);})
        .catch(err => this.setState( {errorHolder:err.response.data} ))
    }
    raport3=()=>{
        console.log(this.state.idClient);
        axiosInstance.get("api/customers/report/"+this.state.idClient)
        .then(data => {console.log(data.data);})
        .catch(err => this.setState( {errorHolder:err.response.data} ))
    }
    raport4=()=>{
        console.log(this.state.idClient);
        axiosInstance.get("api/customers/export/"+this.state.idClient+'/xml')
        .then(data => {console.log(data.data);})
        .catch(err => this.setState( {errorHolder:err.response.data} ))
    }
    raport5=()=>{
        console.log(this.state.priceMin);
        console.log(this.state.priceMax);
        axiosInstance.get("api/items/export/"+this.state.priceMin+"/"+this.state.priceMax+"/"+this.state.type)
        .then(data => {console.log(data.data);})
        .catch(err => this.setState( {errorHolder:err.response.data} ))
  
    }
    raport6=()=>{
        axiosInstance.get("api/items/createReport")
        .then(data => {console.log(data.data);})
        .catch(err => this.setState( {errorHolder:err.response.data} ))
        
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
        console.log(e.target.value);
        console.log(e.target.id);   
    }
  render(){
    return (
      <div>
        <Container>
            <h1 className='text-center'>Rapoarte</h1>
            <br></br>
            <div style={{marginRight:"20px", marginLeft:"20px"}}>
            <Table striped bordered size="lg" hover  variant="dark"  >
                <thead>
                    <tr>
                        <th className="text-center">Nr</th>
                        <th className="text-center" style={{width: "200px"}}>Numele Raportului</th>
                        <th className="text-center" >Descriere</th>
                        <th className="text-center">Actiune</th>
                        <th className="text-center">Fisier generat</th>
                        <th className="text-center">Data 1</th>
                        <th className="text-center">Data 2</th>
                        <th className="text-center">Id Clientului</th>
                        <th className="text-center">Tipul produsului</th>
                        <th className="text-center">Pret minim</th>
                        <th className="text-center">Pret maxim</th>
                    </tr>
                
                    <tr className="text-center">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td   style={{width: "180px"}} > <div>
                                                            Zi
                                                            Luna
                                                            An
                                                         </div>
                             
                                                        <input type="number" id="zi1" size='sm'     style={{width: "40px"}}  onChange ={this.handleChange} /> 
                                                         <input type="number" id="luna1" size='sm'     style={{width: "40px"}}  onChange ={this.handleChange} />
                                                         <input type="number" id="an1" size='sm'     style={{width: "80px"}}  onChange ={this.handleChange} />
                        </td>
                        <td style={{width: "180px"}}>   <div>
                                                            Zi
                                                            Luna
                                                            An
                                                         </div>
                             
                                                        <input type="number" id="zi2" size='sm'     style={{width: "40px"}}  onChange ={this.handleChange} /> 
                                                         <input type="number" id="luna2" size='sm'     style={{width: "40px"}}  onChange ={this.handleChange} />
                                                         <input type="number" id="an2" size='sm'     style={{width: "80px"}}  onChange ={this.handleChange} />
                        </td>
                        <td><input type="number" id="idClient" size='sm'  style={{width: "100px"}}  onChange ={this.handleChange} /> </td>
                        <td><input type="text" id="type" size='sm'      style={{width: "100px"}}  onChange ={this.handleChange} /> </td>
                        <td><input type="number" id="priceMin" size='sm' style={{width: "40px"}}  onChange ={this.handleChange} /> </td>
                        <td><input type="number" id="priceMax" size='sm' style={{width: "40px"}}  onChange ={this.handleChange} /> </td>
                    </tr>
                </thead>
                 <tbody>
                    <tr>
                        <td>1</td>
                        <td>Produse cumparate</td>
                        <td><Button size='sm' variant="info" style={{width: "90px"}} onClick={()=>{this.handleShowDesc(0)}}>View</Button> </td>
                        <td><Button size='sm' variant="success" style={{width: "90px"}}  onClick={this.raport1}>Create</Button> </td>
                        <td className='text-center'>csv</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>

                    <tr>
                        <td>2</td>
                        <td>Suma cheluita</td>
                        <td><Button size='sm' variant="info" style={{width: "90px"}}  onClick={()=>{this.handleShowDesc(1)}}>View</Button> </td>
                        <td><Button size='sm' variant="success" style={{width: "90px"}}  onClick={this.raport2}>Create</Button> </td>
                        <td className='text-center'>csv</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>

                    <tr>
                        <td>3</td>
                        <td>Lista favorita</td>
                        <td><Button size='sm' variant="info" style={{width: "90px"}}  onClick={()=>{this.handleShowDesc(2)}}>View</Button> </td>
                        <td><Button size='sm' variant="success" style={{width: "90px"}}  onClick={this.raport3}>Create</Button> </td>
                        <td className='text-center'>csv</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>


                    <tr>
                        <td>4</td>
                        <td>Detalii client</td>
                        <td><Button size='sm' variant="info" style={{width: "90px"}}  onClick={()=>{this.handleShowDesc(3)}}>View</Button> </td>
                        <td><Button size='sm' variant="success" style={{width: "90px"}}  onClick={this.raport4}>Create</Button> </td>
                        <td className='text-center'>xml</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        
                    </tr>

                    <tr>
                        <td>5</td>
                        <td>Produse intre min si max</td>
                        <td><Button size='sm' variant="info" style={{width: "90px"}}  onClick={()=>{this.handleShowDesc(4)}}>View</Button> </td>
                        <td><Button size='sm' variant="success" style={{width: "90px"}}  onClick={this.raport5}>Create</Button> </td>
                        <td className='text-center'>xls</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>

                    <tr>
                        <td>6</td>
                        <td>Most wanted</td>
                        <td><Button size='sm' variant="info" style={{width: "90px"}}  onClick={()=>{this.handleShowDesc(5)}}>View</Button> </td>
                        <td><Button size='sm' variant="success" style={{width: "90px"}}  onClick={this.raport6}>Create</Button> </td>
                        <td className='text-center'>json</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                      
                        
                </tbody>
                 
                  
                </Table>
            </div>
        </Container>
        <Modal show={this.state.showDesc} onHide={this.handleCloseDesc}>
            <Modal.Header closeButton>
                <Modal.Title>Descriere raport</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>{this.state.description} </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleCloseDesc}>Close</Button>
            </Modal.Footer>
        </Modal>
      </div>
    )
  }
 
}

export default ReportComponent