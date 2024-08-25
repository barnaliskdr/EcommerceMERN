import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Loginpage from '../assets/loginpage.png';
import coverpage from '../assets/coverpage.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.scss";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [error, setError] = useState("");
    const [buttonDisable, setButtonDisable] = useState(true);
    const navigate = useNavigate();

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

    const handleConfirmPassword = (e) => {
      setConfirmPassword(e.target.value);
    }

    const handleSignup = (e) => {
      e.preventDefault();
      if(password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match");
      } else {
        setConfirmPasswordError("");
      }

      if(name === "" || email === "" || phone === "" || password === "" || confirmPassword === "") {
        setError("Please fill in all the fields");
      }
      else{
        setError("");
      }

      if( error === "" && confirmPasswordError === "") {
        console.log("Success");
        console.log("Button is disabled:", buttonDisable);
        navigate("/login");
      }
      else
      {
        setButtonDisable(false);
      }
    }

  return (
    <div  className="d-flex g-10 position-relative align-items-center justify-content-center p-4" >
      <div class="h-30 w-30">
        <img src={Loginpage} alt="milkyway" style={{width:"100%", height:"100%"}} />
      </div>
    <Form classname="p-4" style={{border:"1px solid black", borderColor:"black",padding: "4rem",paddingBottom:"2rem", paddingRight:"6rem"}}>
    <h1 className="translate-middle-y ">Signup</h1>
      <Form.Control
        type="email"
        placeholder="Email Address"
        className = "m-4 mr-5"
        value = {email}
        onChange = {(e) => handleEmail(e)}
      />
      <Form.Control
        type="text"
        placeholder="Name"
        //disabled
        // readOnly
        className = "m-4 mr-5"
        value = {name}
        onChange = {(e) => handleName(e)}
      />
      <Form.Control
        type="Number"
        placeholder="Phone"
        //disabled
        // readOnly
        value = {phone}
        onChange = {(e) => handlePhone(e)}
        className = "m-4 mr-5"
      />
      <Form.Control
        type="password"
        placeholder="Password"
        id="inputPassword5"
        className = "m-4 mr-5"
        onChange = {(e) => handlePassword(e)}
        value = {password}
      />
      
      <Form.Control
        type="password"
        placeholder="Confirm Password"
        id="inputPassword5"
        className = "m-4 mr-5"   
        onChange = {(e) => handleConfirmPassword(e)}
        value = {confirmPassword}
      />
      <div className="text-danger m-4">{error ? "Please Fill All the mandetory fields" : "" }</div>
      <Button className="d-flex m-4 end-0 justify-content-end" variant="primary" disabled={!!error || !!confirmPasswordError} onClick={(e) => handleSignup(e)}>Signup</Button>
      </Form>
    </div>
  )
}

export default Signup;
