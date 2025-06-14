import React from 'react'

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loginpage from '../assets/loginpage.png';
import "./Login.scss";

const Adminlogin = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

  const [email, setEmail] = useState("");  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handlePhone = (e) => {
    setPhone(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleLogin = async(e) => {
    try
    {
      console.log("inside try block of signup");
      const resp = await axios.post("http://localhost:5000/api/auth/login", {
        name: name,
        email: email,
        password: password
      })
      console.log("resp-->",resp);
      navigate("/");
    }
    catch(err)
    {
      console.log("error-->",err);
    }
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
        onChange = {(e) => handleEmail(e)}
      />
      <Form.Control
        type="text"
        placeholder="Name"
        //disabled
        // readOnly
        className = "m-4 mr-5"
        onChange = {(e) => handleName(e)}
      />
      <Form.Control
        type="password"
        placeholder="Password"
        id="inputPassword5"
        className = "m-4 mr-5"
        onChange = {(e) => handlePassword(e)}
      />
      <Button className="d-flex m-4 end-0 justify-content-end" variant="primary" onClick={(e) => handleLogin(e)}>Login</Button>
      </Form>
    </div>
  )
}

export default Adminlogin;

