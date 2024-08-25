import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Login.scss";

const Login = () => {
   const navigate = useNavigate();
  const handleLogin = (e) => {
    navigate("/");
  }

  return (
    <div  className="formclass">
       <Form className="align-items-center justify-content-center p-4 h-20 w-40">
      <Form.Control
        type="email"
        placeholder="Email Address"
        className = "m-4"
        style={{ width:"30%"}}
      />
      <Form.Control
        type="text"
        placeholder="Name"
        //disabled
        // readOnly
        className = "m-4"
        style={{ width:"30%"}}
      />
      <Form.Control
        type="password"
        placeholder="Password"
        id="inputPassword5"
        className = "m-4"
        style={{ width:"30%"}}
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
