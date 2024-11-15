import styles from '../Styles/Kitchen/KitchenNavbar.module.css'
import { useAuth } from '../Context/AuthContext';

export const KitchenNavbar=()=>{
    const{isKitchenOnline,handleToggle}=useAuth();
    
    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.nav_logo}>
                <img src="/Images/NavbarLogo.png" alt="logo" />
                </div>
            
           
            <div className={styles.online_offline_con}  onClick={handleToggle}>
                <div className={`${styles.toggle_btn} ${isKitchenOnline?styles.online :styles.offline}`} >
                    <span>{isKitchenOnline?'Online':'Offline'}</span>
                    </div>
            </div>
           
            
            </div>
        </>
    )
}