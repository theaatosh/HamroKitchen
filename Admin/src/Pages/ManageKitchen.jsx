import styles from '../Styles/ManageKitchen.module.css';
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
export const ManageKitchen=()=>{

    const kitchenDetails=[
        {
            userName:"test",
            email:"test@gmail.com",
            foodItems:"Chicken Momo",
            location:"balkumari",
            status:"pending",
        },
        {
            userName:"test123",
            email:"test123@gmail.com",
            foodItems:"Veg rolls",
            location:"gwarko",
            status:"pending",
        }
    ]
    return (
        <>
        <div className={styles.main_container}>
            <div className={styles.manageKitchen_container}>
                <h1>Kitchen Request</h1>
                <div className={styles.manageKitchen_details_container}>
                    <div className={styles.manageKitchen_title}>
                    <p>UserName</p>
                    <p>Email</p>
                    <p>Food Items</p>
                    <p>Location</p>
                    <p>Status</p>
                    <p>App/Rej</p>
                    </div><hr /><hr />
                      {kitchenDetails.map((curElem,index)=>{
                          return(
                            <>
                            <div key={index} className={styles.manageKitchen_detail}>
                               <p>{curElem.userName}</p>
                               <p>{curElem.email}</p>
                               <p>{curElem.foodItems}</p>
                               <p>{curElem.location}</p>
                               <p>{curElem.status}</p>
                               <FaCheckCircle className={styles.accept_btn} onClick={()=>alert("Kitchen Accepted")}/>
                               <FaTimesCircle  className={styles.reject_btn} onClick={()=>alert("Kitchen Rejected")}/>
                            
                    </div>  
                    <hr />
                    </>
                            )
                      })}  

                
                </div>
            </div>
        </div>
        </>
    )
}