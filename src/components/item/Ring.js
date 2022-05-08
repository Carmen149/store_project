import React from 'react'
import { Card, Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import axiosInstance from "../../axios";
import { Container } from 'react-bootstrap';
import {Row,Col} from 'react-bootstrap'
import "../Card.css"
import history from '../../history';
import Cart from '../Cart'
import RingFunctions from "../item/RingFunctions"
class Ring extends React.Component {
  constructor(){
    super()
    this.state={
      rings:[],
      price:false,
      availability:false,
      priceMin:0,
      priceMax:0,
      aur:false,
      aurRoz:false,
      argint:false,
      argintR:false,
      argintA:false,
      otel:false,
      platina:false,
      availabilityV:0,
      s4:0,
      s5:0,
      s6:0,
      s7:0,
      s8:0,
      s9:0,
      list:[],
      materialV:"argint",sizeV:0,
      isEmpty:true,
      items:[],
      cantity:[],
      itemId:0,
      idCommand:0,
      show:false

    }
  }
  componentDidMount(){
    axiosInstance.get("api/items/get/ring")
    .then(
        res => {
            const val = res.data;
            
            this.setState(
                {
                    rings: val
                }       
            );
            //console.log(val);
            // console.log(this.state);
        }
    )
    .catch(error => {
        console.log(error)
    })
}

  handleCheckbox=(e)=>{
    
    //console.log(e.target.value);
    //console.log(e.target.checked);
    let val=e.target.checked;
    console.log(val);
    this.setState({
      [e.target.value]:val,
    
      
  });
  //this.filter();
  console.log(this.state.material);
  //console.log(this.state.filters.size);
  //console.log(this.state.filters.price);
  //console.log(this.state.filters.availability);

  }
  apply=(e)=>{
    let  materialV='', availabilityV=1,sizeV=0
    let  priceY='',  materialY='', availabilityY='', sizeY=0
    this.state.price ? priceY="price": priceY=null
    this.state.availability ? availabilityY="availability": availabilityY=null
    this.state.availability ? availabilityV=1 : availabilityV=0
    this.state.argint ? materialY="material" : materialY=null
    this.state.aur ? materialY="material" : materialY=null
    this.state.argintA ? materialY="material" : materialY=null
    this.state.argintR ?  materialY="material" : materialY=null
    this.state.aurRoz ? materialY="material" : materialY=null
    this.state.platina ?  materialY="material" : materialY=null
    this.state.argint ? materialY="material" : materialY=null
    this.state.otel ?  materialY="material" : materialY=null
    this.state.argint ?  materialV="argint" : materialV=' '
    this.state.aur ? materialV="aur" : materialV=' '
    this.state.argintA ? materialV="argint placat cu aur roz" : materialV=' '
    this.state.argintR ? materialV="argint placat cu rodiu"  : materialV=' '
    this.state.aurRoz ? materialV="aur roz" : materialV=' '
    this.state.platina ? materialV="platina" :materialV=' '
    this.state.otel ? materialY="otel inoxidabil" : materialV=' '
    this.state.s4 ? sizeY="size"  : sizeY=null
    this.state.s5 ? sizeY="size"  : sizeY=null
    this.state.s6 ? sizeY="size"  : sizeY=null
    this.state.s7 ? sizeY="size"  : sizeY=null
    this.state.s8 ? sizeY="size"  : sizeY=null
    this.state.s9 ? sizeY="size"  : sizeY=null

    this.state.s4 ? sizeV=4 : sizeV=0
    this.state.s5 ? sizeV=5 : sizeV=0
    this.state.s6 ? sizeV=6 : sizeV=0
    this.state.s7 ? sizeV=7 : sizeV=0
    this.state.s8 ? sizeV=8 : sizeV=0
    this.state.s9 ? sizeV=9 : sizeV=0
    let f;
    if(availabilityY!=null){
      f=[...this.state.list,availabilityY]
      this.setState({list:f})
    }
    if(priceY!=null){
      f=[...this.state.list,priceY]
      this.setState({list:f})
    }
    if(sizeY!=null){
       f=[...this.state.list,sizeY]
      this.setState({list:f})
    }
    if(materialY!=null){
       f=[...this.state.list,materialY]
       this.setState({list:f})
    }
    console.log(f);
    this.setState({
      materialV:materialV,
      availabilityV:availabilityV,
      sizeV:sizeV
    })

   


   

  }
  filter=(e)=>{
    console.log(this.state.list);
    axiosInstance.get("api/items/get/RING/"+this.state.priceMin+"/"+this.state.priceMax+"/"+ this.state.availabilityV + "/" + this.state.sizeV+"/" + this.state.materialV +"/" + "material")
    .then(
        res => {
            const val = res.data;
            
            this.setState(
                {
                    rings: val
                }       
            );
            console.log(val);
            // console.log(this.state);
            window.location.reload(false);
        }
    )
    .catch(error => {
        console.log(error)
    })

  }
  add=(id)=>{
    console.log(id);
    
    let idClient=localStorage.getItem("USER_ID");
    axiosInstance.put("api/command/"+id+"/"+idClient)  
    .then(
      res => {
          const val = res.data;
          console.log(val);
          this.setState({isEmpty:false, itemId:id, idCommand:val.id});
          localStorage.setItem("idOrder",val.id);
      }
  )
  .catch(error => {
      console.log(error)
  })

 }
 getItems=()=>{
   let idOrder=localStorage.getItem("idOrder");
   console.log(idOrder);
  axiosInstance.get("api/command/itemsCommand/"+idOrder)  
  .then(
    res => {
        const val = res.data;
        localStorage.setItem("itemsList",val);
        this.setState({items:val});
        console.log(val);
        console.log(typeof(val));
    }
    )
    .catch(error => {
        console.log(error)
    })

    axiosInstance.get("api/command/getCantity/"+idOrder)  
    .then(
      res => {
          const val = res.data;
          console.log(val);
          localStorage.setItem("cantity",val);
          this.setState({cantity:val});
      })
      .catch(error => {
          console.log(error)
      })
    history.push("/aux_cart");
  window.location.reload();
}
getItemList=()=>{
  
  
  this.setState( {show:true});
  // history.push("/cart");
  // window.location.reload();
  // return this.state.items;
  
}
  handleInput=(e)=>{
    this.setState({
         
      [e.target.id]:e.target.value
      
  })
  console.log(e.target.value);
  }
  render(){
    return (
      
      <>
        <Container>
        <div>
        <div>
        <br></br>
        <Row className='text-center'>
            <Col>Material</Col>
            <Col>Marime</Col>
            <Col md={6}>Pret   <input onChange={this.handleCheckbox} type="checkbox"  value="price" name="price" /></Col>
            <Col  >Disponibilitate   <input onChange={this.handleCheckbox} type="checkbox" name="availability" value="availability"  /></Col>
        </Row>
        <Row>
            <Col> aur roz   <input onChange={this.handleCheckbox} type="checkbox" name="material" value="aurRoz"  /></Col>
            <Col>4  <input onChange={this.handleCheckbox} type="checkbox" value="s4" name="size" /></Col>
            <Col></Col>
            <Col></Col>
        </Row>
        <Row>
            <Col> argint  <input onChange={this.handleCheckbox} type="checkbox" name="material" value="argint"  /></Col>
            <Col>5  <input onChange={this.handleCheckbox} type="checkbox"  value="s5" name="size" /></Col>
            <Col ><Row className='text-center'>
                    <Col md={4}>Pret minim</Col>
                    <Col className="number" md={4}><input type="number" style={{width: "60px"}} id="priceMin" onChange={this.handleInput}/></Col>
            </Row>
            </Col>
            <Col></Col>
        </Row>

        <Row>
            <Col> argint placat cu rodiu  <input onChange={this.handleCheckbox} type="checkbox"  name="material" value="argintR"  /></Col>
            <Col>6  <input onChange={this.handleCheckbox} type="checkbox" value="s6" name="size" /></Col>
            <Col>
              <Row ></Row>
            </Col>
            <Col></Col>
        </Row>

        <Row>
            <Col> aur  <input onChange={this.handleCheckbox} type="checkbox"  value="aur" name="material" /></Col>
            <Col> 7 <input onChange={this.handleCheckbox} type="checkbox"  value="s7" name="size" /></Col>
            <Col><Row className='text-center'>
                    <Col md={4}>Pret maxim</Col>
                    <Col className="number" md={4}><input type="number" style={{width: "60px"}} id="priceMax" onChange={this.handleInput}/></Col>
                </Row></Col>

                <Col></Col>        
                </Row>     
        <Row>
            <Col>  argint placat cu aur roz   <input onChange={this.handleCheckbox} type="checkbox"  value="argintR" name="material" /></Col>
            <Col>8 <input onChange={this.handleCheckbox} type="checkbox"  value="s8" name="size" /></Col>
            <Col></Col>
            <Col></Col>
        </Row>
        <Row>
            <Col>   otel inoxidabil   <input onChange={this.handleCheckbox} type="checkbox" value="otel" name="material" /></Col>
            <Col>9 <input onChange={this.handleCheckbox} type="checkbox"  value="material"  name="size"/></Col>
            <Col></Col>
            <Col></Col>     
        </Row>

        <Row >
            <Col>platina <input onChange={this.handleCheckbox} type="checkbox"  value="platina"  name="material"/></Col>
          
            <Button variant="success" style={{width: "60px"}} marginright='20px' onClick={this.apply}>Apply filters</Button>   {"    "}
            <Button variant="success" style={{width: "60px"}} marginright='20px' onClick={this.filter}>Filter</Button>  {"    "} 
            <Button variant="success" style={{width: "60px"}} marginright='20px' onClick={()=>{this.getItems()}}>View cart</Button> 
            {/* <Button variant="success" style={{width: "60px"}} marginright='20px' onClick={()=>{this.getItemList()}}>View cart2</Button>    */}
            
           
            
             
        </Row>

        

          
         
        </div>
        <br></br> 
        <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(4, 10fr)",
              gridGap: "20px"
              }}>
        {this.state.rings.map((ring,i)=>(   
          <Card key={i} style={{ width: '18rem' }} >
           <Card.Img variant="top" src="holder.js/100px180" />
           <Card.Body>
             <Card.Title>{ring.name}</Card.Title>
             <Card.Text>
               Some quick example text to build on the card title and make up the bulk of
               the card's content.
             </Card.Text>
             <Button variant="primary">Details</Button>
             <Button variant="primary" onClick={()=>{this.add(ring.idItem)}}>Add to cart</Button>
           </Card.Body>
         </Card>
       
        
         
        ))}
        </div>
        </div>
        <div>
            { this.state.show ? <RingFunctions itemListos={this.state.items}/> : ""}
        </div>
        </Container>
         
      </>
    )
  }
 
}
export default Ring;