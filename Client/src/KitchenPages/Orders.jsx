import { useContext, useEffect, useState } from "react"
import styles from '../Styles/Kitchen/KitchenPages/Orders.module.css';
import axios from "axios";
import {  toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../Context/AuthContext";
import { ProcessingOrder } from "../KitchenComponents/kitchenDetails/ProcessingOrder";
import { StoreContext } from "../Context/StoreContext";
export const Orders=()=>{
  const{isOnline}=useAuth();
  // const {token,setToken}=useContext(StoreContext);
    const [orders, setOrders] = useState([
      ]);

      const fetchCustomerOrders=async(token)=>{
        try{
          const res=await axios.get('http://localhost:5010/api/kitchen/showOrder',{headers:{'Authorization':`Bearer ${token}`}});
          // setOrders(response.data);
          console.log(res.data);

      }catch(error){
          console.log(error);
         toast.error(error);
          
      }
      }
      const fetchProcessingOrders=async(token)=>{
        try{
          // console.log(token);
          const res=await axios.get('http://localhost:5010/api/kitchen/processingOrder',{headers:{'Authorization':`Bearer ${token}`}});
          // setOrders(response.data);
          console.log(res.data);

      }catch(error){
          console.log(error);
         toast.error(error);
          
      }
      }
      const statusHandlerAcc=async(orderId)=>{
          try{
            const response=await axios.post('http://localhost:5010/api/kitchen/acceptOrder',{orderId},{headers:{'Authorization':`Bearer ${token}`}})
            console.log(orderId);
            
          }
          catch(error)
          {
            toast.error(error);
          }
      }

      const statusHandlerRej=async(orderId)=>{
        try{
          const response=await axios.post('http://localhost:5010/api/kitchen/rejectOrder',{orderId},{headers:{'Authorization':`Bearer ${token}`}})
          console.log(orderId);
          
        }
        catch(error)
        {
          toast.error(error);
        }
    }
      useEffect(()=>{
        const token=localStorage.getItem("token");
        fetchProcessingOrders(token);
        fetchCustomerOrders(token);
      },[])
      
    return(
      <>
        <div className={styles.main_order_container}>
            {!isOnline?(<h2 className={styles.offline_order}>You are offline.<br/>You will not get any order request</h2>):(
              <>
            <h2>Order Request</h2>
              <div className={styles.topic}>
              <p>S.N</p>
              <p>Customer Name</p>
              <p>Food Items</p>
              <p>Scheduled for</p>
            </div>
            <div className={styles.inner_container}>
            <div className={styles.order_list}>
                {orders.map((order)=>(
                  order.status==='pending'&&
                  <>
                      <div className={styles.order_card} key={order._id}>
                        <h3>#{order._id}</h3>
                        <p>{order.customer.name}</p>
                        <ul>
                            {order.items.map((item,index)=>(
                              <li key={index}>
                                    {item.foodItem.name}-{item.quantity}
                                </li>
                            ))}
                        </ul>
                        <p>{order.scheduledTime}</p>
                        <div className={styles.btns}>
                        <button className={styles.accept} onClick={()=>statusHandlerAcc(order._id)}>Accept</button>
                        <button className={styles.reject} onClick={()=>statusHandlerRej(order._id)}>Reject</button>

                        </div>
                      {/* <select onChange={(event)=>statusHandler(event,order._id)} */}
                       
                      
                    
                 </div>
                 <hr />
                 </>     
                )
                )}
            </div>
              
            </div>
              </>
            )}
            
        </div>

            <ProcessingOrder orders={orders}/>
</>

    )
}