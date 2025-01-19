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

  //order request fetch garne
  const fetchCustomerOrders = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5010/api/kitchen/showOrder",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCustomerOrders(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      console.log("hello");

      setIsLoading(false);
    }
  };

  //processing order fetch garne
  const fetchProcessingOrders = async () => {
    setprocessingOrdersLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5010/api/kitchen/processingOrder",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProcessingOrders(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setprocessingOrdersLoading(false);
    }
  };

  // completed orders fetch garne
  const fetchCompletedFoodOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5010/api/kitchen/showCompletedOrder",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCompletedFoodOrders(res.data);
    } catch (err) {
      toast.error(err.message);
    }
  };

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

  // console.log(customerOrders);
  const filteredCustomers = customerOrders.reduce((acc, obj) => {
    const existing = acc.find((item) => item._id === obj._id);

    if (existing) {
      existing.orderItems.push({
        foodItem: obj.orderItemName,
        quantity: obj.quantity,
      });
    } else {
      acc.push({
        ...obj,
        orderItems: [
          {
            foodItem: obj.orderItemName,
            quantity: obj.quantity,
          },
        ],
      });
    }

    return acc;
  }, []);

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
                ) : filteredCustomers.length > 0 ? (
                  filteredCustomers.map((order, index) => (
                    <React.Fragment key={order.orderDetails._id}>
                      <div className={styles.order_card}>
                        <h3>#{index + 1}</h3>
                        <p>{order.orderDetails.deliveryInfo.firstName}</p>
                        <ul>
                          {order.orderItems.map((elem, index) => {
                            return (
                              <li key={index}>
                                {elem.foodItem}-{elem.quantity}
                              </li>
                            );
                          })}
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
                        {/* <select onChange={(event)=>statusHandler(event,order._id)} */}
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

      {/* processing order ko component  */}
      <ProcessingOrder
        processingOrders={processingOrders}
        processingOrdersLoading={processingOrdersLoading}
        fetchCustomerOrders={fetchCustomerOrders}
        fetchProcessingOrders={fetchProcessingOrders}
        fetchCompletedFoodOrders={fetchCompletedFoodOrders}
      />

      {/* completed order ko component  */}
      <CompletedFoodOrders completedFoodOrders={completedFoodOrders} />
    </>
  );
};
