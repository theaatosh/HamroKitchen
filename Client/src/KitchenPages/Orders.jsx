import React, { useContext, useEffect, useState } from "react";
import styles from "../Styles/Kitchen/KitchenPages/Orders.module.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Context/AuthContext";
import { ProcessingOrder } from "../KitchenComponents/kitchenDetails/ProcessingOrder";
import { StoreContext } from "../Context/StoreContext";
import Loading from "../Components/Loading";
import { CompletedFoodOrders } from "../KitchenComponents/CompletedFoodOrders";

export const Orders = () => {
  const { isKitchenOnline } = useAuth();
  const { token, setToken } = useContext(StoreContext);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [processingOrders, setProcessingOrders] = useState([]);
  const [completedFoodOrders, setCompletedFoodOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [processingOrdersLoading, setprocessingOrdersLoading] = useState(false);

  // Fetch new orders
  const fetchCustomerOrders = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5010/api/kitchen/showOrder",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCustomerOrders(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
    //  console.log(customerOrders);
    // const filteredCustomers = customerOrders.reduce((acc, obj) => {
    //   const existing = acc.find(item => item._id === obj.orderDetails._id);
    
    
    //   if (existing) {
    //     existing.orderItems.push({
    //       foodItem: obj.orderItemName,
    //       quantity: obj.quantity,
    //     });
    //   } else {
    //     acc.push({
    //      ...obj,
    //       orderItems: [
    //         {
    //           foodItem: obj.orderItemName,
    //           quantity: obj.quantity,
    //         },
    //       ],
    //     });
    //   }
      
    //   return acc;
    // }, []);
    // console.log(filteredCustomers);
    

  // Fetch processing orders
  const fetchProcessingOrders = async () => {
    setprocessingOrdersLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5010/api/kitchen/processingOrder",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProcessingOrders(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setprocessingOrdersLoading(false);
    }
  };

  // Fetch completed orders
  const fetchCompletedFoodOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5010/api/kitchen/showCompletedOrder",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCompletedFoodOrders(res.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Accept order
  const statusHandlerAcc = async (orderId) => {
    try {
      await axios.post(
        "http://localhost:5010/api/kitchen/acceptOrder",
        { orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCustomerOrders();
      fetchProcessingOrders();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Reject order
  const statusHandlerRej = async (orderId) => {
    try {
      await axios.post(
        "http://localhost:5010/api/kitchen/rejectOrder",
        { orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCustomerOrders();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCustomerOrders();
      fetchProcessingOrders();
      fetchCompletedFoodOrders();
    } else {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
      } else {
        toast.error("No token found");
      }
    }
  }, [token]);

  return (
    <>
      <div className={styles.main_order_container}>
        <ToastContainer />
        {!isKitchenOnline ? (
          <h2 className={styles.offline_order}>
            You are currently offline.
            <br /> Please go online to receive orders.
          </h2>
        ) : (
          <>
            <h2>New Order Request</h2>
            <div className={styles.topic}>
              <p>S.N</p>
              <p>Customer Name</p>
              <p>Food Items</p>
              <p>Contact No</p>
              <p>Action</p>
            </div>
            <div className={styles.inner_container}>
              <div className={styles.order_list}>
                {isLoading ? (
                  <Loading />
                ) : customerOrders.length > 0 ? (
                  customerOrders.map((order, index) => (
                    <React.Fragment key={order.orderDetails._id}>
                      <div className={styles.order_card}>
                        <h3>#{index + 1}</h3>
                        <p>
                          {order.orderDetails.deliveryInfo.firstName}{" "}
                          {order.orderDetails.deliveryInfo.LastName}
                        </p>
                        <ul>
                          {order.items.map((elem, idx) => (
                            <li key={idx}>
                              {elem.orderItemName} - {elem.quantity}
                            </li>
                          ))}
                        </ul>
                        <p>{order.orderDetails.deliveryInfo.phoneNumber}</p>
                        <div className={styles.btns}>
                          <button
                            className={styles.accept}
                            onClick={() =>
                              statusHandlerAcc(order.orderDetails._id)
                            }
                          >
                            Accept
                          </button>
                          <button
                            className={styles.reject}
                            onClick={() =>
                              statusHandlerRej(order.orderDetails._id)
                            }
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                      <hr />
                    </React.Fragment>
                  ))
                ) : (
                  <div className={styles.no_orders}>
                    <h2>No new order request !!</h2>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Processing orders */}
      <ProcessingOrder
        processingOrders={processingOrders}
        processingOrdersLoading={processingOrdersLoading}
        fetchCustomerOrders={fetchCustomerOrders}
        fetchProcessingOrders={fetchProcessingOrders}
        fetchCompletedFoodOrders={fetchCompletedFoodOrders}
      />

      {/* Completed orders */}
      <CompletedFoodOrders completedFoodOrders={completedFoodOrders} />
    </>
  );
};
