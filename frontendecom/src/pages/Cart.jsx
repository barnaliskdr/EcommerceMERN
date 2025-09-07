import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { placeOrderAction } from '../actions/orderActions';
import { getAllCart, increaseQtyAction, decreaseQtyAction, removeEntireItemFromCartAction, addToCart } from '../actions/cartActions';
import { useSelector, useDispatch } from 'react-redux';
import "../components/Cards.scss";
import emptycartsad from '../assets/emptycart.png';
import { Button, Card } from 'react-bootstrap';
import ItemsTable from '../components/ItemsTable';
// import products from '../../../backend/data/products';

const Cart = () => {

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] = useState('');
  const [contact, setContact] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [showToast,setShowToast] = useState(false);
  // const [cart, setCart] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const cart = useSelector(state => state.cart.itemData);
  const allcart = useSelector(state => state.cart.allCart);
  const renderCart = allcart.filter(cart => cart.status === "active");
  // console.log("cart from cart:", cart);
  console.log("allcart from cart:", allcart);
  const userDetails = useSelector(state => state.login.userData);
  const userId = sessionStorage.getItem("id");
  console.log("userDetails from cart:", userDetails);
  // console.log("cart:", cart);

  useEffect(()=>
  {
    dispatch((getAllCart(userId)));
  },[dispatch]);

  const increaseQty = (product) => {
    // dispatch({ type: 'increaseQty', payload: product });
    // dispatch(increseQtyofProduct(product));
    dispatch(addToCart(product));
    console.log("Increasing quantity for product:", product);
  };

  const decreaseQty = (product) => {  
    dispatch(decreaseQtyAction(product));
    console.log("Increasing quantity for product:", product);
  };

  const removeItemFromCart = (product) => {
    dispatch(removeEntireItemFromCartAction(product));
  };
  const orderTotal = cart.reduce((acc, product) => acc + Math.ceil(product.price * product.count), 0);
  const tax =  Math.ceil(orderTotal * 0.02); // Assuming a tax rate of 5%
  const shippingCharge =  Math.ceil(orderTotal * 0.02); // Assuming a shipping charge of 5%
  
  const placeOrder = () => {
    console.log("Hey:", deliveryAddress);
    if (
      !deliveryAddress ||
      Object.keys(deliveryAddress).length === 0 ||
      !deliveryAddress.address ||
      !deliveryAddress.city ||
      !deliveryAddress.zipCode ||
      !deliveryAddress.country ||
      !deliveryAddress.phone
    ) {
      window.alert("Please fill the delivery address details before placing the order.");
      return;
    }
    console.log("Order placed successfully!");
    // dispatch({ type: 'placeOrder', payload: { orderItems: cart, orderTotal } });
    dispatch(placeOrderAction(cart, orderTotal, userId, deliveryAddress, "Cash on Delivery", tax, shippingCharge,navigate,setShowToast));
  }
  // State for address form fields
  
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    console.log('Address:', address);
    console.log('City:', city);
    console.log('Zipcode:', zipcode);
    console.log('Contact:', contact);
    setDeliveryAddress({
      address: address,
      city: city,
      zipCode: zipcode,
      country: country,
      phone: contact
    })
  }

  return (
   <div
    className="p-5 justify-content-center align-items-center"
    style={{ minHeight: "80vh" }}>
    {allcart.length === 0 ? (
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
    <>
      {renderCart.map((cart) => (
        <React.Fragment key={cart._id}>
          {console.log("cart from cart:", cart)}
          {/* FIX: pass cart.items instead of cart */}
          <ItemsTable
            items={cart.items}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
            removeItemFromCart={removeItemFromCart}
          />

          <Card className="mx-auto my-4" style={{ width: "30rem" }}>
            <Card.Body>
              <Card.Title className="text-center">
                Delivery Address Details
              </Card.Title>
              <form className="cart-form mx-auto" onSubmit={handleAddressSubmit}>
                <div className="form-group m-2">
                  <label htmlFor="address">Delivery Address:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Enter delivery Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="form-group m-2">
                  <label htmlFor="city">City:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="form-group m-2">
                  <label htmlFor="country">Country:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div className="form-group m-2">
                  <label htmlFor="zipcode">Zipcode:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="zipcode"
                    placeholder="zipcode"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                  />
                </div>
                <div className="form-group m-2">
                  <label htmlFor="contact">Contact No:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="contact"
                    placeholder="contact number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="d-flex justify-content-end btn btn-primary m-2"
                >
                  Submit
                </button>
              </form>
            </Card.Body>
          </Card>
        </React.Fragment>
      ))}
    </>
  )}
  {/* FIX: use allcart.length, not cart.length */}
  {renderCart.length > 0 && (
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
