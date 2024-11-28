import React from 'react';
import styles from '../Styles/Kitchen/KitchenPages/CompletedFoodOrders.module.css'
export const CompletedFoodOrders = ({completedFoodOrders}) => {

    
    const handleOutForDelivery=(e)=>{
        if(e.target.value==="outfordelivery"){
            console.log("Pathao ko ma gayo");
            
        }
      
    }
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
                     {completedFoodOrders.length>0 ? completedFoodOrders.map((order,index)=>(
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
                        
                             <select onChange={(event)=>handleOutForDelivery(event,order._id)}
                        className={styles.orderStatus}>
                        <option value="completed">Completed</option>
                        <option value="outfordelivery">Out for delivery</option>
                      </select>
                      </div>
                      <hr />
                      </React.Fragment>     
                     )
                     ):<div className={styles.no_orders}>
                     <h2>No completed orders !!</h2>
                     </div>}
                 </div>
                   
                 </div>
         </div>
        </div>
       )
    }