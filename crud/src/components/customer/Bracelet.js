import React from "react";
import { Nav } from 'react-bootstrap';
class Bracelet extends React.Component{
    render(){
        return(
           <div>
               <Nav variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link href="/home">Ring</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/bracelet">Bracelet</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>
              Disabled
            </Nav.Link>
          </Nav.Item>
        </Nav>
          
           </div>
        )
    }
}
export default Bracelet;