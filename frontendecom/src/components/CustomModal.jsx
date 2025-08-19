import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ItemsTable from './ItemsTable';
import { Table } from 'react-bootstrap';

const CustomModal = (props) => {

  console.log("props: ",props);
 const handleClose = () => props.setShowModal(false);

  return (
    // <Modal
    //   show={props.showModal}
    //   onHide={handleClose}
    //   // aria-labelledby="contained-modal-title-vcenter"
    //   centered
    //   size="lg"
    //   dialogClassName="modal-90w p-3"
    //   aria-labelledby="example-custom-modal-styling-title"
    // >
    <Modal
         show={props.showModal}
         onHide={() => props.setShowModal(false)}
         dialogClassName="modal-90w p-3"
        //  style={{ backgroundColor: 'rgba(44, 120, 219, 0.67)' }}
         fullscreen='sm-down'
         centered
         size="lg"
         aria-labelledby="example-custom-modal-styling-title"
         backdrop={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          {/* {props.orderDetails.orderItems.map((product, idx) => (
            <>
              <p>{product.name}</p>
            </>
          ))
        } */}
        {/* <Table striped hover>
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
            {console.log("orderItems:",props.orderDetails.orderItems)}
            {props.orderDetails.orderItems.map((product, idx) => (
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
          </tbody>
        </Table> */}
        <ItemsTable items={props.orderDetails.orderItems} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">Understood</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CustomModal;
