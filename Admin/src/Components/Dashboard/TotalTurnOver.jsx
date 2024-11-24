import React from 'react'
import styles from '../../Styles/Dashboard/TotalTurnOver.module.css'
export const TotalTurnOver = ({quantity,topic}) => {
  
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

