import { useContext } from 'react';
import styles from '../Styles/PlaceOrder/PlaceOrder.module.css';
import { StoreContext } from '../Context/StoreContext';
import { useLocation } from 'react-router-dom';
export const PlaceOrder=()=>{

    const {getTotalCartAmount}=useContext(StoreContext);
    const location=useLocation();
    const {selectedTime}=location.state||{};

    return(
        <>
        <div className={styles.place_order_container}>
            <div className={styles.place_order_left}>
                <form className={styles.place_order_form}>
                    <h2>Delivery Information</h2>
                    <div className={styles.multi_fields}>
                        <input type="text"  placeholder='First name'/>
                        <input type="text"  placeholder='Last  name'/>
                    </div>
                    <input type="email" placeholder='Email address'/>
                    <input type="text" placeholder='Phone Number'/>
                    <input type="text" placeholder='Delivery Location'/>

                </form>
            </div>
            <div className={styles.place_order_right}>
            <div className={styles.cart_bottom}>
          <div className={styles.cart_total}>
            {selectedTime&& <p>Order scheduled for:{selectedTime}</p>}
            <h2>Cart Totals</h2>
            <div className={styles.cart_total_details}>
              <p>Sub Total</p>
              <p>Rs.{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className={styles.cart_total_details}>
              <p>Delivery Fee</p>
              <p>Rs.{50}</p>
            </div>
            <hr />
            <div className={styles.cart_total_details}>
              <p> Total</p>
              <p>Rs.{getTotalCartAmount() ? getTotalCartAmount() + 50 : "0"}</p>
            </div>
            <hr />
            <button
              type="submit"
            >
              Proceed To Payment
            </button>
          </div>
            </div>
        </div>
        </div>
        </>
    )
}