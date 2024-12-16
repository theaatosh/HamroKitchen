import styles from '../Styles/Navbar.module.css';
import { FaUserCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";


export const Navbar=({handleMenuToggle})=>{


    return(
        <>
            <div className={styles.navbar}>
                                <div className={styles.menu_icon}><IoMenu onClick={handleMenuToggle}/></div>
                
                <div className={styles.nav_logo}>
                <img src="./Images/NavbarLogo.png" alt="logo" />
                </div>
            
            <h1>Admin</h1>
            <div className={styles.user_logo_con}>
            <FaUserCircle className={styles.user_logo}/>
            </div>
            
            </div>
        </>
    )
}