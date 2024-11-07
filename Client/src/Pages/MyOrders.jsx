import { useContext, useEffect, useState } from 'react';
import styles from '../Styles/MyOrders/MyOrders.module.css';
import { StoreContext } from '../Context/StoreContext';
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; 
import axios from 'axios';
import { OrderHistoryModal } from '../Components/OrderHistoryModal';
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
    
      // const handleContainerToggle=(index)=>{
      //   setExpandedIndex(expandedIndex===index?null:index);
      //   console.log(index);
        
      // }
    const fetchOrders=async()=>{
        try{
            const response=await axios.post('url halne',{},{headers:{'Authorization':`Bearer ${token}`}});
            setData(response.data);

        }catch(error){
            console.log(error);
            
        }
    }
    useEffect(()=>{
        if(token){
            fetchOrders();
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


