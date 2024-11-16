import styles from '../Styles/Kitchen/KitchenNavbar.module.css'
import { useAuth } from '../Context/AuthContext';

export const KitchenNavbar=()=>{
    const{isKitchenOnline,handleToggle}=useAuth();
    const { profileData} = useAuth();
    
    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.nav_logo}>
                <img src="/Images/NavbarLogo.png" alt="logo" />
                </div>

                
                <div className={styles.greeting_con}>
                    {isKitchenOnline?(
                        <div className={styles.greeting}>
                            <p className={styles.greeting_text}>
                            Welcome, Chef <span className={styles.chef_name}>{(profileData?.userName)?.toUpperCase() || "Kitchen User"} </span> </p>
                    <p>Ready to cook  </p>
                        </div>):( <div className={styles.greeting}>
                            <p className={styles.greeting_text}>
                    Welcome, Chef <span className={styles.chef_name}>{(profileData?.userName)?.toUpperCase() || "Kitchen User"}</span>
                    </p>
                    <p>Turn online to start receiving orders.</p>
                        </div>)}
                    
                   
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