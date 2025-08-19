import React from 'react';
import { Table } from 'react-bootstrap';

const ItemsTable = (props) => {

  let i=0;
  console.log("table called",i++);
  const items = props.items ? props.items : props.orderItems;
  console.log("props  from ItemsTable-->",props);
  console.log("items from ItemsTable-->",items);

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
                <td>{product.count}</td>
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
