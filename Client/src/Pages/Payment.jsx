import styles from '../Styles/Payment/Payment.module.css';
import axios from 'axios';
import { StoreContext } from '../Context/StoreContext';
import { useContext } from 'react';

export const Payment=()=>{
    const {cartData,deliveryInfo}=useContext(StoreContext);
    const handlePayment=async()=>{

        // const formData={"return_url": "http://localhost:5173/profile/test",
        //     "website_url": "http://localhost:5173/profile/test",
        //     "amount": 1300,
        //     "purchase_order_id": "test12",
        //     "purchase_order_name": "test"}
        //     const h=await axios.post("http://localhost:5010/api/khalti/init",formData);
        //     console.log(h);

       try{
            console.log(cartData.totalAmount);
            
            const response = await axios.post('http://localhost:5010/api/khalti/init', {
            amount: (cartData.totalAmount)*100, 
            purchase_order_id: "test12",
            purchase_order_name: "test",
            customer_info: {
              name: `${deliveryInfo.firstName+" "+deliveryInfo.lastName}`,
              email: `${deliveryInfo.email}`,
              phone: `${deliveryInfo.phoneNumber}`,
            }
          }
        );
          const paymentUrl = await response.data.data.payment_url;
           console.log(response.data.data.payment_url);
           console.log(response.data.data);
          window.location.href =  paymentUrl;
        }catch(err){
            console.log(err);
        }

    }

    const handleCodPayment=()=>{


    }
    return(
        <div className={styles.payment_container}>
          <div className={styles.payment_wrapper}>
            <h2 className={styles.subheading}>Select your preferred payment method:</h2>
            <div className={styles.payment_options}>
            <div
          className={`${styles.option} `}>
          <img src='/Images/khaltipay.png' alt="Khalti" className={styles.payment_logo} onClick={handlePayment}/>
          <p>Pay with Khalti</p>
          </div>
            
          <div
          className={`${styles.option} `}>
          <img src='/Images/cod.png' alt="Khalti" className={styles.payment_logo} onClick={handleCodPayment}/>
          <p>Cash on delivery</p>
          </div>
          </div>
            </div>

            <div className={styles.order_summary}>
              <h3>Order Summary</h3>
              <div className={styles.total_amt}>
              <p>Total Amount</p>
                <p>Rs:450</p>
              </div>
            </div>

        </div>
    )
}