import React from 'react'
import styles from '../Styles/CustomerDetails.module.css';
import { RiDeleteBin5Fill } from "react-icons/ri";
export const CustomerDetails = ({details}) => {
  return (
    <div className={styles.main_container}>
      <h1>Customer Details</h1>
      <div className={styles.title}>
        <p>Name</p>
        <p>Email</p>
        <p>PhoneNumber</p>
        <p>Action</p>
      </div>

      <div className={styles.details_container}>
        {details.map((item,index)=>{
          return(
            <div className={styles.individual_detail} key={index}>
              <p>{item.name}</p>
              <p>{item.email}</p>
              <p>{item.phone}</p>
              <RiDeleteBin5Fill className={styles.delete} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

