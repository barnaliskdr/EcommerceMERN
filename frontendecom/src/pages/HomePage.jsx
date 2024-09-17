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
  const cart = useSelector((state) => state.cart.cartProducts);
  const quantity = useSelector((state) => state.cart.cartTotalQuantity);
  const price = useSelector((state) => state.cart.cartTotalPrice);
  console.log("Current cart state:", cart);
  console.log("Current quantity state:", quantity);
  console.log("Current price state:", price);
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
  const[grain,setGrain] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(0);
  
    // dispatch(getProductDetails);
    // useEffect(() => {
    //   const fetchProducts = async () => {
    //     try {
    //       const productDetails = await getProductDetails();
          
    //       console.log('API Response:', productDetails); // Log the API response
    //       console.log(typeof(productDetails));
    //       // console.log(typeof("productArray--",[productsArray]));
    //       // Ensure productDetails is an array
    //       // const productsArray = Array.isArray(productDetails) ? productDetails : [productDetails];
    //       // console.log('Products Array:', productsArray); // Log the converted array
  
    //       setProducts(productDetails); // Set the state with the fetched product details
    //     } catch (error) {
    //       console.error('Error fetching product details:', error);
    //     }
    //   };
  
    //   fetchProducts();
    // }, []);

    // useEffect(() => {
    //   setProducts(Mockdata); 
    // },[])
      
  return (
    <div>
      {/* {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>Home Page</h1>
        </div>
      )} */}
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
        {/* Add more Accordion items for other categories */}
      </Accordion>
      {/* {selectedProduct && <Singleproduct product={selectedProduct} setVisible={setVisible} visible={visible} />} */}
    
   {/* <Container className="d-grid gap-4 d-flex justify-content-center flex-wrap m-3">
       {console.log(products)}
         {products.map((product)=>{ */}

    {/* //       return(
    //       <div>
    //       <Card style={{ width: '18rem' }} className="p-2">
    //         <Card.Img variant="top" src={product.image}></Card.Img>
    //              <Card.Body>
    //           <Card.Title>{product.name}</Card.Title>
    //           <Card.Text>
    //             Product Type: {product.category}
    //           </Card.Text>
    //           <Card.Text>
    //             Stock Available: {product.quantity}
    //           </Card.Text>
    //           <Card.Text>
    //             Price: {product.price}
    //           </Card.Text>
    //           <Card.Text>
    //             Company: {product.brand}
    //           </Card.Text>
    //           {/* <Card.Text>
    //             Rating:
    //             <span className="RatingStyle">
    //             <Rating readOnly style={{ maxWidth: 20}} value={rating} onChange={setRating} itemStyles={myStyles} /></span>
    //           </Card.Text> 
            </Card.Body>
    //         <Button className="bg-light border border-info text-dark m-2" onClick= {()=>viewDetailsHandle(product)}>View Details</Button>
    //         <div className="d-flex justify-content-center align-items-center w-5 h-4 bg-info text-white m-3">
    //           <Button variant="outline-primary text-white">-</Button>
    //           <span className="px-2">Add To Cart</span>
    //           <Button variant="outline-primary text-white">+</Button>
    //         </div>
    //       </Card>
    //       </div>) </Card.Body>
    //        })}
    //   {selectedProduct && <Singleproduct product={selectedProduct} setVisible={setVisible}visible={visible}/>}
    //   </Container> */}
     </div>
  )
}

export default HomePage;
