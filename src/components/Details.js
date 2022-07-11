import React from 'react'
import axiosInstance from '../axios';
import NavBarStore from './NavBarStore';
import Image from 'react-bootstrap/Image';
import { Container } from 'react-bootstrap';
import {Row,Col} from 'react-bootstrap';
import './Details.css'
class Details extends React.Component {
    constructor() {
        super();
        this.state = {
            id: localStorage.getItem("idItem"),
            item:{
                idItem:"",
                name:"",
                price:"",
                description:"",
                material:"",
                availability:0,
                size:"",
                type:"", 
              
               
            },
            feedback:"",
            comentarii:[],
         
            images: this.importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/)),
          
        };
       
    }
    componentDidMount() {
        axiosInstance.get("api/items/"+this.state.id)
        .then(res => {
            const val = res.data;
            this.setState({
                item: val
            });
            console.log(this.state.item);
        })
        .catch(error => {
            console.log(error);
        });
        axiosInstance.get("api/items/getCom/"+this.state.id )
        .then(res => {
            const val = res.data;
            this.setState({
                comentarii: val
            });
            console.log(val);
        })
        .catch(error => {
            console.log(error);
        });
        
    }
    importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }
    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          console.log("validate")
          console.log(this.state)
          let idCustomer=localStorage.getItem("USER_ID")
          let url=encodeURI(`api/customers/addComItem/${idCustomer}/${this.state.id}/${this.state.feedback}`)
          console.log(url)
          axiosInstance.put(url)
          .then(res => {
            const val = res.data;
            this.setState({
               
            });
            console.log(val);
        })
        .catch(error => {
            console.log(error);
        });
        axiosInstance.get("api/items/getCom/"+this.state.id )
        .then(res => {
            const val = res.data;
            this.setState({
                comentarii: val
            });
            console.log(val);
        })
        .catch(error => {
            console.log(error);
        });

        }
       
    }
    handleChange=(e)=>{
        console.log(e.target.value)
      this.setState({
          feedback:e.target.value
      })
    }
    add=()=>{
        let idClient=localStorage.getItem("USER_ID");
        let idCommand=0;
        console.log(this.state.ring)
        axiosInstance.put("api/command/"+this.state.id+"/"+idClient)  
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
    addCom=()=>{
        axiosInstance.get("api/items/getCom/"+this.state.id )
        .then(res => {
            const val = res.data;
            this.setState({
                comentarii: val
            });
            console.log(val);
        })
        .catch(error => {
            console.log(error);
        });

    }
    render(){
    return(
        <>
        <NavBarStore/>
        <Container>
        <br></br>
       
        <br></br>
        
        <Row className="justify-content-md-center">
            <Col  md="auto"> 
             <div className="img_style">
               <Image  src={this.state.images[this.state.item.nameImg+'.jpg']}/>
               <div className='text-center' style={{color:"#FFD700",fontSize:"30px"}}>Review</div>
               <br></br><br></br>
               <div >
                   {this.state.comentarii.map((com,index)=>(
                       <div>{com.customer.userName + ":  " + com.com}</div>
                   ))}
               </div>
            </div></Col>
            <Col  xs lg="6">
             <div>
              <div className='title'>{this.state.item.name}</div>
              <br></br>
              {this.state.item.availability ?  <div className='stoc'>Disponibilitate: In stoc</div> : <div>Disponibilitate: Sold out</div>}
              <br></br>
              <div className='stoc'>Material:{this.state.item.material}</div>
              <br></br>
              <div className='price'>{this.state.item.price} Lei</div>
              <br></br><br></br>
              <div className='descriere'>Descriere</div>
              <br></br>
              <div className='description'>{this.state.item.description}</div>
              <br></br>
              <button className="btn-store" onClick={this.add}>Adaugati in cos</button>
              <br></br><br></br>
              <div><textarea rows={5}  style={{width:"90%", height:"50%"}} placeholder="Feedback *"  onChange={this.handleChange} onKeyDown={this.handleKeyDown}/></div>
              <button className="btn-store" onClick={this.addCom}>Adaugati comentariu</button>
              <br></br>
              <br></br>
            </div></Col>
        </Row>
         
        </Container>
               
     
        </>
        
    )
}
}

export default Details