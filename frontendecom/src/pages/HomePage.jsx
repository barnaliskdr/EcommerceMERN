import React,{useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Container, Row, Col, Button } from "react-bootstrap";
import rice from "../assets/rice.png";
import { getProductDetails } from "../services/Homeservices";
import Singleproduct from '../components/Singleproduct';
import "./HomePage.scss";
import { Mockdata } from '../Mockdata';
import Cards from '../components/Cards';
import { useSelector } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import { Rating, ThinRoundedStar, ThinStar } from '@smastrom/react-rating';
// import { useGetProductsQuery } from '../slices/productsApiSlice'; //reduxtoolkit
// import { useDispatch } from 'react-redux';

const HomePage = () => {
  // const cart = useSelector((state) => state.cart.cartProducts);
  // const quantity = useSelector((state) => state.cart.cartTotalQuantity);
  //const price = useSelector((state) => state.cart.cartTotalPrice);
  // console.log("Current cart state:", cart);
  // console.log("Current quantity state:", quantity);
  // console.log("Current price state:", price);
  // const {data: products, isloading, isError} = useGetProductsQuery(); //reduxtoolkit
  const myStyles = {
    itemShapes: ThinStar,
    itemStrokeWidth: 2,
    activeFillColor: 'green',
    activeStrokeColor: '#99F6E4',
    inactiveFillColor: 'red',
    inactiveStrokeColor: 'red'
  }
  // const dispatch = useDispatch();
  //const [products, setProducts] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const [dairy, setDairy] = useState([]);
  const [bakery, setBakery] = useState([]);
  const [spices, setSpices] = useState([]);
  const [frozen,setFrozen] = useState([]);
  const [grain,setGrain] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(0);
  
  const userData = useSelector((state) => state.login);
  console.log("User Data:", userData);
      
  return (
    <div>
      {/* {userData ? <h1>Welcome {userData}</h1>: <h1>Please Login</h1>} */}
      <Accordion className="homeAccordian" defaultActiveKey={['0', '1', '2', '3']}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Fruits</Accordion.Header>
          <Accordion.Body>
            <Cards productType="Fruits"/>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Vegetables</Accordion.Header>
          <Accordion.Body>
            <Cards productType="Vegetables"/>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Dairy</Accordion.Header>
          <Accordion.Body>
            <Cards productType="Dairy"/>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Dairy Alternatives</Accordion.Header>
          <Accordion.Body>
            <Cards productType="Dairy Alternatives"/>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
     </div>
  )
}

export default HomePage;
