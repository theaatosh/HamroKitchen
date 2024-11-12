import React from 'react'
import styles from '../Styles/Kitchen/KitchenPages/CompletedFoodOrders.module.css'
export const CompletedFoodOrders = ({completedFoodOrders}) => {


    return (
        <div className={styles.completed_order_con}>
         <h2>Completed Orders</h2>
         <div className={styles.completed_order_inner_con}>
         <div className={styles.topic}>
                   <p>S.N</p>
                   <p>Customer Name</p>
                   <p>Food Items</p>
                   <p>Contact No</p>
                   <p>Status</p>
                 </div>
                 <div className={styles.inner_container}>
                 <div className={styles.order_list}>
                     {completedFoodOrders.length>0 && completedFoodOrders.map((order,index)=>(
                       <React.Fragment key={order._id}>
                           <div className={styles.order_card} >
                             <h3>#{index+1}</h3>
                             <p>{`${order.deliveryInfo.firstName} ${order.deliveryInfo.lastName}`}</p>
                             <ul>
                                 {order.orderedItem.map((item,index)=>(
                                   <li key={index}>
                                         {item.name}-{item.quantity}
                                     </li>
                                 ))}
                             </ul>
                             <p>{order.deliveryInfo.phoneNumber}</p>
                        
                             
                      </div>
                      <hr />
                      </React.Fragment>     
                     )
                     )}
                 </div>
                   
                 </div>
         </div>
        </div>
       )
    }