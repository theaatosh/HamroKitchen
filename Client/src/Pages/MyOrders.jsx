import React, { useContext, useEffect, useState } from 'react';
import styles from '../Styles/MyOrders/MyOrders.module.css';
import { StoreContext } from '../Context/StoreContext';
import axios from 'axios';
import { OrderHistoryModal } from '../Components/OrderHistoryModal';
export const MyOrders=()=>{

    const[data,setData]=useState([
      ]);
    const{token,setToken}=useContext(StoreContext);
    
      // const handleContainerToggle=(index)=>{
      //   setExpandedIndex(expandedIndex===index?null:index);
      //   console.log(index);
        
      // }
    const fetchOrders=async()=>{
        try{
          
            const response=await axios.get('http://localhost:5010/api/customer/myOrder',{headers:{'Authorization':`Bearer ${token}`}});
            setData(response.data);


        }catch(error){
            console.log(error);
            
        }
    }
    useEffect(()=>{
        if(token){
            fetchOrders();
        }
        else{
          const savedToken=localStorage.getItem('token');
          if(savedToken)
          {
            setToken(savedToken);
          }
          
        }
    },[token])

    const[showModal,setShowModal]=useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleshowModal=(order)=>{
        setSelectedOrder(order)
        setShowModal(true);
    }
    const handleCloseModal=()=>{
      setShowModal(false);
      setSelectedOrder(null); 
    }
    return(
        <>
        <div className={styles.main_container}>
            <h1>Order History</h1>
        <div className={styles.orders_container}>
          <hr />
          <div className={styles.title}>
            <p>Order id</p>
            <p>Order Date</p>
            <p>Order Status</p>
            <p>Total Price</p>
            
          </div>  
          <hr />
          <div>
           {data.map((order,index)=>{
          
            return(
              <React.Fragment key={order._id}>
            <div key={index} className={styles.order_content}>
              <p>{order._id}</p>
              <p>{order.placedDate}</p>
              <p className={` 
              ${order.orderStatus==="completed" ? styles.statusCompleted:styles.orderStatus} `}>{order.orderStatus}</p>
              <p>Rs.{order.totalAmount}</p>
              <button className={styles.viewDetails_btn} onClick={()=>handleshowModal(order)}>View Details</button>
            </div>
            <hr />
            </React.Fragment>
            )

           })}
           {showModal && (
          <OrderHistoryModal
            setShowModal={setShowModal}
            handleCloseModal={handleCloseModal}
            curOrder={selectedOrder}
            fetchOrders={fetchOrders}
            token={token}
          />
        )}
            
          </div>
        </div>
        </div>
        </>
    ) 
}


