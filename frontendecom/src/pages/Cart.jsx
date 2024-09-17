import React from 'react';
import Table from 'react-bootstrap/Table';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { useSelector } from 'react-redux';
import "../components/Cards.scss";
// import products from '../../../backend/data/products';

const Cart = () => {
    //const cartProducts = useSelector((state)=> state.cart.cartProducts);
    const { cartProducts, cartTotalQuantity, cartTotalPrice } = useSelector((state) => state.cart);
    console.log(cartTotalQuantity);
    console.log(cartProducts);

    
  return (
    <div className="p-5">
    <Table striped hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Product Name</th>
          <th></th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Wight</th>
        </tr>
      </thead>
      <tbody>
        {cartProducts.map((product) => (
            <tr>
            <td>{}</td>
            <td>{product.name}</td>
            <td>
                 <img style={{width: "7rem", height: "5rem"}} src={product.image}></img>
            </td>
            <td>{product.price * product.cartTotalQuantity}</td>
            <td>{product.cartTotalQuantity}</td>
            <td>{product.portion} * {product.cartTotalQuantity}</td>
          </tr>
        ))}
        
        {/* <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr> */}
        {/* <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr> */}
      </tbody>
    </Table>
    </div>
  )
}

export default Cart
