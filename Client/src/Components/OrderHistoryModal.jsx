import { useRef } from 'react';
import styles from '../Styles/Modal/OrderHistory.module.css';
import { IoMdClose } from "react-icons/io";
export const OrderHistoryModal = ({setShowModal,handleCloseModal,curOrder}) => {

const modalOrderRef=useRef(null);

console.log(curOrder);

const handleModal=(e)=>{
    
    if(modalOrderRef.current===e.target){
        setShowModal(false);
    }


}
  return (
    <div className={styles.main_container} ref={modalOrderRef} onClick={(e)=>handleModal(e)}>

        <div  className={styles.inner_container} >
            <div className={styles.close_icon} onClick={handleCloseModal}>
                <h3>Order Details</h3>
                <IoMdClose className={styles.cross_icon}/>
            </div>
                <hr />
                
            <div className={styles.details}>
                <div className={styles.detail}>
                    <p className={styles.upper_title}>Order Id</p>
                    <p >{curOrder.orderId}</p>
                </div>
                <div className={styles.detail}>
                    <p className={styles.upper_title}>Order Date</p>
                    <p>{curOrder.placedDate}</p>
                </div>
                <div className={styles.detail}>
                    <p className={styles.upper_title}>Order Price</p>
                    <p>{curOrder.totalAmount}</p>
                </div>
                <div className={styles.detail}>
                    <p className={styles.upper_title}> Payment Method</p>
                    <p>khalti</p>
                </div>
                <div className={styles.detail}>
                    <p className={styles.upper_title}>Payment Status</p>
                    <p>Paid</p>
                </div>
                <div className={styles.detail}>
                    <p className={styles.upper_title}>Scheduled Time</p>
                    <p>{curOrder.scheduledTime}</p>
                </div>
                <div className={styles.detail}>
                    <p className={styles.upper_title}>Order Status</p>
                    <p className={` 
              ${curOrder.status==="completed" ? styles.statusCompleted:styles.orderStatus} `}>{curOrder.status}</p>
                </div>
            </div>
            <div className={styles.item_details}>
                <div className={styles.title}>
                <p>Items</p>
                <p>quantity</p>
                <p>price</p>
                </div>
                <hr />
                {curOrder.foodItems.map((curItem,idx)=>{
                    return(
                    <div key={idx} className={styles.item}>
                            <p>{curItem.itemName}</p>
                            <p>{curItem.quantity}</p>
                            <p>{curItem.price}</p>
                    </div>

                    )
                })}

            </div>
                    
                    <div className={styles.track_order}>
                    <button className={styles.trackOrder_btn}>Track Order</button>

                    </div>
        </div>
    </div>
  )
}

