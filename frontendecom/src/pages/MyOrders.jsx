// import React,{useEffect, useState} from 'react';
// import Tab from 'react-bootstrap/Tab';
// import { useDispatch, useSelector } from 'react-redux';
// import Card from 'react-bootstrap/Card';
// import { getAllOrdersByUser } from '../actions/orderActions';
// import Tabs from 'react-bootstrap/Tabs';
// import { Button } from 'react-bootstrap';
// import noOrder from '../assets/noOrder.jpg';
// import CustomModal from '../components/CustomModal';



// const MyOrders = () => {

//     const userId = sessionStorage.getItem('id');
//     const orders = useSelector(state => state.order.orders);
//     console.log("orders from my orders-->",orders);
//     const [key, setKey] = useState('current orders');
//     const [showModal, setShowModal] = useState(false);
//     const [selectedOrder, setSelectedOrder] = useState(null);
//     const dispatch = useDispatch();

//     const orderDetails = (order) => {
//         console.log(order);
//         setSelectedOrder(order);
//         setShowModal(true);
//     };

//     useEffect(() => {
//             console.log("Fetching orders for user ID:", userId);
//             dispatch(getAllOrdersByUser(userId));
//     }, []);


//     const EmptyCartOrder = ({ pic }) => {
//         return (
//             <>
//                 <div className="d-flex flex-column align-items-center w-100">
//                       <img
//                         src={pic}
//                         alt="empty cart"
//                         style={{ width: "20rem", height: "20rem", objectFit: "contain" }}
//                         className="mx-auto"
//                       />
//                       <h2 className="text-center text-primary">No orders found.</h2>
                      
//                 </div>
//             </>
//         )}
//     const CurrentOrders = () => {

//     return(
        
//       <>
//         <div className="d-flex flex-wrap justify-content-center">
//           {Array.isArray(orders) ? (
//             (() => {
//               const currentOrders = orders.filter(order => order.orderStatus !== "DELIVERED");
              
//               // if (currentOrders.length === 0) {
//               //     console.log("No current orders found.");
//               //   return <EmptyCartOrder pic={noOrder} />;
//               // }

//               return currentOrders.map(order => (
//                 <Card 
//                   bg="primary"
//                   style={{ width: '23rem', margin: "2rem" }}
//                   className="card mb-3" 
//                   key={order._id}
//                 >
//                   <Card.Body>
//                     <Card.Title>Order ID: {order._id}</Card.Title>
//                     <Card.Subtitle className="mb-2 text-muted">Status: {order.orderStatus}</Card.Subtitle>
//                     <Card.Text>
//                       Total Price: ${order.total}
//                     </Card.Text>
//                     <Button variant="outline-light" onClick={() => orderDetails(order)}>View Details</Button>
//                   </Card.Body>
//                 </Card>
//               ));
//             })()
//           ):
//           (<EmptyCartOrder pic={noOrder} />)
//           }
//         </div>
//         {showModal && selectedOrder && (
//                         <CustomModal
//                             showModal={showModal}
//                             setShowModal={setShowModal}
//                             orderDetails={selectedOrder}
//                             fullScreen = {true}
//                             showWorkflow = {true}
//                         />
//                     )}
//       </>
//     );
//     }
    

//     const PastOrders = () => {
//         return(
//         <>
//     <div className="d-flex flex-wrap justify-content-center">
//     {Array.isArray(orders) ? (
//       (() => {
//         const pastOrders = orders.filter(order => order.orderStatus === "DELIVERED");
        
//         // if (pastOrders.length === 0) {
//         //   return <EmptyCartOrder pic={noOrder} />;
//         // }

//         return pastOrders.map(order => (
//           <Card 
//             bg="primary"
//             style={{ width: '23rem', margin: "2rem" }}
//             className="card mb-3" 
//             key={order._id}
//           >
//             <Card.Body>
//               <Card.Title>Order ID: {order._id}</Card.Title>
//               <Card.Subtitle className="mb-2 text-muted">Status: {order.orderStatus}</Card.Subtitle>
//               <Card.Text>
//                 Total Price: ${order.total}
//               </Card.Text>
//               <Button variant="outline-light" onClick={() => orderDetails(order)}>View Details</Button>
//             </Card.Body>
//           </Card>
//         ));
//       })
//     ):(
//       <EmptyCartOrder pic={noOrder} />
//     )}
//   </div>
//         {showModal && selectedOrder && (
//                         <CustomModal
//                             showModal={showModal}
//                             setShowModal={setShowModal}
//                             orderDetails={selectedOrder}
//                             fullScreen = {true}
//                             showWorkflow = {true}
//                         />
//                     )}
//         </>
//     );
//     }
    
//   return (
//     <div>
//       <Tabs
//         id="controlled-tab-example"
//         activeKey={key}
//         onSelect={(k) => setKey(k)}
//         className="mb-3"
//       >
//         <Tab eventKey="current orders" title="Current Orders">
//           <CurrentOrders />
//         </Tab>
//         <Tab eventKey="past orders" title="Past Orders">
//           <PastOrders />
//         </Tab>
//       </Tabs>
//     </div>
//   )
// }

// export default MyOrders




import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, Card, Button } from "react-bootstrap";
import { getAllOrdersByUser } from "../actions/orderActions";
import noOrder from "../assets/noOrder.jpg";
import CustomModal from "../components/CustomModal";

const MyOrders = () => {
  const userId = sessionStorage.getItem("id");
  const orders = useSelector((state) => state.order.orders);
  const [key, setKey] = useState("current orders");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      console.log("Fetching orders for user ID:", userId);
      dispatch(getAllOrdersByUser(userId));
    }
  }, [userId, dispatch]);

  const orderDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const EmptyCartOrder = ({ pic }) => (
    <div className="d-flex flex-column align-items-center w-100">
      <img
        src={pic}
        alt="empty cart"
        style={{ width: "20rem", height: "20rem", objectFit: "contain" }}
        className="mx-auto"
      />
      <h2 className="text-center text-primary">No orders found.</h2>
    </div>
  );

  // 🔥 Reusable OrderList component
  const OrderList = ({ filterFn }) => {
    if (!Array.isArray(orders)) return <EmptyCartOrder pic={noOrder} />;

    const filteredOrders = orders.filter(filterFn);

    if (filteredOrders.length === 0) return <EmptyCartOrder pic={noOrder} />;

    return (
      <div className="d-flex flex-wrap justify-content-center">
        {filteredOrders.map((order) => (
          <Card
            bg="primary"
            style={{ width: "23rem", margin: "2rem" }}
            className="card mb-3"
            key={order._id}
          >
            <Card.Body>
              <Card.Title>Order ID: {order._id}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Status: {order.orderStatus}
              </Card.Subtitle>
              <Card.Text>Total Price: ${order.total}</Card.Text>
              <Button
                variant="outline-light"
                onClick={() => orderDetails(order)}
              >
                View Details
              </Button>
            </Card.Body>
          </Card>
        ))}

        {showModal && selectedOrder && (
          <CustomModal
            showModal={showModal}
            setShowModal={setShowModal}
            orderDetails={selectedOrder}
            fullScreen={true}
            showWorkflow={true}
          />
        )}
      </div>
    );
  };

  return (
    <div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="current orders" title="Current Orders">
          <OrderList filterFn={(o) => o.orderStatus !== "DELIVERED"} />
        </Tab>
        <Tab eventKey="past orders" title="Past Orders">
          <OrderList filterFn={(o) => o.orderStatus === "DELIVERED"} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default MyOrders;
