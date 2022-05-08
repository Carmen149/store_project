import React from "react";

import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
class Ring extends React.Component{
    render(){
        return(
            <div className='container'>
        <Navbar>
                {/* "Link" in brand component since just redirect is needed */}
                <Navbar.Brand as={Link} to='/'>Brand link</Navbar.Brand>
                <Nav>
                  {/* "NavLink" here since "active" class styling is needed */}
                  <Nav.Link as={NavLink} to='/' exact>Ring</Nav.Link>
                  <Nav.Link as={NavLink} to='/bracelet'>Bracelet</Nav.Link>
                
                </Nav>
              </Navbar>
          
        </div>
        )
    }
}
export default Ring;