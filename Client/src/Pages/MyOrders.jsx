import { useContext, useEffect, useState } from 'react';
import styles from '../Styles/MyOrders/MyOrders.module.css';
import { StoreContext } from '../Context/StoreContext';
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; 
import axios from 'axios';
export const MyOrders=()=>{

    const[expandedIndex,setExpandedIndex]=useState(null);
    const[data,setData]=useState([{
        orderId: 'ORD001',
        customerName: 'John Doe',
        foodItems: [
          { itemName: 'Margherita Pizza', quantity: 2, price: 10 },
          { itemName: 'Caesar Salad', quantity: 1, price: 7 },
          { itemName: 'Caesar Salad', quantity: 1, price: 7 },
          { itemName: 'Caesar Salad', quantity: 1, price: 7 },
          { itemName: 'Caesar Salad', quantity: 1, price: 7 },
          { itemName: 'Caesar Salad', quantity: 1, price: 7 },
          { itemName: 'Caesar Salad', quantity: 1, price: 7 },
          { itemName: 'Caesar Salad', quantity: 1, price: 7 },
          { itemName: 'Caesar Salad', quantity: 1, price: 7 },
          { itemName: 'Caesar Salad', quantity: 1, price: 7 },
        ],
        totalAmount: 27, // Calculated total: 2 * 10 + 7
        orderStatus: 'Pending',
        scheduledTime: '2024-10-23T18:00:00',
        address: '123 Main St, Springfield',
        placedDate: '2024-10-23',
        status: 'completed', // New status field added
      },
      {
        orderId: 'ORD002',
        customerName: 'Emily Smith',
        foodItems: [
          { itemName: 'Chicken Biryani', quantity: 1, price: 12 },
          { itemName: 'Garlic Naan', quantity: 3, price: 2 }
        ],
        totalAmount: 18, // Calculated total: 1 * 12 + 3 * 2
        orderStatus: 'Accepted',
        scheduledTime: '2024-10-23T19:30:00',
        address: '456 Oak St, Metropolis',
        placedDate: '2024-10-23',
        status: 'completed', // New status field added
      },
      {
        orderId: 'ORD003',
        customerName: 'Michael Lee',
        foodItems: [
          { itemName: 'Beef Burger', quantity: 2, price: 8 },
          { itemName: 'French Fries', quantity: 1, price: 3 },
          { itemName: 'Coca-Cola', quantity: 2, price: 2 }
        ],
        totalAmount: 23, // Calculated total: 2 * 8 + 3 + 2 * 2
        orderStatus: 'Completed',
        scheduledTime: '2024-10-23T12:00:00',
        address: '789 Maple St, Gotham',
        placedDate: '2024-10-23',
        status: 'processing', // New status field added
      },
      {
        orderId: 'ORD004',
        customerName: 'Michael Lee',
        foodItems: [
          { itemName: 'Beef Burger', quantity: 2, price: 8 },
          { itemName: 'French Fries', quantity: 1, price: 3 },
          { itemName: 'Coca-Cola', quantity: 2, price: 2 }
        ],
        totalAmount: 23, // Calculated total: 2 * 8 + 3 + 2 * 2
        orderStatus: 'Completed',
        scheduledTime: '2024-10-23T12:00:00',
        address: '789 Maple St, Gotham',
        placedDate: '2024-10-23',
        status: 'processing', // New status field added
      },
      {
        orderId: 'ORD005',
        customerName: 'Michael Lee',
        foodItems: [
          { itemName: 'Beef Burger', quantity: 2, price: 8 },
          { itemName: 'French Fries', quantity: 1, price: 3 },
          { itemName: 'Coca-Cola', quantity: 2, price: 2 }
        ],
        totalAmount: 23, // Calculated total: 2 * 8 + 3 + 2 * 2
        orderStatus: 'Completed',
        scheduledTime: '2024-10-23T12:00:00',
        address: '789 Maple St, Gotham',
        placedDate: '2024-10-23',
        status: 'processing', // New status field added
      },
      {
        orderId: 'ORD006',
        customerName: 'Michael Lee',
        foodItems: [
          { itemName: 'Beef Burger', quantity: 2, price: 8 },
          { itemName: 'French Fries', quantity: 1, price: 3 },
          { itemName: 'Coca-Cola', quantity: 2, price: 2 }
        ],
        totalAmount: 23, // Calculated total: 2 * 8 + 3 + 2 * 2
        orderStatus: 'Completed',
        scheduledTime: '2024-10-23T12:00:00',
        address: '789 Maple St, Gotham',
        placedDate: '2024-10-23',
        status: 'processing', // New status field added
      },{
        orderId: 'ORD007',
        customerName: 'Emily Smith',
        foodItems: [
          { itemName: 'Chicken Biryani', quantity: 1, price: 12 },
          { itemName: 'Garlic Naan', quantity: 3, price: 2 }
        ],
        totalAmount: 18, // Calculated total: 1 * 12 + 3 * 2
        orderStatus: 'Accepted',
        scheduledTime: '2024-10-23T19:30:00',
        address: '456 Oak St, Metropolis',
        placedDate: '2024-10-23',
        status: 'completed', // New status field added
      },
      {
        orderId: 'ORD008',
        customerName: 'Emily Smith',
        foodItems: [
          { itemName: 'Chicken Biryani', quantity: 1, price: 12 },
          { itemName: 'Garlic Naan', quantity: 3, price: 2 }
        ],
        totalAmount: 18, // Calculated total: 1 * 12 + 3 * 2
        orderStatus: 'Accepted',
        scheduledTime: '2024-10-23T19:30:00',
        address: '456 Oak St, Metropolis',
        placedDate: '2024-10-23',
        status: 'completed', // New status field added
      },
      ]);
    const{token}=useContext(StoreContext);
    
      const handleContainerToggle=(index)=>{
        setExpandedIndex(expandedIndex===index?null:index);
        console.log(index);
        
      }
    const fetchOrders=async()=>{
        const response=await axios.post('url halne',{},{headers:{'Authorization':`Bearer ${token}`}});
        setData(response.data);
    }
    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token])
    return(
        <>
        <div className={styles.main_container}>
            <h1>My orders</h1>
        <div className={styles.orders_container}>
            {data.map((order,index)=>{
                return (
                    <div key={index} className={`${styles.my_orders_order} ${expandedIndex===index && styles.expanded} ${order.status==='completed'? styles.completed:''} ${order.status==='processing'? styles.processing:''}`} 
                    onClick={()=>handleContainerToggle(index)}>
                        <div className={styles.heading}>
                       <h3>#{order.orderId}</h3>
                       <h5>{order.placedDate}</h5>
                        </div>
                       <div className={styles.order_inner}>
                       <img src="/Images/parcel.png" alt="" /> 
                        <p className={styles.items}>{order.foodItems.map((item,index)=>{
                           
                                if(index===order.foodItems.length-1){
                                    return (`${item.itemName} x ${item.quantity}`)
                                }
                                else{
                                    return(`${item.itemName} x ${item.quantity} ,`)
                                }
                            })}
                        </p> 
                        {expandedIndex===index?(
                            <FaChevronUp  className={styles.arrow_down}/>
                            
                        ):
                        (
                            <FaChevronDown  className={styles.arrow_down}/>
                            
                        )}
                        
                        </div>
                        {expandedIndex===index&&
                        <div className={styles.expanded}>
                            <hr />
                        <p><b>Total Amount :</b> Rs.{order.totalAmount}</p> 
                        <p><b>No of Items:</b>{order.foodItems.length}</p>
                        <p><b>Scheduled for:</b> {order.scheduledTime}</p>
                        <p><b>Order Status:</b> {order.status}</p></div>
                        }
                        </div>

                       
                )
            })}
        </div>
        </div>
        </>
    ) 
}