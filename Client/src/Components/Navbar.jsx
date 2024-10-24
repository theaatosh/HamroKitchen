import styles from "../Styles/Navbar/Navbar.module.css";
import { FaCartShopping } from "react-icons/fa6";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";
import { useAuth } from "../Context/AuthContext";
import { FaUser } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";



export const Navbar = () => {
  const { scrollToAbout, scrollToFooter,scrollToDisplayFood, cartItems } = useContext(StoreContext);
  const{isLoggedIn,logout,userDetails}=useAuth();
  const [activeMenu, setActiveMenu] = useState("Home");
  const[isUserMenuOpen,setIsUserMenuOpen]=useState(false);
  
  const toggleUserMenu=()=>{
    setIsUserMenuOpen((prevState)=>!prevState);

  }

 

  //userMenu banda garne if outside the menu click bhayo bhane
  const userMenuRef=useRef(null);
     useEffect(()=>{
      const handleClickOutside = (event) => {
        if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
          setIsUserMenuOpen(false);
        }
      };
  
      // Add the event listener
      document.addEventListener("mousedown", handleClickOutside);
  
      // Cleanup the event listener on unmount
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    },[])
    
  const cartItemsCount=Object.keys(cartItems).filter(key=>cartItems[key]>0).length;//no of items in cart
  // console.log(cartItemsCount);
  // console.log(JSON.stringify(cartItems,null ,2));
  
  
  
  return (
    <div className={styles.navbar}>
      {/* for logo  */}
      <Link to="/">
        <img src="/Images/NavbarLogo.png" alt="logo" />
      </Link>

      <ul className={styles.navbar_menu}>
        {/* for home  */}
        <Link to="">
          <li
            onClick={() => setActiveMenu("Home")}
            className={`${activeMenu === "Home" ? styles.active : ""}`}
          >
            Home
          </li>
        </Link>
        {/* for food items  */}
        <Link to="">
        <li
          onClick={() => {
            setActiveMenu("FoodItems");
            scrollToDisplayFood();
            console.log('hello');
            
          }}
          className={`${activeMenu === "FoodItems" ? styles.active : ""}`}
        >
          Food Items
        </li>
        </Link>
        {/* for about us  */}
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

        {/* for contact Us  */}
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
            <div className={styles.user_icon_con} ref={userMenuRef}>
            <FaUser  onClick={toggleUserMenu} className={styles.user_icon}/>

             {/* click garda khulne div ho  */}
            {isUserMenuOpen&&(
              <div className={styles.user_menu} >
                <Link to={`/profile/${userDetails.userName}`}><p className={styles.user_menu_p}>My Profile</p></Link><hr />
                <Link to='/myorders'><p className={styles.user_menu_p}>My Orders</p></Link><hr />
                {userDetails.role==='kitchen'?(
                  <>
                  <Link to='/kitchen/dashboard'><p className={styles.user_menu_p}>Kitchen Dashboard</p></Link><hr />
                  </>
                  )
                  :
                  (
                    <>
                    <Link to='/kitchen/signUp'><p className={styles.user_menu_p}>Register as Kitchen</p></Link><hr />
                    </>
                    )
                  }
                <p onClick={()=>logout(setIsUserMenuOpen)} className={styles.user_menu_p}>Logout</p>
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
                    
                  
                
                

