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
        }).then((result)=>{
            if(result.isConfirmed){
                navigate('/');
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
        <button  onClick={handleNavigate}className={styles.go_home_btn}>Go back to Home Page</button>
    </div>
  )
}

