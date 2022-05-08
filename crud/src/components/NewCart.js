import React from 'react'

class NewCart extends React.Component {
    constructor(){
        super();
        this.state={
            items:localStorage.getItem("itemList"),
            cantity:localStorage.getItem("cantity"),
            idCommand:localStorage.getItem("idOrder"),
        }
     

    }
    render(){
        return (
        //     <div>{this.state.items.map((item,i)=>(
        //         <div key={i}> 
        //           {/* <h1>{item.name } {  this.cantity[i]} </h1> */}
                
        //         </div>
        //     ))}</div>
        <p>{this.state.items}</p>
         )
    }
 
}

export default NewCart