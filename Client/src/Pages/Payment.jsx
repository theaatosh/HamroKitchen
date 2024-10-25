import { useNavigate } from 'react-router-dom';
import styles from '../Styles/Payment/Payment.module.css';
export const Payment=()=>{
const navigate=useNavigate();
    const handlePayment=()=>{

            navigate('/paymentSuccessful');
       


    }
    return(
        <div className={styles.payment_container}>
            <h1>Payment Page</h1>
            <p className={styles.subheading}>Select your preferred payment method:</p>
            <div
          className={`${styles.option} `}>
          <img src='/Images/khaltipay.png' alt="Khalti" className={styles.payment_logo} onClick={handlePayment}/>
          <p>Pay with Khalti</p>
        </div>

        </div>
    )
}