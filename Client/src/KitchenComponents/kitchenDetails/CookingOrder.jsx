import React from 'react'
import styles from '../../Styles/Kitchen/KitchenDetails/CookingOrder.module.css'

export const CookingOrder = () => {
  
  return (
    <div className={styles.cookingOrder_con}>
          <div className={styles.value}>
        <p>20</p>
      </div>

       <div className={styles.title}>
       <h2>Cooking</h2>
        </div>
    </div>
  )
}

