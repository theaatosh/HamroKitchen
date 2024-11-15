import React, { useContext, useEffect, useState } from "react"
import styles from '../Styles/Kitchen/KitchenPages/Orders.module.css';
import axios from "axios";
import {  toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../Context/AuthContext";
import { ProcessingOrder } from "../KitchenComponents/kitchenDetails/ProcessingOrder";
import { StoreContext } from "../Context/StoreContext";
import Loading from "../Components/Loading";
import { CompletedFoodOrders } from "../KitchenComponents/CompletedFoodOrders";
export const Orders=()=>{
  const{isKitchenOnline}=useAuth();
  const {token,setToken}=useContext(StoreContext);
    const [customerOrders, setCustomerOrders] = useState([]);
    const [processingOrders, setProcessingOrders] = useState([]);
    const [completedFoodOrders, setCompletedFoodOrders] = useState([]);
    const[isLoading,setIsLoading]=useState(false);
    const[processingOrdersLoading,setprocessingOrdersLoading]=useState(false);
    
  //order request fetch garne
      const fetchCustomerOrders=async()=>{
        setIsLoading(true)
        try{
         const res=await axios.get('http://localhost:5010/api/kitchen/showOrder',{headers:{'Authorization':`Bearer ${token}`}});
          setCustomerOrders(res.data);
          
        }catch(error){
          console.log(error);
         toast.error(error.message);
          
      }finally{
        setIsLoading(false);
      }
      }
  
      //processing order fetch garne
      const fetchProcessingOrders=async()=>{
       setprocessingOrdersLoading(true);
        try{
          const res=await axios.get('http://localhost:5010/api/kitchen/processingOrder',{headers:{'Authorization':`Bearer ${token}`}});
          setProcessingOrders(res.data);
          

      }catch(error){
          console.log(error);
         toast.error(error.message);
          
      }
      finally{
        setprocessingOrdersLoading(false);
      }
      }

      // completed orders fetch garne
      // const fetchCompletedFoodOrders=async()=>{
      
      //   try{
      //     console.log("hello");
          
      //     const res=await axios.get('http://localhost:5010/api/kitchen/showCompletedOrder',{headers:{'Authorization':`Bearer${token}`}});
      //     console.log(res);

      //     setCompletedFoodOrders(res.data)
      //   }
      //   catch(err){
      //     toast.error(err.message)
      //   }
      // }


      const statusHandlerAcc=async(orderId)=>{
          try{
            const response=await axios.post('http://localhost:5010/api/kitchen/acceptOrder',{orderId},{headers:{'Authorization':`Bearer ${token}`}})
            
            fetchCustomerOrders(); 
            fetchProcessingOrders();
          }
          catch(error)
          {
            toast.error(error.message);
          }
      }


      const statusHandlerRej=async(orderId)=>{
        try{
          const response=await axios.post('http://localhost:5010/api/kitchen/rejectOrder',{orderId},{headers:{'Authorization':`Bearer ${token}`}})
          fetchCustomerOrders();
        }
        catch(error)
        {
          toast.error(error.message);
        }
    }
    useEffect(() => {
      if (token) {
        fetchCustomerOrders();
        fetchProcessingOrders();
      } else {
      const savedToken = localStorage.getItem("token");
        if (savedToken) {
        setToken(savedToken);
        } else {
          toast.error("No token found");
        }
      }
    }, [token]);
    return(
      <>
        <div className={styles.main_order_container}>
          <ToastContainer/>
            {!isKitchenOnline?(<h2 className={styles.offline_order}>You are currently offline.<br/> Please go online to receive orders.</h2>):(
              <>
            <h2>New Order Request</h2>
              <div className={styles.topic}>
              <p>S.N</p>
              <p>Customer Name</p>
              <p>Food Items</p>
              <p>Contact No</p>
            </div>
            <div className={styles.inner_container}>
            <div className={styles.order_list}>
              {isLoading?<Loading/>:(
                customerOrders.length>0 ? (customerOrders.map((order,index)=>(
                  order.orderStatus==='assignedToCook'&&
                  <React.Fragment key={order._id}>
                      <div className={styles.order_card} >
                        <h3>#{index+1}</h3>
                        <p>{order.deliveryInfo.firstName}</p>
                        <ul>
                            {order.orderedItem.map((item,index)=>(
                              <li key={index}>
                                    {item.name}-{item.quantity}
                                </li>
                            ))}
                        </ul>
                        <p>{order.deliveryInfo.phoneNumber}</p>
                        <div className={styles.btns}>
                        <button className={styles.accept} onClick={()=>statusHandlerAcc(order._id)}>Accept</button>
                        <button className={styles.reject} onClick={()=>statusHandlerRej(order._id)}>Reject</button>

                        </div>
                      {/* <select onChange={(event)=>statusHandler(event,order._id)} */}
                       
                      
                    
                 </div>
                 <hr />
                 </React.Fragment>     
                )
                )):(
                  <div className={styles.no_orders}>
                    <h2>No new order request !!</h2>
                    </div>
                ))}
            </div>
              
            </div>
              </>
            )}
            
        </div>

            <ProcessingOrder processingOrders={processingOrders} processingOrdersLoading={processingOrdersLoading} 
            fetchCustomerOrders={fetchCustomerOrders}
            fetchProcessingOrders={fetchProcessingOrders}/>

            <CompletedFoodOrders completedFoodOrders={completedFoodOrders} 
        />
</>

    )
}