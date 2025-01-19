import React from "react";
import styles from "../Styles/KitchenDetails.module.css";
import axios from "axios";
import { PiUserSwitchLight } from "react-icons/pi";
export const KitchenDetails = ({ kitchen }) => {
  const handleDelete = async (id) => {
    try {
      console.log(id);
      const res=await axios.post("http://localhost:5010/api/changeToCustomer", { id });
      console.log(res.data.message);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <div className={styles.main_container}>
      <h1>Kitchen Details</h1>
      <div className={styles.title}>
        <p>Name</p>
        <p>Email</p>
        <p>PhoneNumber</p>
        <p>Status</p>
        <p>Action</p>
      </div>

      <div className={styles.details_container}>
        {kitchen.map((item, index) => {
          return (
            <div className={styles.individual_detail} key={index}>
              <p>{item.userName}</p>
              <p>{item.email}</p>
              <p>{item.phoneNumber}</p>
              <p
                className={
                  item.cookStatus === "offline" ? styles.offline : styles.online
                }
              >
                {item.cookStatus}
              </p>
              <PiUserSwitchLight
                className={styles.delete}
                onClick={() => handleDelete(item._id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
