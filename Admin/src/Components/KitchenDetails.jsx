import styles from "../Styles/KitchenDetails.module.css";
import { toast } from 'react-toastify';
import axios from "axios";
import { PiUserSwitchLight } from "react-icons/pi";
export const KitchenDetails = ({ kitchen,fetchUserDetails }) => {
  const handleSwitchRole = async (id) => {
    try {
      console.log(id);
      const res=await axios.post("http://localhost:5010/api/changeToCustomer", { id });
      if(res.status===200){
        fetchUserDetails();
        toast.success(res.data.message,{
          autoClose:2000
        })

      }
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
                onClick={() => handleSwitchRole(item._id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
