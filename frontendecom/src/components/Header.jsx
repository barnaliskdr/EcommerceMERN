import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {FaShoppingCart,FaUser} from 'react-icons/fa';
import logo from '../assets/logo.png';
import { Form, FormControl, Button } from 'react-bootstrap';


const Header = () => {
  return (
    <header>
        <Navbar expand="lg" className="align-items-right" style={{backgroundColor:"pink", color:"brown"}}>
        {/* <Navbar expand="lg" className="align-items-right bg-body-tertiary"> */}
       {/* <Navbar bg="dark" variant="dark" expand="lg" className="align-items-right bg-body-tertiary"> */}
      <Container>
        <Navbar.Brand href="#home">
            <img src={logo} width="35" height="35" className="d-inline-block align-top" alt="ShopMarket" />
          ShopMarket</Navbar.Brand>
          <Form inline className="d-flex ">
          <FormControl type="search" placeholder="Search" className="mr-sm-2" aria-label="Search" />
          <Button variant="outline-success" type="submit">Search</Button>
        </Form>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        
          <Nav className="ms-auto">
            <Nav.Link href="/cart">
                <FaShoppingCart/>cart
            </Nav.Link>
            <Nav.Link href="/login">
                <FaUser/>Sign In
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>  
    </header>
  )
}

export default Header
