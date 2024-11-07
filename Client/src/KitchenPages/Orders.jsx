import { useEffect, useState } from "react"
import styles from '../Styles/Kitchen/KitchenPages/Orders.module.css';
import axios from "axios";
import {  toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../Context/AuthContext";
import { ProcessingOrder } from "../KitchenComponents/kitchenDetails/ProcessingOrder";
export const Orders=()=>{
  const{isOnline}=useAuth();

    const [orders, setOrders] = useState([
        {
          _id: '1',
          customer: { name: 'anesh' },
          items: [
            { foodItem: { name: 'Pizza' }, quantity: 2 },
            { foodItem: { name: 'Pasta' }, quantity: 1 }
          ],
          scheduledTime: 'October 21, 2024, 2:30 PM', 
          status: 'pending',
        },
        {
          _id: '2',
          customer: { name: 'kazi' },
          items: [
            { foodItem: { name: 'Burger' }, quantity: 3 },
            { foodItem: { name: 'Fries' }, quantity: 2 }
          ],
          scheduledTime: 'October 21, 2024, 4:00 PM',
          status: 'pending',
        
        },
        {
          _id: '2',
          customer: { name: 'kazi' },
          items: [
            { foodItem: { name: 'Burger' }, quantity: 3 },
            { foodItem: { name: 'Fries' }, quantity: 2 }
          ],
          scheduledTime: 'October 21, 2024, 4:00 PM',
          status: 'pending',
        
        },
        {
          _id: '2',
          customer: { name: 'kazi' },
          items: [
            { foodItem: { name: 'Burger' }, quantity: 3 },
            { foodItem: { name: 'Fries' }, quantity: 2 }
          ],
          scheduledTime: 'October 21, 2024, 4:00 PM',
          status: 'pending',
        
        },
        {
          _id: '2',
          customer: { name: 'kazi' },
          items: [
            { foodItem: { name: 'Burger' }, quantity: 3 },
            { foodItem: { name: 'Fries' }, quantity: 2 }
          ],
          scheduledTime: 'October 21, 2024, 4:00 PM',
          status: 'pending',
        
        },
        {
          _id: '3',
          customer: { name: 'prameet' },
          items: [
            { foodItem: { name: 'momo' }, quantity: 1 },
            { foodItem: { name: 'Juice' }, quantity: 2 }
          ],
          scheduledTime: 'October 21, 2024, 12:00 PM',
          status: 'accepted',
        },
        {
          _id: '4',
          customer: { name: 'dangi' },
          items: [
            { foodItem: { name: 'Sushi' }, quantity: 4 }
          ],
          scheduledTime: 'October 21, 2024, 6:00 PM',
          status: 'processing',
        },
        {
          _id: '4',
          customer: { name: 'dangi' },
          items: [
            { foodItem: { name: 'Sushi' }, quantity: 4 }
          ],
          scheduledTime: 'October 21, 2024, 6:00 PM',
          status: 'processing',
        },
        {
          _id: '4',
          customer: { name: 'dangi' },
          items: [
            { foodItem: { name: 'Sushi' }, quantity: 4 }
          ],
          scheduledTime: 'October 21, 2024, 6:00 PM',
          status: 'processing',
        },
        {
          _id: '4',
          customer: { name: 'dangi' },
          items: [
            { foodItem: { name: 'Sushi' }, quantity: 4 }
          ],
          scheduledTime: 'October 21, 2024, 6:00 PM',
          status: 'processing',
        },
        {
          _id: '4',
          customer: { name: 'dangi' },
          items: [
            { foodItem: { name: 'Sushi' }, quantity: 4 }
          ],
          scheduledTime: 'October 21, 2024, 6:00 PM',
          status: 'rejected',
        }
      ]);

      const fetchCustomerOrders=async()=>{
        try{
          const response=await axios.get('url halne',{},{headers:{'Authorization':`Bearer ${token}`}});
          setOrders(response.data);

      }catch(error){
          console.log(error);
         toast.error(error);
          
      }
      }
      const statusHandler=async(status,orderId)=>{
          try{
            // const response=await axios.post('url halne',{orderId,status:status.target.value})
            console.log(status,orderId);
            
          }
          catch(error)
          {
            toast.error(error);
          }
      }

      useEffect(()=>{
        fetchCustomerOrders();
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
                        <button className={styles.accept} onClick={()=>statusHandler('processing',order._id)}>Accept</button>
                        <button className={styles.reject}>Reject</button>

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