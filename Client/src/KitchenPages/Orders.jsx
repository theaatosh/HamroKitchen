import { useState } from "react"
import styles from '../Styles/Kitchen/KitchenPages/Orders.module.css';
export const Orders=()=>{
 
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
          customer: { name: 'Alice Johnson' },
          items: [
            { foodItem: { name: 'prameet' }, quantity: 1 },
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
      
    return(
        <div className={styles.main_order_container}>
            <h2>Kitchen Order</h2>
            <div className={styles.order_list}>
                {orders.map((order)=>(
                <div className={styles.order_card} key={order._id}>
                        <h3>Order #{order._id}</h3>
                        <p>customer:{order.customer.name}</p>
                        <p>scheduled Time:{order.scheduledTime}</p>
                        <ul>
                            {order.items.map((item,index)=>(
                                <li key={index}>
                                    {item.foodItem.name}-{item.quantity}
                                </li>
                            ))}
                        </ul>
                     <div className={styles.orderActions}>
                        {order.status==='pending'?(
                            <>
                            <button>Accept</button>
                            <button>Reject</button>
                            </>
                        ):(
                          <p>status:{order.status}</p>         
                        )}
                        </div>   
                 </div>
                )
                    

                    
                )}
            </div>
        </div>
    )
}