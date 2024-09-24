import styles from "../Styles/Navbar/Navbar.module.css";
import { FaCartShopping } from "react-icons/fa6";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";
import { useAuth } from "../Context/AuthContext";
import { FaUser } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";

export const Navbar = () => {
  const { scrollToAbout, scrollToFooter, cartItems } = useContext(StoreContext);
  const{isLoggedIn,logout}=useAuth();
  const [activeMenu, setActiveMenu] = useState("Home");
  const[isUserMenuOpen,setIsUserMenuOpen]=useState(false);
  const toggleUserMenu=()=>{
    setIsUserMenuOpen(!isUserMenuOpen);
    console.log(isUserMenuOpen);
    
  }

  const cartItemsCount=Object.keys(cartItems).length;//no of items in cart
  
  return (
    <div className={styles.navbar}>
      <Link to="/">
        <img src="/Images/NavbarLogo.png" alt="logo" />
      </Link>
      <ul className={styles.navbar_menu}>
        <Link to="">
          <li
            onClick={() => setActiveMenu("Home")}
            className={`${activeMenu === "Home" ? styles.active : ""}`}
          >
            Home
          </li>
        </Link>


        <Link to="">
        <li
          onClick={() => {
            setActiveMenu("About Us");
            scrollToAbout();
          }}
          className={`${activeMenu === "About Us" ? styles.active : ""}`}
        >
          About Us
        </li>
        </Link>
        <li
          onClick={() => {
            setActiveMenu("Contact Us");
            scrollToFooter();
          }}
          className={`${activeMenu === "Contact Us" ? styles.active : ""}`}
        >
          Contact Us
        </li>
      </ul>
      <div className={styles.navbar_right}>
        <div className={styles.cart_icon_div}>
       <Link to="/cart">
          <FaCartShopping className={styles.cart_icon} />
        </Link>
        <div className={styles.cartItemsCount}>{cartItemsCount>0?`(${cartItemsCount})`:""}</div>
        </div>

        {/* this part is rendered only if the user is logged in  */}
          {isLoggedIn?(
            <>
            <div className={styles.notification_icon_con}>
            <IoMdNotifications className={styles.notification_icon}/>
            </div>
            <div className={styles.user_icon_con}>
            <FaUser  onClick={toggleUserMenu} className={styles.user_icon}/>

             {/* click garda khulne div ho  */}
            {isUserMenuOpen&&(
              <div className={styles.user_menu}>
                <Link to='/profile'><p className={styles.user_menu_p}>My Profile</p></Link><hr />
                <Link to='/kitchen/signUp'><p className={styles.user_menu_p}>Register as Kitchen</p></Link><hr />
                <p onClick={()=>logout()} className={styles.user_menu_p}>Logout</p>

              </div>
            )}
            </div>
            </>
            ):
          (
            <Link to="/login">
            <button className={styles.navbar_login_btn}>Login</button>
          </Link>
          )}
      </div>
    </div>
  );
};
