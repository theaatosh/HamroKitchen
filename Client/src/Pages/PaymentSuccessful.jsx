import { useContext, useEffect } from 'react';
import styles from '../Styles/Payment/PaymentSuccessful.module.css'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext';
import axios from 'axios';

export const PaymentSuccessful = () => {
    const {paymentDetails,setPaymentDetails}=useContext(StoreContext);
    
    useEffect(()=>{
        const storedPaymentDetails=localStorage.getItem('paymentDetails');
        const parsed=JSON.parse(storedPaymentDetails)
        const {pidx}=parsed;
        getVerified(pidx);
        if(!paymentDetails&&storedPaymentDetails)
        {
            setPaymentDetails(JSON.parse(storedPaymentDetails));
        }
        console.log(paymentDetails);
        
      },[paymentDetails,setPaymentDetails])
      const getVerified=async(pidx)=> { 
          try {
            const token = localStorage.getItem('token');
            const tryK = await axios.post('http://localhost:5010/api/khaltiVerify', {pidx},{headers:{'Authorization': `Bearer ${token}`}});
            console.log(tryK);
    }
      catch(err){
        console.log(err);
      }}
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
        window.location.reload(); 
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

