import React from 'react'
import styles from '../../Styles/Dashboard/OrderDetails.module.css'
export const OrderDetails = ({quantity,topic}) => {
  
  return (
    <div className={styles.main_con}>
        <div className={styles.value}>
        <p>{quantity}</p>
      </div>

       <div className={styles.title}>
       <h3>{topic}</h3>
        </div>
    </div>
  )
}

