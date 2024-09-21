import styles from '../Styles/Navbar.module.css';
import { FaUserCircle } from "react-icons/fa";

export const Navbar=()=>{


    return(
        <>
            <div className={styles.navbar}>
                <div className={styles.nav_logo}>
                <img src="./Images/NavbarLogo.png" alt="logo" />
                </div>
            
            <h1>Super Admin</h1>
            <div className={styles.user_logo_con}>
            <FaUserCircle className={styles.user_logo}/>
            </div>
            
            </div>
        </>
    )
}