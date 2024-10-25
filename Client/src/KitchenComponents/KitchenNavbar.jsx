import styles from '../Styles/Kitchen/KitchenNavbar.module.css'
import { useAuth } from '../Context/AuthContext';

export const KitchenNavbar=()=>{
    const{isOnline,handleToggle}=useAuth();
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
           
            
            </div>
        </>
    )
}