import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loginpage from '../assets/loginpage.png';
import "./Login.scss";

const Login = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
  const handleLogin = (e) => {
    
    navigate("/");
  }

  return (
      <div  className="d-flex g-10 position-relative align-items-center justify-content-center p-4" >
      <div class="h-30 w-30">
        <img src={Loginpage} alt="milkyway" style={{width:"100%", height:"100%"}} />
      </div>
   
      <Form classname="p-4" style={{border:"1px solid black", borderColor:"black",padding: "4rem",paddingBottom:"2rem", paddingRight:"6rem"}}>
       <h1 className="translate-middle-y text-center">Login</h1>
      <Form.Control
        type="email"
        placeholder="Email Address"
        className = "m-4 mr-5"
      />
      <Form.Control
        type="text"
        placeholder="Name"
        //disabled
        // readOnly
        className = "m-4 mr-5"
      />
      <Form.Control
        type="password"
        placeholder="Password"
        id="inputPassword5"
        className = "m-4 mr-5"
      />
      <Button className="d-flex m-4 end-0 justify-content-end" variant="primary" onClick={(e) => handleLogin(e)}>Login</Button>
      <div className="text-center mt-3">
        <Link to="/signup" style={{ textDecoration: 'underline', color: '#007bff' }}>
          Don't have an account? Sign up here
        </Link>
      </div>
      </Form>
    </div>
  )
}

export default Login;
