import React from 'react'
import styles from '../Styles/CustomerDetails.module.css';
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios';
export const CustomerDetails = ({customer}) => {

  const handleDelete=async(id)=>{

    try{
      const res=await axios.post("http://localhost:5010/pathhalne",{id});

    }
    catch(error){
      console.log(error);
      
    }
  }
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
        {customer.map((item,index)=>{
          return(
            <div className={styles.individual_detail} key={index}>
              <p>{item.userName}</p>
              <p>{item.email}</p>
              <p>{item.phoneNumber}</p>
              <MdDeleteForever className={styles.delete} onClick={()=>handleDelete(item._id)} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

