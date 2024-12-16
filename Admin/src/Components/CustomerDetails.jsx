import React from 'react'
import styles from '../Styles/CustomerDetails.module.css';
export const CustomerDetails = ({customer}) => {
  


  return (
    <div className={styles.main_container}>
      <h1>Customer Details</h1>
      <div className={styles.title}>
        <p>Name</p>
        <p>Email</p>
        <p>PhoneNumber</p>
      </div>

      <div className={styles.details_container}>
        {customer.map((item,index)=>{
          return(
            <div className={styles.individual_detail} key={index}>
              <p>{item.userName}</p>
              <p>{item.email}</p>
              <p>{item.phoneNumber}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

