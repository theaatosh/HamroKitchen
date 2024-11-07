import React from 'react'
import styles from '../../Styles/Kitchen/KitchenPages/ProcessingOrders.module.css';
export const ProcessingOrder = ({orders}) => {
  return (
   <div className={styles.processing_order_con}>
    <h2>Processing Order</h2>
    <div className={styles.processing_order_inner_con}>
    <div className={styles.topic}>
              <p>S.N</p>
              <p>Customer Name</p>
              <p>Food Items</p>
              <p>Scheduled for</p>
              <p>Status</p>
            </div>
            <div className={styles.inner_container}>
            <div className={styles.order_list}>
                {orders.map((order,index)=>(
                  order.status==='processing'&&
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
                      <select onChange={(event)=>statusHandler(event,order._id)}
                        className={styles.orderStatus}>
                        <option value="processing">Processing</option>
                        <option value="out for delivery">Out for delivery</option>
                      </select>
                        
                 </div>
                 <hr />
                 </>     
                )
                )}
            </div>
              
            </div>
    </div>
   </div>
  )
}

