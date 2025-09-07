import React from 'react';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { MdDelete } from "react-icons/md";

const ItemsTable = (props) => {

  let i=0;
  console.log("table called",i++);
  const items = props.items ? props.items : props.orderItems;
  console.log("props  from ItemsTable-->",props);
  console.log("items from ItemsTable-->",items);

  const increaseQty = (product) => {
    props.increaseQty(product);
  };

  const decreaseQty = (product) => {
    props.decreaseQty(product);
  };

  return (
    <div>
      <Table striped hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Product Name</th>
              <th></th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Remove</th>
              <th>Wight</th>
            </tr>
          </thead>
          <tbody>
            {items.map((product, idx) => (
              <tr key={product._id || idx}>
                <td>{idx + 1}</td>
                <td>{product.name}</td>
                <td>
                  <img style={{ width: "7rem", height: "5rem" }} src={product.image} alt={product.name} />
                </td>
                <td>{Math.ceil(product.price * product.count)}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="btn-group btn-outline-primary" role="group">
                      <button className="btn btn-sm" onClick={()=> decreaseQty(product)}>-</button>
                      <span className="px-3 border-primary fw-bold">{product.count}</span>
                      <button className="btn  btn-sm" onClick={()=> increaseQty(product)}>+</button>
                    </div>
                  </div>
                </td>
                <td>
                  <span onClick={() => props.removeItemFromCart(product)} style={{ cursor: "pointer" }}>
                    <MdDelete />
                  </span>
                </td>
                {console.log("product.portion:", product.portion)}
                {console.log("product.count:", product.count)}
                <td>{product.portion} * {product.count}</td>
              </tr>
            ))}
          </tbody>
      </Table>
    </div>
  )
}

export default ItemsTable;
