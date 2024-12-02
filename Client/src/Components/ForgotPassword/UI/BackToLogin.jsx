import styles from '../../../Styles/ForgotPassword/BackToLogin.module.css'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
export const BackToLogin = () => {
    const navigate=useNavigate();
     const navigateHandler=()=>{
navigate('/login');

     }
  return (
    <div className={styles.back_to_login_btn} onClick={navigateHandler}>
      <IoMdArrowRoundBack />Back to login
    </div>
  )
}
  

