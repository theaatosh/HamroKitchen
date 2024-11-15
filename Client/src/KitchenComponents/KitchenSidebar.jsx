import { IoSettings } from "react-icons/io5";
import { IoFastFood } from "react-icons/io5";
import { GiCrossMark } from "react-icons/gi";
import { IoMenu } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { PiUserSwitchBold } from "react-icons/pi";
import styles from '../Styles/Kitchen/KitchenSidebar.module.css';
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
const routeArray=[
    {
        path:'/kitchen/dashboard',
        name:"Dashboard",
        icon:<MdSpaceDashboard className={styles.icon}/>
    },
    {
        path:'/kitchen/orders',
        name:"Orders",
        icon:<IoFastFood   className={styles.icon}/>
    },
    {
        path:'/',
        name:"Switch to customer",
        icon:<PiUserSwitchBold className={styles.icon}/>
    },
    {
        path:'/kitchen/settings',
        name:"Settings",
        icon:<IoSettings  className={styles.icon}/>
    },

]
export const KitchenSidebar=()=>{
    const[isOpen,setIsOpen]=useState(false);

    const {isKitchenOnline, setIsKitchenOnline,handleToggle,updateKitchenStatus}=useAuth();
    const handleMenuToggle=()=>{

        setIsOpen(!isOpen);
    }
    
    const handleSwitchCustomer=()=>{
       
        const status=localStorage.getItem('OnlineStatus');
        if(status){
            handleToggle();
        }
    }
    return (
        <>
        <div className={isOpen? styles.sidebar:styles.mini_sidebar}>
            <div className={styles.menu_icon}>{isOpen?(<GiCrossMark onClick={handleMenuToggle}/>):(<IoMenu onClick={handleMenuToggle}/>)}</div>
            <div className={styles.sidebar_options}>
                    {routeArray.map((curRoute,index)=>{ 
                        return(
                            
                            <NavLink to={curRoute.path}  className={({isActive})=>`${isOpen?styles.open_sidebar_option: styles.close_sidebar_option} ${isActive? styles.admin_active :""}`} key={index} onClick={curRoute.name==='Switch to customer'?handleSwitchCustomer:undefined}>
                            <div className={styles.icon} >{curRoute.icon}</div>
                            {isOpen&&<div className={styles.name}>{curRoute.name}</div>}
                        </NavLink>
                        );
                    })}
                </div>
        </div>
    </>
    )
}