import React, { useContext, useEffect, useState } from 'react'
import styles from '../../Styles/Kitchen/KitchenPages/ProcessingOrders.module.css';
import Loading from '../../Components/Loading';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../Context/StoreContext';
export const ProcessingOrder = ({processingOrders,processingOrdersLoading,fetchCustomerOrders,fetchProcessingOrders,fetchCompletedFoodOrders}) => {
  const {token,setToken}=useContext(StoreContext);
 
  const handleCompleted=async(e,orderId)=>{
    if(e.target.value==='completed')
    {
    try{      
      
      const response=await axios.post('http://localhost:5010/api/kitchen/completeOrder',{orderId},{headers:{'Authorization':`Bearer ${token}`}})
      console.log(response);
      
      fetchCustomerOrders(); 
      fetchProcessingOrders();
      fetchCompletedFoodOrders();
    }
    catch(error)
    {
      toast.error(error.message);
    }
  }
}
useEffect(() => {
  if (token) {
  
    fetchCustomerOrders();
    fetchProcessingOrders();
  } 
  else 
  {
  const savedToken = localStorage.getItem("token");
    if (savedToken) {
    setToken(savedToken);
    } else {
      toast.error("No token found");
    }
  }
}, [token]);
  return (
   <div className={styles.processing_order_con}>
    <h2>Processing Order</h2>
    <div className={styles.processing_order_inner_con}>
    <div className={styles.topic}>
              <p>S.N</p>
              <p>Customer Name</p>
              <p>Food Items</p>
              <p>Contact No</p>
              <p>Status</p>
            </div>
            <div className={styles.inner_container}>
            <div className={styles.order_list}>
              {processingOrdersLoading&&<Loading/>}
                {processingOrders.length>0 ? processingOrders.map((order,index)=>(
                  <React.Fragment key={order._id}>
                      <div className={styles.order_card} >
                        <h3>#{index+1}</h3>
                        <p>{`${order.deliveryInfo.firstName} ${order.deliveryInfo.lastName}`}</p>
                        <ul>
                            {order.orderedItem.map((item,index)=>(
                              <li key={index}>
                                    {item.name}-{item.quantity}
                                </li>
                            ))}
                        </ul>
                        <p>{order.deliveryInfo.phoneNumber}</p>
                      <select onChange={(event)=>handleCompleted(event,order._id)}
                        className={styles.orderStatus}>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                      </select>
                        
                 </div>
                 <hr />
                 </React.Fragment>     
                )
                ):<div className={styles.no_orders}>
                <h2>No processing orders !!</h2>
                </div>}
            </div>
              
            </div>
    </div>
   </div>
  )
}

