import React from "react"

import img1 from "../../images/img1.jpg"
class CardUi extends React.Component{
    render(){
        return(
            <div className="card text-center">
              <div className="overflow">
                  <img ser={img1} alt='Image 1'/>
              </div>
              <div className="card-body text-dark">
                  <h4 className="card-title">Card Title</h4>
                  <p className="card-text text-secondary"></p> 
                <a href="#" className="btn btn-outline-success">Details</a>             
              </div>
            </div>
         );
    }
  
}
export default CardUi;
