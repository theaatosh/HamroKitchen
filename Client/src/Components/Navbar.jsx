import styles from "../Styles/Navbar/Navbar.module.css";
import { FaCartShopping } from "react-icons/fa6";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";
import { useAuth } from "../Context/AuthContext";
import { FaUser } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { HiMiniBellAlert } from "react-icons/hi2";



export const Navbar = () => {
  const { scrollToAbout, scrollToFooter,scrollToDisplayFood, cartItems, setCartItems,setToken } = useContext(StoreContext);
  const{isLoggedIn,userDetails,profileData, setIsLoggedIn}=useAuth();
  const [activeMenu, setActiveMenu] = useState("Home");
  const[isUserMenuOpen,setIsUserMenuOpen]=useState(false);
  const[isNotificationOpen,setIsNotificationOpen]=useState(false);
  const [profileOpen,setProfileOpen]=useState(false);
  const[isVisible,setIsVisible]=useState(true);
  const[lastScrollY,setLastScrollY]=useState(0);
  const navigate=useNavigate();

//logout garne function
const logout=()=>{
  setIsLoggedIn(false);
  localStorage.removeItem('token');
  localStorage.removeItem('OnlineStatus');
  localStorage.removeItem('paymentDetails'); 
  
  setToken(null);
  setCartItems({});
  setIsUserMenuOpen(false);
  navigate('/');
};


  const toggleUserMenu=()=>{
    setIsUserMenuOpen((prevState)=>!prevState);
    setProfileOpen(false)
  }

  const toggleNotificationMenu=()=>{
      setIsNotificationOpen((preState)=>!preState)
  }
  const handleScroll=()=>{    
    let currentScrollY=window.scrollY;
  
    
    if(currentScrollY>lastScrollY)
    {
      setIsVisible(false)
      
    }
    else{
      setIsVisible(true);
      
    }
    setLastScrollY(currentScrollY);
  }
  useEffect(()=>{
    window.addEventListener('scroll',handleScroll)
    return()=>window.removeEventListener('scroll',handleScroll)
  },[lastScrollY])

 

  //userMenu banda garne if outside the menu click bhayo bhane
  const userMenuRef=useRef(null);
     useEffect(()=>{
      const handleClickOutside = (event) => {
        if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
          setIsUserMenuOpen(false);
          setProfileOpen(false)
        }

        if(notiMenuRef.current&& !notiMenuRef.current.contains(event.target)){
          setIsNotificationOpen(false)
          
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

  
  const notiMenuRef=useRef(null);
  
    //for profile toggle
    const handleProfileOpen=()=>{
      setProfileOpen((preval)=>!preval);
    }
  return (
    <div className={`${styles.navbar} ${isVisible?styles.visible:styles.hidden}` }>
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
            <div ref={notiMenuRef} className={styles.notification_icon_con} >
              <IoMdNotifications onClick={toggleNotificationMenu} className={styles.notification_icon}/> 
              {isNotificationOpen&& (
                <div  className={styles.notification_menu}>
                  <div className={styles.notification}> 
                  <HiMiniBellAlert />
                  <p className={styles.notification_item}>Notificationbkjbkbkbkbkbkbk 1</p>
                  </div>
                  <div className={styles.notification}> 
                  <HiMiniBellAlert />
                  <p className={styles.notification_item}>Notification 2</p>
                  </div>
                  <div className={styles.notification}> 
                  <HiMiniBellAlert />
                  <p className={styles.notification_item}>Notification 3</p>
                  </div>
                  
                </div>
              )}
              </div>
            <div className={styles.user_icon_con} ref={userMenuRef}>
            <FaUser  onClick={toggleUserMenu} className={styles.user_icon}/>

             {/* click garda khulne div ho  */}
            {isUserMenuOpen&&(
              <div className={styles.user_menu} >
                <p className={styles.user_menu_p} onClick={handleProfileOpen}>Profile</p><hr />
                
                {profileOpen&& 
                <div className={styles.profile_container}>
                    <div className={styles.profile_inner}>
                    <div className={styles.profile_header}>
                    <img src="/Images/KitchenUser.png" alt="Profile" className={styles.profile_image} />
                    <h2 className={styles.username}>{profileData.userName || 'User Name'}</h2>
                    <p className={styles.role}>{profileData.email}</p>
                </div><hr />
                    <div className={styles.edit_profile}>
                     <Link to={`/profile/${profileData.userName}`}>
                     <p>Edit Profile</p>
                     </Link> 
                      </div>          

                    </div>
                </div> }

                {/* <Link to={`/profile/${userDetails.userName}`}><p className={styles.user_menu_p}>My Profile</p></Link><hr /> */}
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
                  {/* rider ko lagi */}
                    {userDetails.role==='kitchen'?(
                  <>
                  <Link to='/rider/dashboard'><p className={styles.user_menu_p}>Rider Dashboard</p></Link><hr />
                  </>
                  )
                  :
                  (
                    <>
                    <Link to='/rider/signUp'><p className={styles.user_menu_p}>Register as Rider</p></Link><hr />
                    </>
                    )
                  }
                <p onClick={logout} className={styles.user_menu_p}>Logout</p>
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
                    
                  
                
                

