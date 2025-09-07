import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import {BadgeNav} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Badge from "react-bootstrap/Badge";
import Navbar from 'react-bootstrap/Navbar';
import {FaShoppingCart,FaUser} from 'react-icons/fa';
import { GoSignOut } from "react-icons/go";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoMdHeart } from "react-icons/io"; // Import IoMdHeart
import { IoMdNotifications } from "react-icons/io";
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { logout } from '../actions/loginActions';
import { useSelector } from 'react-redux';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useGetProductByNameQuery , useLazyGetProductByNameQuery } from '../slices/productsApiSlice';


const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const userData = useSelector((state) => state.login.userData);
  const userName = sessionStorage.getItem("name");
  const userRole = sessionStorage.getItem("role");
  const allcart = useSelector(state => state.cart.allCart);
  const renderCart = allcart.filter(cart => cart.status === "active");
  const cartItemCount = renderCart.length;

  //const {data: products, isloading, isError} = useGetProductByNameQuery();
  //const [trigger, { data: product, isLoading, isError }] = useLazyGetProductByNameQuery(); // useLazyQuery hook


  const handleProductSearch = (e) => {
    setProductName(e.target.value);
    console.log(productName);
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch(useLazyGetProductByNameQuery(productName));
    if (productName.trim()) {
      // trigger(productName); // Trigger the lazy query
      navigate(`/products/${productName}`);
    }
    
  }

  
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
          <Nav.Link as={Link} to="/">
              <FaHome/>Home
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" style={{ position: 'relative' }}>
                { cartItemCount > 0 && (
                  <Badge
                    badgeContent={cartItemCount}
                    color="error"
                    showZero={false} // hides badge when cart is empty
                  >
                    <FaShoppingCart/>
                  </Badge>
                )}
            </Nav.Link>
            
            { userName!=null ? 
            <>
            <Nav.Link as={Link} to="/login" onClick={handleLogout}>
                <GoSignOut/>Sign Out
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
                <CgProfile/>{userName}
            </Nav.Link>
            <Nav.Link as={Link} to="/wishlist" style={{ position: 'relative' }}><IoMdHeart />WishList</Nav.Link>
            {(userRole === 'admin' || userRole === 'manager') && (
            <>
            <Nav.Link as={Link} to="/admin">
                <FaUser/>Admin Operations
            </Nav.Link>
            </>)}
            </>
            :
            <Nav.Link as={Link} to="/login">
                <FaUser/>Sign In
            </Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>  
    </header>
  )
}

export default Header
