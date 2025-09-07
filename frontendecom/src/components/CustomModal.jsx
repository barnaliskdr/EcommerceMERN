import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ItemsTable from './ItemsTable';
import { Table } from 'react-bootstrap';
import { Box } from "@mui/material";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


const CustomModal = (props) => {

  console.log("props: ",props);
 const handleClose = () => props.setShowModal(false);

 function prettifyStatus(status) {
  if (!status) return '';
  if (status === 'Pending') return 'Order Placed';
  if (status === 'OUT_FOR_DELIVERY') return 'Out for Delivery';
  if (status === 'SHIPPED') return 'Shipped';
  if (status === 'DELIVERED') return 'Delivered';
  // fallback for any other status
  return status
    .toLowerCase()
    .split('_')
    .map((word, idx) => idx === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word)
    .join(' ');
}

  const steps = [
  'Order Placed',
  'Shipped',
  'Out for Delivery',
  'Delivered'
  ];

  let currentStatus = props.orderDetails ? props.orderDetails.orderStatus : null;
  currentStatus = prettifyStatus(currentStatus);

  console.log("currentStatus:", currentStatus);
  let activeStep = steps.indexOf(currentStatus);

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
         fullscreen={props.fullScreen || 'sm-down'} 
         centered
         size="lg"
         aria-labelledby="example-custom-modal-styling-title"
         backdrop={false}
    >
      <Modal.Header style={{ backgroundColor: '#0d6efd'}}closeButton>
        <Modal.Title>Order Details</Modal.Title>
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
        <h2>Current Status</h2>
        <Box sx={{ padding: '2rem', backgroundColor:"pink", borderRadius:"8px", marginTop:"2rem", marginBottom:"2rem" }}>
        {props.showWorkflow &&  (
          <>
             <Box sx={{ width: '100%' }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </>
        )}
        </Box>
        <Box>
          <h5>Delivery Address:</h5>
          <p>{props.orderDetails.DeliveryAddress.address}, {props.orderDetails.DeliveryAddress.city}, {props.orderDetails.DeliveryAddress.country}</p>
          <h5>Total Amount:</h5>
          <p>${props.orderDetails.total}</p>
          <span><h5>Payment Method:</h5><p>{props.orderDetails.paymentMethod}</p></span>
          
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CustomModal;
