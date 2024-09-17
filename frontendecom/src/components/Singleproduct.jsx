import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Singleproduct = (props) => {
    const productId = props.product.id;
    const productName = props.product.name;
    const productPrice = props.product.price;
    const productDescription = props.product.description;
    const productImage = props.product.image;
    const portion = props.product.portion;
    const productCategory = props.product.category;
    const productRating = props.product.rating;
    const productBrand = props.product.brand;
   
  return (
         <Modal
         show={props.visible}
         onHide={() => props.setVisible(false)}
         dialogClassName="modal-90w p-3"
         aria-labelledby="example-custom-modal-styling-title"
       >
         <Modal.Header closeButton classname="justify-content-center">
           <img src={productImage} alt={productName} style={{width:"20rem", height:"20rem"}} />
         </Modal.Header>
         <Modal.Title id="example-custom-modal-styling-title">
             {productName}
           </Modal.Title>
         <Modal.Body>
           <h4>{productPrice}$</h4>
           <p>Portion: {portion}</p>
           <p>Description: {productDescription}</p>
           <p>seller: {productBrand}</p>
         </Modal.Body>
         <div className="d-flex justify-content-center align-items-center w-5 h-4 bg-info text-white m-2 p-2">
              <Button variant="outline-primary text-white">-</Button>
              <span className="px-2">Add To Cart</span>
              <Button variant="outline-primary text-white">+</Button>
        </div>
       </Modal>
  )
}

export default Singleproduct
