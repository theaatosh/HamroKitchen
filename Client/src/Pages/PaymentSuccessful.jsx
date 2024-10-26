import { useEffect } from 'react';
import styles from '../Styles/Payment/PaymentSuccessful.module.css'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const PaymentSuccessful = () => {
    const navigate=useNavigate();
    const showPaymentSuccessful=()=>{

        Swal.fire({
            title: 'Payment Successful!',
            text: 'Your order has been placed successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
    }
    const handleNavigate=()=>{
        navigate('/');
    }
    useEffect(()=>{
        showPaymentSuccessful();
    },[])
  return (
    <div className={styles.main_container}>
        {/* <div className={styles.inner_container}> 
        <h1>Payment Successful!</h1> 
            <p>Your order has been placed successfully.</p>

        </div> */}
        <button onClick={handleNavigate}>GO back to Home Page</button>
    </div>
  )
}

