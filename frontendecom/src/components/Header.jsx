import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {FaShoppingCart,FaUser} from 'react-icons/fa';
import logo from '../assets/logo.png';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useGetProductByNameQuery , useLazyGetProductByNameQuery } from '../slices/productsApiSlice';


const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  //const {data: products, isloading, isError} = useGetProductByNameQuery();
  //const [trigger, { data: product, isLoading, isError }] = useLazyGetProductByNameQuery(); // useLazyQuery hook


  const handleProductSearch = (e) => {
    setProductName(e.target.value);
    console.log(productName);
  }

  // useEffect(() => {
   
  //   {productName? console.log(products): ""}
  // },[productName])

  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch(useLazyGetProductByNameQuery(productName));
    if (productName.trim()) {
      // trigger(productName); // Trigger the lazy query
      navigate(`/products/${productName}`);
    }
    
  }


  // console.log("products---",product);
  
  return (
    <header>
        <Navbar expand="lg" className="grid align-items-right" style={{backgroundColor:"pink", color:"brown"}}>
      <Container>
        <Navbar.Brand href="#home">
            <img src={logo} width="35" height="35" className="d-inline-block align-center" alt="ShopMarket" />
          ShopMarket</Navbar.Brand>
          <Form inline className="d-flex " onSubmit={handleSubmit}>
          <FormControl type="search" value={productName} onChange={handleProductSearch} placeholder="Search" className="mr-sm-2" aria-label="Search" />
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
