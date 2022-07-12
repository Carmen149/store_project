import React from 'react';
import axiosInstance from "../axios";
import NavBarStore from '../components/NavBarStore'
import { Button } from "react-bootstrap";
import history from '../history';
import './Cart.css'
class Cart extends React.Component{
    constructor(){
        super();
        this.state = {
            items:[],
            cantity:[],
            idOrder:localStorage.getItem("idOrder"),
            customerId:localStorage.getItem("USER_ID"),
            images: this.importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/)),
            total:0,
            status:null
        }
    }
    importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    componentDidMount(){
        if(this.state.idOrder!=null){

            axiosInstance.get("api/command/itemsCommand/"+this.state.idOrder)  
            .then(
              res => {
                const val = res.data;
                this.setState({items:val});
              }
            )
            .catch(error => {
                console.log(error)
            })
          
            axiosInstance.get("api/command/getCantity/"+this.state.idOrder)  
            .then(
                res => {
                    const val = res.data;
                    this.setState({cantity:val});
                })
            .catch(error => {
                console.log(error)
            })

            axiosInstance.put("api/command/calcul/"+this.state.idOrder)  
            .then(
                res => {
                    const val = res.data;
                    this.setState({total:val});
                })
            .catch(error => {
                console.log(error)
            })
        }
      
    }
    add=(id)=>{
        let idClient=localStorage.getItem("USER_ID");
        axiosInstance.put("api/command/"+id+"/"+idClient)  
        .then(
          res => {
            const val = res.data;
            console.log(val);
            const idCommand=val.id;
        })
        .catch(error => {
          console.log(error)
        })

        axiosInstance.get("api/command/getCantity/"+this.state.idOrder)  
        .then(
            res => {
                const val = res.data;
                this.setState({cantity:val});
        })
        .catch(error => {
            console.log(error)
        })
        window.location.reload();

    }
    remove=(id)=>{
        axiosInstance.put("api/command/del/"+this.state.idOrder+"/"+id)  
        .then(
          res => {
            const val = res.data;
            const idCommand=val.id;
        })
        .catch(error => {
          console.log(error)
       })
       axiosInstance.get("api/command/getCantity/"+this.state.idOrder)  
      .then(
        res => {
            const val = res.data;
            this.setState({cantity:val});
        })
        .catch(error => {
            console.log(error)
        })
        window.location.reload();
    }
    finish=()=>{
        axiosInstance.get("api/command/change/"+this.state.idOrder)  
        .then(
          res => {  
          })
        .catch(error => {
            console.log(error)
        });
        localStorage.setItem("idOrder",null)
        history.push("/ring");
        window.location.reload();
    }

   render(){
       return(
        <>
            <NavBarStore/>
            <div className='cart-container'>

             {this.state.items.length===0? 
                <div className='cart-empty'>Nu ai inca nimic in cos</div>:
                    <div>
                        <div className='titles'>
                            <h3 className='product-tile'>Product</h3>
                            <h3 className='Price'>Price</h3>
                            <h3 className='Quantity'>Quantity</h3>
                            <h3 className='total'>Total</h3>
                        </div>

                        <div className='cart-items'>
                            {this.state.items.map((item,index)=>(   
                            <div className='cart-item' key={item.idITem}> 
                                <div className='cart-product'>
                                    <img src={this.state.images[item.nameImg+'.jpg']}></img>
                                    <div>
                                        <h3>{item.name}</h3>
                                    </div>
                                </div>

                                <div className='cart-product-price'>{item.price}</div> 
                                    <div className='cart-product-quantity'>
                                        <button onClick={()=>{this.remove(item.idItem)}}>-</button>
                                        <div className='count'>{this.state.cantity[index]}</div>
                                        <button onClick={()=>{this.add(item.idItem)}}>+</button>
                
                                    </div> 
                                <div className='cart-product-total-price'>{item.price*this.state.cantity[index]}</div>
                            </div> 
                        ))}
                    </div>

                    <div className="cart-summary">
                        <div className="cart-checkout">
                            <div className="subtotal" >
                                <span>Total {this.state.total }</span><br></br>
                                    
                            </div>
                            <br></br>
                            <Button size='sm' variant="success" onClick={this.finish}>Finish Command</Button>
                        </div>
                    </div>
                
                </div>
             }
            </div>
        </>
          
           
       )
   }

}

export default Cart;
