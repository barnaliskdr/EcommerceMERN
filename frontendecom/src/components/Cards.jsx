// import React,{useState, useEffect} from 'react'
// import Card from 'react-bootstrap/Card';
// import ListGroup from 'react-bootstrap/ListGroup';
// import { Container, Row, Col, Button } from "react-bootstrap";
// import Singleproduct from './Singleproduct';
// import { getProductDetails } from '../services/Homeservices';
// import { Mockdata } from '../Mockdata';


// const Cards = ({productType}) => {
//     const [visible, setVisible] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [rating, setRating] = useState(0);
//     const [products, setProducts] = useState([]);
//     const viewDetailsHandle = (product) => {
//         setSelectedProduct(product);
//         setVisible(true);
//       }
//       useEffect(() => {
//         // const fetchProducts = async () => {
//         //   try {
//         //     const productDetails = await getProductDetails();
//         //     setProducts(productDetails);
//         //   } catch (error) {
//         //     console.log(error);
//         //   }
//         // };
//         // fetchProducts();
//         setProducts(Mockdata);
//       }, []);
//       const specifyTypes = (productType) => {

//         console.log(productType);
//         switch(productType) {
//           case "Fruits":
//             return products.filter((product) => product.category === "Fruits");
//           case "Vegetables":
//             return products.filter((product) => product.category === "Vegetables");
//           case "Dairy":
//             return products.filter((product) => product.category === "Dairy");
//           case "Bakery":
//             return products.filter((product) => product.category === "Bakery");
//           case "Spices":
//             return products.filter((product) => product.category === "Spices");
//           case "Frozen":
//             return products.filter((product) => product.category === "Frozen");
//           case "Grain":
//             return products.filter((product) => product.category === "Grain");
//           default:
//             return products;
//         }
//       };

//       const filteredProducts = specifyTypes(productType);
//   return (
//     <>
//     {console.log(filteredProducts)}
//         {/* {products.map((product)=>{ */}
//         {filteredProducts.map((product) => (
//           <Container className="d-grid gap-4 d-flex flex-row justify-content-center flex-wrap m-3">
//           <Card style={{ width: '18rem' }} className="p-2">
//             <Card.Img variant="top" src={product.image}></Card.Img>
//                  <Card.Body>
//               <Card.Title>{product.name}</Card.Title>
//               <Card.Text>
//                 Product Type: {product.category}
//               </Card.Text>
//               <Card.Text>
//                 Stock Available: {product.quantity}
//               </Card.Text>
//               <Card.Text>
//                 Price: {product.price}
//               </Card.Text>
//               <Card.Text>
//                 Company: {product.brand}
//               </Card.Text>
//               {/* <Card.Text>
//                 Rating:
//                 <span className="RatingStyle">
//                 <Rating readOnly style={{ maxWidth: 20}} value={rating} onChange={setRating} itemStyles={myStyles} /></span>
//               </Card.Text> */}
//             </Card.Body>
//             <Button className="bg-light border border-info text-dark m-2" onClick= {()=>viewDetailsHandle(product)}>View Details</Button>
//             <div className="d-flex justify-content-center align-items-center w-5 h-4 bg-info text-white m-3">
//               <Button variant="outline-primary text-white">-</Button>
//               <span className="px-2">Add To Cart</span>
//               <Button variant="outline-primary text-white">+</Button>
//             </div>
//           </Card>
//         </Container>
//         ))}
          
//       {selectedProduct && <Singleproduct product={selectedProduct} setVisible={setVisible} visible={visible}/>}
        
//       </>
//   )
// }

// export default Cards

import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Container, Button } from 'react-bootstrap';
import './Cards.scss';
import Singleproduct from './Singleproduct';
// import { Mockdata } from '../Mockdata';
import { useDispatch } from 'react-redux';
import { useGetProductsQuery } from '../slices/productsApiSlice';
// import { useGetAddToCartQuery } from '../slices/cartSlices';
import Rating from './Rating';
import { addToCart, removeFromCart } from '../slices/cartSlices';

const Cards = ({ productType }) => {
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productData, setProductData] = useState([]); 
  const {data: products, isloading, isError} = useGetProductsQuery(); //reduxtoolkit
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const dispatch = useDispatch();

  const viewDetailsHandle = (product) => {
    setSelectedProduct(product);
    setVisible(true);
  };

  const handleAddToCart = (product) => {
    console.log("called Add to cart",product);
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (product) => {
    console.log("called Remove from cart",product);
    dispatch(removeFromCart(product));
  };

  useEffect(() => {
    if (products) {
      console.log('Fetched products:', products);
    }
  }, [products]); 

  const specifyTypes = (productType) => {

    if (!products) return [];

    switch (productType) {
      case 'Fruits':
        return products.filter((product) => product.category === 'Fruits');
      case 'Vegetables':
        return products.filter((product) => product.category === 'Vegetables');
      case 'Dairy':
        return products.filter((product) => product.category === 'Dairy');
      case 'Bakery':
        return products.filter((product) => product.category === 'Bakery');
      case 'Spices':
        return products.filter((product) => product.category === 'Spices');
      case 'Frozen':
        return products.filter((product) => product.category === 'Frozen');
      case 'Grain':
        return products.filter((product) => product.category === 'Grain');
      case 'Dairy Alternatives':
        return products.filter(
          (product) => product.category === 'Dairy Alternatives'
        );
      default:
        return products;
    }
  };

  const filteredProducts = specifyTypes(productType);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`mx-1 ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </Button>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      <Container className="d-grid gap-4 d-flex flex-row justify-content-center flex-wrap m-3">
        {currentItems.map((product) => (
          <Card style={{ width: '18rem' }} className="p-2" key={product.id}>
            <Card.Img variant="top" src={product.image} className="card-img-custom"></Card.Img>
            <Card.Body style={{height: "4rem"}}>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>Price: {product.price}$</Card.Text>
              <Card.Text as="div">
                <Rating value={product.rating}/>
              </Card.Text>
            </Card.Body>
            <Button
              className="bg-light border border-info text-dark m-1"
              onClick={() => viewDetailsHandle(product)}
            >
              View Details
            </Button>
            <div className="d-flex justify-content-center align-items-center w-5 h-4 bg-info text-white m-2">
              <Button variant="outline-primary text-white" onClick={() => handleRemoveFromCart(product)}>-</Button>
              <span className="px-2">Add To Cart</span>
              <Button variant="outline-primary text-white" onClick={() => handleAddToCart(product)}>+</Button>
            </div>
          </Card>
        ))}
      </Container>

      <div className="d-flex justify-content-center my-4">
        <Button
          variant="primary"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="mx-2"
        >
          Previous
        </Button>
        {renderPageNumbers()}
        <Button
          variant="primary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="mx-2"
        >
          Next
        </Button>
      </div>

      {selectedProduct && (
        <Singleproduct
          product={selectedProduct}
          setVisible={setVisible}
          visible={visible}
        />
      )}
    </>
  );
};

export default Cards;
