import React from 'react'
import styles from '../../Styles/Kitchen/KitchenDetails/CompletedOrder.module.css'

export const CompletedOrder = () => {
  return (
    <div className={styles.completed_con}>
        <div className={styles.value}>
        <p>5</p>
      </div>

       <div className={styles.title}>
       <h2>Completed</h2>
        </div>
    </div>
  )
}

