import { useEffect, useState } from "react"
import styles from '../Styles/Kitchen/KitchenPages/Orders.module.css';
import axios from "axios";
import {  toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../Context/AuthContext";
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
      const statusHandler=async(event,orderId)=>{
          try{
            const response=await axios.post('url halne',{orderId,status:event.target.value})
            console.log(event,orderId);
            
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
        <div className={styles.main_order_container}>
            <h2>Food Order</h2>
            {!isOnline?(<p >You are offline.No orders to display</p>):(
              <>
              <div className={styles.topic}>
              <p>S.N</p>
              <p>Customer Name</p>
              <p>Food Items</p>
              <p>Scheduled for</p>
              <p>Status</p>
            </div>
            <div className={styles.order_list}>
                {orders.map((order,index)=>(
                  <>
                <div className={styles.order_card} key={order._id}>
                        <h3>#{index+1}</h3>
                        <p>{order.customer.name}</p>
                        <ul>
                            {order.items.map((item,index)=>(
                              <li key={index}>
                                    {item.foodItem.name}-{item.quantity}
                                </li>
                            ))}
                        </ul>
                        <p>{order.scheduledTime}</p>
                      <select onChange={(event)=>statusHandler(event,order._id)}
                        className={styles.orderStatus}>
                        <option value="processing">Processing</option>
                        <option value="out for delivery">Out for delivery</option>
                        <option value="delivered">Delivered</option>
                      </select>
                        
                 </div>
                 <hr />
                 </>     
                )
                    

                    
                )}
            </div>
              </>
            )}
            
        </div>
    )
}