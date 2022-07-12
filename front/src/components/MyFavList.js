import React from 'react'
import axiosInstance from '../axios';
import NavBarStore from './NavBarStore';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import history from '../history';
class MyFavList extends React.Component {
    constructor(){
        super();
        this.state = {
            myList:[],
            customerId:localStorage.getItem("USER_ID"),
            images: this.importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/)),
          
        }
    }
    remove=(id)=>{
        axiosInstance.delete("api/customers/del/"+this.state.customerId+"/"+id)  
        .then(
          res => {
          }
          )
          .catch(error => {
              console.log(error)
          })
          window.location.reload();
        
    }
    viewDetails=(id,index)=>{
        console.log(id);
        localStorage.setItem("idItem",id);
        history.push("/details");
        window.location.reload();
      }
    importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
      }
    componentDidMount(){
        if(this.state.customerId!=null){
            axiosInstance.get("api/customers/myFv/"+this.state.customerId)  
            .then(
              res => {
                  const val = res.data;
                  this.setState({myList:val});
               
              }
              )
              .catch(error => {
                  console.log(error)
              })
          
              
        }
    
      
    }
  render(){
      return(
          <>
            <NavBarStore/>
            <div>
            <br></br>
            <Container>
            <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(4, 10fr)",
                gridGap: "20px"
                }}>
                {this.state.myList.map((fav,index)=>(   
                        
                    <Card key={index} style={{ width: '18rem' }} >
                    <Card.Img variant="top" src={this.state.images[fav.nameImg+'.jpg']} ></Card.Img>
                    <Card.Body>
                        <Card.Title className='text-center'>{fav.name}</Card.Title>
                        <br></br>
                        <Card.Text>
                        </Card.Text>
                        <div>
                        <Button variant="dark" onClick={()=>{this.remove(fav.idItem)}} >Remove</Button>
                        <Button variant="dark" style={{marginLeft:'90px'}} onClick={()=>{this.viewDetails(fav.idItem)}}>Details</Button>
                        </div>
                    </Card.Body>
                    </Card>
                ))}
                </div>
            </Container>
               
            </div>
             
          </>
      )
  }
}

export default MyFavList