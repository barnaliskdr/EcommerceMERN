import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { completeHumanTask } from '../actions/workflowActions'; // Adjust the import path as necessary
import { getAllOrdersAction } from '../actions/orderActions'; // Adjust the import path as necessary
import Nav from 'react-bootstrap/Nav';
import CustomModal from '../components/CustomModal';
import { io } from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from "react-toastify";

const UpdateStatus = () => {
    const userData = useSelector((state) => state.login.userData);
   
    const dispatch = useDispatch();
    const allOrders = useSelector((state) => state.order.orders); // Assuming you have a reducer that manages orders
    // console.log("allOrders from-->",allOrders);

    useEffect(() => {
        dispatch(getAllOrdersAction()); // Call the action creator as a function

        const socket = io("http://localhost:5000");

    // 🔔 Listen for "newOrder" event
    socket.on("newOrder", (order) => {
        console.log("🔔 New order received:", order);
        toast.success(`New Order: ${order._id}`, {
            position: "right-top",
            autoClose: 5000});
        dispatch(getAllOrdersAction());
    });

    return () => {
      socket.disconnect(); // cleanup on unmount
    };
    }, []);

    const [activeTab, setActiveTab] = useState('Pending');

    const statusList = [
        'Pending',
        'SHIPPED',
        'OUT_FOR_DELIVERY',
        'DELIVERED',
    ];

    const handleSelect = (selectedKey) => {
        setActiveTab(selectedKey);
    };

    // Best practice is to create a separate, reusable Modal component and import/use it here.
    // This keeps your code modular and maintainable, especially if you use Modal in multiple places.
    // Example: import OrderDetailsModal from '../components/OrderDetailsModal';

    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const showDetails = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedOrder(null);
    };

    const cancelOrder = async (order) => {
        console.log("order in cancelOrder", order);
        // dispatch(deleteOrder(order._id));
        const response = await fetch(`http://localhost:5000/api/orders/deleteorder`, {
            method: 'DELETE',
            body: JSON.stringify({ orderId: order._id }),
            headers: {  
                'Content-Type': 'application/json'  
            }
        });
    }

    const completeStatus = async(order) => {
        let signal,taskTopic;
        console.log("order in completeStatus", order);
        console.log("processInstanceId in completeStatus", order.processInstanceId);
        try{
            // const response = completeHumanTask(processId);
            //  dispatch(placeOrderAction(cart, orderTotal, userDetails.id, deliveryAddress, "Cash on Delivery", tax, shippingCharge,navigate,setShowToast));
            if(order.orderStatus === "Pending") {
                signal = "SHIPPED";
                taskTopic = "update-status-to-shipped";
            }
            if(order.orderStatus === "SHIPPED") {
                signal = "OUT_FOR_DELIVERY";
                taskTopic = "update-status-to-out-for-delivery";
            }
            if(order.orderStatus === "OUT_FOR_DELIVERY") {
                signal = "DELIVERED";
                taskTopic = "update-status-to-delivered";
            }
            
            // dispatch(completeHumanTask(order.processInstanceId, signal));
            //dispatch(updateStatusToDB(processId));
            console.log("signal in completeStatus", signal);
            console.log("taskTopic in completeStatus", taskTopic);
            const response = await fetch(`http://localhost:5000/api/workflow/tasks/${order.processInstanceId}/completeTask`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                     body: JSON.stringify({
                        variables: {
                            signal: { value: signal, type: "String" }
                        }
                    }), // Send the signal in the request body
                }
            );
            console.log("Response from completeStatus:", response);

            const updateStatusResponse = await fetch(`http://localhost:5000/api/workflow/tasks/${taskTopic}/${order.processInstanceId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: order._id,
                    orderStatus: signal
                })
            });

            console.log("Response from updateStatusToDB:", updateStatusResponse);
            dispatch(getAllOrdersAction());
        }
        catch(error) {
            console.error("Error completing status:", error);
        }   

        return null;
    }

    const handleStatusChange = (orderId, newStatus) => {
        // Here you would update the order status in your backend or state
        alert(`Order ${orderId} status changed to ${newStatus}`);
    };

    return (
        <div>
            <Nav fill variant="tabs" activeKey={activeTab} onSelect={handleSelect}>
                {statusList.map((status) => (
                    <Nav.Item key={status}>
                        <Nav.Link eventKey={status}>{status}</Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
            <div className="d-flex flex-wrap justify-content-center mt-4 cpace-between">
                {/* <div className="mt-4"> */}
                {console.log("allOrders from-->", allOrders)}
                {allOrders && allOrders.length > 0 ? (
                    console.log("Hello"),
                    allOrders
                        .filter((order) => order.orderStatus === activeTab)
                        .map((order) => (
                            <div key={order._id || order.id}>
                            <Card
                            bg="primary"
                            // border="info"
                            // text= "light"
                            style={{ width: '23rem', margin: "2rem" }}
                            className="card mb-3">
                                <div className="card-body">
                                    <h5>OrderStatus: {order.orderStatus}</h5>
                                    <p className="card-title">Order Id: {order._id || order.id}</p>
                                    
                                    <div className="d-flex justify-content-between">
                                         <Button variant="outline-light" onClick={() => showDetails(order)}>check Details</Button>
                                         {order.orderStatus !== "DELIVERED" && (
                                            <>
                                         <Button variant="outline-light" onClick={() => completeStatus(order)}>Complete  Task</Button>
                                         <Button variant="outline-light" onClick={() => cancelOrder(order)}>Cancel Order</Button>
                                         </>)}
                                    </div>
                                    {/* <div>
                                        <label htmlFor={`status-${order._id || order.id}`}>Change Status: </label>
                                        <select
                                            id={`status-${order._id || order.id}`}
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order._id || order.id, e.target.value)}
                                        >
                                            {statusList.map((status) => (
                                                <option key={status} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </div> */}
                                </div>
                            </Card>
                        </div>
                        ))
                ) : (
                    <div>No orders in this status.</div>
                )}
                {/* {allOrders &&
                    allOrders.filter((order) => order.status === activeTab).length === 0 && (
                        <div>No orders in this status.</div>
                    )} */}
            </div>
           
            {showModal && selectedOrder && (
                <CustomModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    orderDetails={selectedOrder}
                />
            )}
        </div>
    );
}


export default UpdateStatus; // Export the UpdateStatus component as the default exportadut 