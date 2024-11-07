import { useContext, useEffect, useState } from 'react';
import styles from '../Styles/MyOrders/MyOrders.module.css';
import { StoreContext } from '../Context/StoreContext';
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; 
import axios from 'axios';
import { OrderHistoryModal } from '../Components/OrderHistoryModal';
export const MyOrders=()=>{

    const[expandedIndex,setExpandedIndex]=useState(null);
    const[data,setData]=useState([
      ]);
    const{token}=useContext(StoreContext);
    
      // const handleContainerToggle=(index)=>{
      //   setExpandedIndex(expandedIndex===index?null:index);
      //   console.log(index);
        
      // }
    const fetchOrders=async(token)=>{
        try{
            const response=await axios.get('http://localhost:5010/api/customer/myOrder',{headers:{'Authorization':`Bearer ${token}`}});
            console.log(response.data);
            setData(response.data);


        }catch(error){
            console.log(error);
            
        }
    }
    useEffect(()=>{
        if(token){
            fetchOrders(token);
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
              <>
            <div key={index} className={styles.order_content}>
              <p>{order.orderId}</p>
              <p>{order.placedDate}</p>
              <p className={` 
              ${order.status==="completed" ? styles.statusCompleted:styles.orderStatus} `}>{order.status}</p>
              <p>Rs.{order.totalAmount}</p>
              <button className={styles.viewDetails_btn} onClick={()=>handleshowModal(order)}>View Details</button>
            </div>
            <hr />
            </>
            )

           })}
           {showModal && (
          <OrderHistoryModal
            setShowModal={setShowModal}
            handleCloseModal={handleCloseModal}
            curOrder={selectedOrder}
          />
        )}
            
          </div>
        </div>
        </div>
        </>
    ) 
}


