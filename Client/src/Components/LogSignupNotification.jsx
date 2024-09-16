import { useEffect } from 'react'
import styles from '../Styles/Login_Signup/LogSignupNotification.module.css'
export const LogSignupNotification=({message,onClose,messageType})=>{

        useEffect(()=>{
            const timer=setTimeout(()=>{
            onClose();
            },3000)
            
         return()=>clearTimeout(timer);
        },[onClose])

        if(!message) return null;
        return(
            <>
            <div className={`${styles.notification_bar} ${styles[messageType]}`}>
                {message}
            </div>
            </>
        )
}

