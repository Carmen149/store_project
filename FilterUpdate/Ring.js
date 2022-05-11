import React from 'react'
import { Card} from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import axiosInstance from "../../axios";
import { Container } from 'react-bootstrap';
import {Row,Col} from 'react-bootstrap'
import NavBarStore from '../NavBarStore'
import {BsSuitHeart} from 'react-icons/bs'



class Ring extends React.Component {
  
  constructor(){
      super();
      this.state = {
          rings: [],
          price: false,
          availability: false,
          non_availability: false,
          priceMin: 0,
          priceMax: 0,
          size:0,
          material:'deselectare',
          asc:false,
          desc:false,
          images: this.importAll(require.context('../../images', false, /\.(png|jpe?g|svg)$/)),
      };
        
      

      this.sizes = [4, 5, 6, 7, 8, 9];
  }
  importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
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
        }
    )
    .catch(error => {
        console.log(error)
    })
}

  handleCheckbox=(e)=>{
    
   
    let val=e.target.checked;
    console.log(val);
    this.setState({
      [e.target.value]:val,
    
      
  });

  console.log(this.state.material);
  //console.log(this.state.filters.size);
  //console.log(this.state.filters.price);
  //console.log(this.state.filters.availability);

  }


  add=(id)=>{
    //console.log(id);
    let idClient=localStorage.getItem("USER_ID");
    let idCommand=0;
    console.log(this.state.ring)
    axiosInstance.put("api/command/"+id+"/"+idClient)  
    .then(
      res => {
          const val = res.data;
          idCommand=val.id;
          localStorage.setItem("idOrder",val.id);
      }
  )
  .catch(error => {
      console.log(error)
  })
  console.log(idCommand);

 }

  handleInput=(e)=>{
    this.setState({
         
      [e.target.name]:e.target.value
      
  })
  console.log(e.target.value);
  }

  filter=()=>{
    const list=[]
    console.log(this.state);
     if(this.state.material!=='deselectare'){
       list.push('material')
     }
     if(this.state.size!==0){
      list.push('size')
    }
    if(this.state.price!==0){
      list.push('price')
    }
    if(this.state.availability!==false || this.state.non_availability!==false){
      list.push('availability')
    }
    let availability=0;
    if(this.state.availability===true){
         availability=1;
    }
    
    axiosInstance.get(`api/items/RING/${this.state.priceMin}/${this.state.priceMax}/${availability}/${this.state.size}/${this.state.material}/${list}`)
    .then(res => {
      const val = res.data;
      console.log(val);
      this.setState({
        rings:val
      })
    }
   )
.catch(error => {
  console.log(error)
})
}
  handleChange=(e,name)=>{
    console.log(name, e.target.value);
      this.setState({
        [name]:e.target.value

      })
  }

  handleAvailable=(e, name)=>{
    this.setState({
      [name]: e.target.checked
    })
  }
  addMyList=(id)=>{

    let idClient=localStorage.getItem("USER_ID")
    axiosInstance.post(`api/customers/add/${idClient}/${id}`)
    .then(res => {
      const val = res.data;
      console.log(val);
    }
   )
    .catch(error => {
      console.log(error)
    })
  }
  render(){
    return (
      
      <>
        <NavBarStore/>
        <Container>
        <div>
        <div>
        <br></br>
        <Row className='text-center'>
            <Col>Material</Col>
            <Col>Marime</Col>
            <Col>Pret   <input onChange={this.handleInput} type="checkbox"  value="price" name="price" /></Col>
            <Col>Disponibilitate</Col>
            <Col>Sortare dupa pret</Col>
     
        </Row>
        <Row>
            <Col> aur roz   <input onChange={(e) => this.handleChange(e, "material")} type="radio" name="material" value="aurRoz"  /></Col>
            <Col>4  <input onChange={(e) => this.handleChange(e, "size")} type="radio" value="4" name="size" /></Col>
            <Col ></Col>
            <Col>In stoc <input onChange={(e) => this.handleAvailable(e, "availability")} type="checkbox" name="availability"  /></Col>
           
              <Col>Crescator   <input  type="checkbox" name="asc"/></Col>
        </Row>
        <Row>
            <Col> argint  <input onChange={(e) => this.handleChange(e, "material")} type="radio" name="material" value="argint"  /></Col>
            <Col>5  <input onChange={(e) => this.handleChange(e, "size")} type="radio"  value="5" name="size" /></Col>
            <Col ><Row className='text-center'>
                    <Col >Pret minim</Col>
                    <Col className="number" ><input type="number" style={{width: "60px"}} name="priceMin" onChange={this.handleInput}/></Col>
            </Row>
            </Col>
            <Col>Sold out<input onChange={(e) => this.handleAvailable(e, "non_availability")} type="checkbox" name="non_availability"  /></Col>
           <Col>Descrescator   <input  type="checkbox" name="desc"/></Col>
        </Row>

        <Row>
            <Col> argint placat cu rodiu  <input onChange={(e) => this.handleChange(e, "material")} type="radio"  name="material" value="argintR"  /></Col>
            <Col>6  <input onChange={(e) => this.handleChange(e, "size")} type="radio" value="6" name="size" /></Col>
            <Col>
              <Row ></Row>
            </Col>
            <Col></Col>
            <Col></Col>
        </Row>

        <Row>
            <Col> aur  <input onChange={(e) => this.handleChange(e, "material")} type="radio"  value="aur" name="material" /></Col>
            <Col> 7 <input onChange={(e) => this.handleChange(e, "size")} type="radio"  value="7" name="size" /></Col>
            <Col><Row className='text-center'>
                    <Col >Pret maxim</Col>
                    <Col className="number" ><input type="number" style={{width: "60px"}} name="priceMax" onChange={this.handleInput}/></Col>
                </Row></Col>
                <Col></Col>
                <Col></Col>        
                </Row>     
        <Row>
            <Col>  argint placat cu aur roz   <input onChange={(e) => this.handleChange(e, "material")} type="radio"  value="argintR" name="material" /></Col>
            <Col>8 <input onChange={(e) => this.handleChange(e, "size")} type="radio"  value="8" name="size" /></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
        </Row>
        <Row>
            <Col>   otel inoxidabil   <input onChange={(e) => this.handleChange(e, "material")} type="radio" value="otel" name="material" /></Col>
            <Col>9 <input onChange={(e) => this.handleChange(e, "size")} type="radio"  value="9"  name="size"/></Col>
            <Col></Col>
            <Col></Col>  
            <Col></Col>   
        </Row>

        <Row>
            <Col>   deselectare   <input onChange={(e) => this.handleChange(e, "material")} type="radio" value="deselectare"  name="material" /></Col>
            <Col>deselectare <input onChange={(e) => this.handleChange(e, "size")} type="radio"  value="0"  name="size"/></Col>
            <Col></Col>
            <Col></Col>  
            <Col></Col>   
        </Row>

        <Row >
            
          
          
            <Button variant="success" style={{width: "60px"}} marginright='20px' onClick={this.filter}>Filter</Button>  {"    "} 
          
           
            
             
        </Row>

        

          
         
        </div>
        <br></br> 
        <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(4, 10fr)",
              gridGap: "20px"
              }}>
        {this.state.rings.map((ring,index)=>(   
          <Card key={index} style={{ width: '18rem' }} >
           <Card.Img variant="top" src={this.state.images['img'+(index+1)+".jpg"]}></Card.Img>
           <Card.Body>
             <Card.Title>{ring.name}</Card.Title>
             <Card.Text>
               Some quick example text to build on the card title and make up the bulk of
               the card's content.
             </Card.Text>
             <div>
             <Button variant="primary" onClick={() => {console.log(this.state); console.log()}}>Details</Button>
             <Button variant="primary" onClick={()=>{this.add(ring.idItem)}}>Add to cart</Button>
              <Button  variant="dark"  onClick={()=>{this.addMyList(ring.idItem)}}>< BsSuitHeart /></Button>      
              </div>
           </Card.Body>
         </Card>
       
        
         
        ))}
        </div>
        </div>
       
        
        </Container>
         
      </>
    )
  }
 
}
export default Ring;