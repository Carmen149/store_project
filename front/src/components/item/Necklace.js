import React from 'react'
import { Card} from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import axiosInstance from "../../axios";
import { Container } from 'react-bootstrap';
import {Row,Col} from 'react-bootstrap'
import NavBarStore from '../NavBarStore'
import {BsSuitHeart} from 'react-icons/bs'
import '../ButonStore.css'
import history from '../../history';


class Necklace extends React.Component {
  
  constructor(){
    super();
    this.state = {
      necklaces: [],
      price: false,
      availability: 2,
      priceMin: 0,
      priceMax: 0,
      size:0,
      material:'deselectare',
      asc:2,
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
   
    axiosInstance.get("api/items/get/necklace")
    .then(
      res => {
        const val = res.data;
        this.setState({
          necklaces: val
        });
    })
    .catch(error => {
      console.log(error)
    })
}

  handleCheckbox=(e,name)=>{
    let val=e.target.checked;
    console.log(val);
    this.setState({
      [name]:val,
    });
    console.log(this.state.material);  
  }


  add=(id)=>{
    let idClient=localStorage.getItem("USER_ID");
    let idCommand=0;
    console.log(this.state.necklace)
    axiosInstance.put("api/command/"+id+"/"+idClient)  
    .then(
      res => {
        const val = res.data;
        idCommand=val.id;
        localStorage.setItem("idOrder",val.id);
    })
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
    let list=[]
    let ok=0
    console.log(this.state);
    console.log(list);
    console.log(this.state.price)
    if(this.state.asc!=2){
      list.push('ordonare')
      ok=1
    }
    if(this.state.material!=='deselectare'){
      list.push('material');
      ok=1
    }
    if(this.state.size!=0){
      list.push('size')
      ok=1
    }
    if(this.state.price!=false){
      list.push('price')
      ok=1
    }
    if(this.state.availability!=2){
      list.push('availability')
      ok=1
    }
    let availability=this.state.availability;
    let ordonare=this.state.asc
   if(ok==0){
     list='null'
   }
   console.log(list);
    let url=encodeURI(`api/items/NECKLACE/${this.state.priceMin}/${this.state.priceMax}/${availability}/${this.state.size}/${this.state.material}/${ordonare}/${list}`)
    console.log(url)
    axiosInstance.get(url)
    .then(res => {
      const val = res.data;
      console.log(val);
      this.setState({
        necklaces:val
      })
    })
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

  handleSort=(e,name)=>{
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
    })
    .catch(error => {
      console.log(error)
    })
  }
  ordonare=()=>{
     if(this.state.asc===true){
      axiosInstance.post(`api/items/orderAsc/NECKLACE`)
      .then(res => {
        const val = res.data;
        console.log(val);
        this.setState({
          necklaces:val
        })
      })
      .catch(error => {
        console.log(error)
      })
    }
    if(this.state.desc===true){
      axiosInstance.post(`api/items/orderDesc/NECKLACE`)
      .then(res => {
        const val = res.data;
        console.log(val);
        this.setState({
          necklaces:val
        })
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
  viewDetails=(id,index)=>{
    console.log(id);
    localStorage.setItem("idItem",id);
    history.push("/details");
    window.location.reload();
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
                <Col>Pret   <input onChange={(e)=>this.handleCheckbox(e,"price")} type="checkbox"   name="price" /></Col>
                <Col>Disponibilitate</Col>
                <Col>Sortare dupa pret</Col>
              </Row>

              <Row>
                <Col> Aur roz   <input onChange={(e) => this.handleChange(e, "material")} type="radio" name="material" value="aur roz"  /></Col>
                <Col ></Col>
                <Col>In stoc <input onChange={(e) => this.handleChange(e, "availability")} type="radio" value='1' name="availability"  /></Col>
                <Col>Crescator   <input onChange={(e) => this.handleChange(e, "asc")} value='1' type="radio" name="asc"/></Col>
              </Row>
              <Row>
                <Col> Argint  <input onChange={(e) => this.handleChange(e, "material")} type="radio" name="material" value="argint"  /></Col>
                <Col >
                  <Row className='text-center'>
                    <Col >Pret minim</Col>
                    <Col className="number" ><input type="number" style={{width: "60px"}} name="priceMin" onChange={this.handleInput}/></Col>
                  </Row>
                </Col>
                <Col>Sold out<input onChange={(e) => this.handleChange(e, "availability")} type="radio" value ='0' name="availability"  /></Col>
                <Col>Descrescator   <input  type="radio" onChange={(e) => this.handleChange(e, "asc")} value='0' name="asc"/></Col>
              </Row>

              <Row>
                <Col> Argint placat cu rodiu  <input onChange={(e) => this.handleChange(e, "material")} type="radio"  name="material" value="argint placat cu rodiu"  /></Col>
                <Col>
                  <Row ></Row>
                </Col>
                <Col>Deselectare <input onChange={(e) => this.handleChange(e, "availability")} type="radio"  value="2"  name="availability"/></Col>
                <Col>Deselectare <input onChange={(e) => this.handleChange(e, "asc")} type="radio"  value="2"  name="asc"/></Col>
              </Row>

              <Row>
                <Col> Aur  <input onChange={(e) => this.handleChange(e, "material")} type="radio"  value="aur" name="material" /></Col>
                <Col>
                  <Row className='text-center'>
                    <Col >Pret maxim</Col>
                    <Col className="number" ><input type="number" style={{width: "60px"}} name="priceMax" onChange={this.handleInput}/></Col>
                  </Row>
                </Col>
                <Col></Col>
                <Col></Col>        
              </Row>     

              <Row>
                <Col>  Argint placat cu aur roz   <input onChange={(e) => this.handleChange(e, "material")} type="radio"  value="argint placat cu aur roz" name="material" /></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
              <Row>
                <Col>   Otel inoxidabil   <input onChange={(e) => this.handleChange(e, "material")} type="radio" value="otel inoxidabil" name="material" /></Col>
                <Col></Col>
                <Col></Col>  
                <Col></Col>   
              </Row>

              <Row>
                <Col>Deselectare   <input onChange={(e) => this.handleChange(e, "material")} type="radio" value="deselectare"  name="material" /></Col>
                <Col></Col>
                <Col></Col>  
                <Col></Col>   
              </Row>

              <Row >
                <div style={{width:'100%', display:'flex', justifyContent:'flex-end'}}>
                  <button className="btn-store" style={{marginRight:'15px'}} onClick={this.filter}>Filter</button> 
                </div> 
              </Row>
            </div>
            <br></br> 
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 10fr)",gridGap: "20px"}}>
              {this.state.necklaces.map((necklace,index)=>(   
                <Card key={index} style={{ width: '18rem' }} >
                <Card.Img variant="top" src={this.state.images[necklace.nameImg+".jpg"]}></Card.Img>
                  <Card.Body>
                    <Card.Title>{necklace.name}</Card.Title>
                    <br></br>
                    <Card.Subtitle className="mb-2 text-muted">Pret: {necklace.price}</Card.Subtitle>
                    <Card.Text>
                    Fiecare moment din viata este pretios. Lasa colierele Euphoria sa te acompanieze peste tot si sa fie alaturi de tine in orice moment.
                    </Card.Text>
                    <div>
                      <Button variant="dark"  onClick={()=>{this.viewDetails(necklace.idItem,index)}}>Details</Button>{'  '}
                      <Button variant="dark" style={{marginLeft:'10px'}} onClick={()=>{this.add(necklace.idItem)}}>Add to cart</Button>{'  '}
                      <Button  variant="dark"  style={{marginLeft:'10px'}} onClick={()=>{this.addMyList(necklace.idItem)}}>< BsSuitHeart /></Button>   {'  '}   
                    </div>
                  </Card.Body>
                </Card>
              ))}
              <br></br>
            </div>
          </div>
        </Container> 
      </>
    )
  }
 
}
export default Necklace;