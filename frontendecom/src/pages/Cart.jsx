import React,{useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { useSelector } from 'react-redux';
import "../components/Cards.scss";
import emptycartsad from '../assets/emptycart.png';
import { Button } from 'react-bootstrap';
// import products from '../../../backend/data/products';

const Cart = () => {

    let sum = 0;
    
    // const cartProducts = useSelector((state)=> state.cart.itemData);
    //console.log("cartProds",cartProducts);
    // const { cartProducts, cartTotalQuantity, cartTotalPrice } = useSelector((state) => state.cart);
    // console.log(cartTotalQuantity);
    // console.log(cartProducts);

    // const state = useSelector((state) => state);
    // const cartItems = useSelector((state) => state.cart.itemData);
    // console.log('Redux state:', state);
    // console.log("cart Items:", cartItems);

    const cart = useSelector(state => state.cart.itemData);
    console.log("cart:", cart);
  //   useEffect(() => {
  //   console.log("cartProducts:", cart);
  // }, []);

//   return (
//   <div>
//     <pre>{JSON.stringify(cart, null, 2)}</pre>
//   </div>
// )
  const orderTotal = cart.reduce((acc, product) => acc + Math.ceil(product.price * product.count), 0);
  const placeOrder = () => {
    console.log("Order placed successfully!");
    // Here you can add the logic to place the order, e.g., sending a request to the server
  }

  return (
    <div className="p-5 justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      {cart.length === 0 ? (
        <div className="d-flex flex-column align-items-center w-100">
          <img
            src={emptycartsad}
            alt="empty cart"
            style={{ width: "20rem", height: "20rem", objectFit: "contain" }}
            className="mx-auto"
          />
          <h2 className="text-center text-primary">Your cart is empty.</h2>
          <p className="text-center info text-primary">
            Looks like you have not yet added anything to your cart.
          </p>
        </div>
      ) : (
        <Table striped hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Product Name</th>
              <th></th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Wight</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product, idx) => (
              <tr key={product._id || idx}>
                <td>{idx + 1}</td>
                <td>{product.name}</td>
                <td>
                  <img style={{ width: "7rem", height: "5rem" }} src={product.image} alt={product.name} />
                </td>
                <td>{Math.ceil(product.price * product.count)}</td>
                <td>{product.count}</td>
                <td>{product.portion} * {product.count}</td>
              </tr>
            ))}
            {/* <tr>
              <td colSpan={6} className="text-end fw-bold">Order Total: {orderTotal}</td>
            </tr> */}
          </tbody>
        </Table>
      )}
      
        {cart.length > 0 && (
        <div className="d-flex justify-content-between">
         <Button onClick={placeOrder}>Place Order</Button>
          <div className="text-end fw-bold">
            <h3>Order Total: ${orderTotal}</h3>
          </div>
        </div>
      )}
    </div>
  )
}
export default Cart;
