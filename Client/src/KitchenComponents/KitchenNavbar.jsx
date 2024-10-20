import { useState } from 'react';
import styles from '../Styles/Kitchen/KitchenNavbar.module.css'

export const KitchenNavbar=()=>{
    const [isOnline, setIsOnline] = useState(true);
    const handleToggle = () => {
        setIsOnline((prevState) => !prevState); // Toggle between true and false
    };
    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.nav_logo}>
                <img src="/Images/NavbarLogo.png" alt="logo" />
                </div>
            
           
            <div className={styles.online_offline_con} style={{backgroundColor: isOnline? 'green':'red'}} onClick={handleToggle}>
                <div className={`${styles.toggle_btn} ${isOnline?styles.online :styles.offline}`} >
                    <span>{isOnline?'Online':'Offline'}</span>
                    </div>
            </div>
            <div className={styles.user_logo_con}>
            <img src="/Images/PP.jpg" alt="chef_photo" />
            </div>
            
            </div>
        </>
    )
}