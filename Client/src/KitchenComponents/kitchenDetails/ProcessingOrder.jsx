import React from 'react'
import styles from '../../Styles/Kitchen/KitchenPages/ProcessingOrders.module.css';
export const ProcessingOrder = ({processingOrders}) => {
  const statusHandler=(e,id)=>{
    console.log(e.target.value,id);
    
  }
  return (
   <div className={styles.processing_order_con}>
    <h2>Processing Order</h2>
    <div className={styles.processing_order_inner_con}>
    <div className={styles.topic}>
              <p>S.N</p>
              <p>Customer Name</p>
              <p>Food Items</p>
              <p>Contact No</p>
              <p>Status</p>
            </div>
            <div className={styles.inner_container}>
            <div className={styles.order_list}>
                {processingOrders.length>0 && processingOrders.map((order,index)=>(
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
                      <select onChange={(event)=>statusHandler(event,order._id)}
                        className={styles.orderStatus}>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                      </select>
                        
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

