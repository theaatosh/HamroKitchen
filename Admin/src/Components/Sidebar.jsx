import { NavLink } from 'react-router-dom';
import styles from '../Styles/Sidebar.module.css';
import { IoSettings } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { FaKitchenSet } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { IoFastFoodSharp } from "react-icons/io5";
import { useState } from 'react';
const routeArray=[
    {
        path:'/',
        name:"Dashboard",
        icon:<MdDashboard  className={styles.icon}/>
    },
    {
        path:'/addItems',
        name:"AddItems",
        icon:<IoIosAddCircle className={styles.icon}/>
    },
    {
        path:'/manageKitchen',
        name:"Manage Kitchen",
        icon:<FaKitchenSet className={styles.icon}/>
    },
    {
        path:'/manageKitchen',
        name:"Manage Kitchen",
        icon:<FaKitchenSet className={styles.icon}/>
    },
    {
        path:'/manageFoodItems',
        name:"Manage Food Items ",
        icon:<IoFastFoodSharp  className={styles.icon}/>
    },
    {
        path:'/settings',
        name:"Settings",
        icon:<IoSettings className={styles.icon}/>
    }
]
export const Sidebar=()=>{

    const[isOpen,setIsOpen]=useState(false);
    const handleMenuToggle=()=>{

        setIsOpen(!isOpen);
    }
    
    
    return(
        <>
            <div className={isOpen? styles.sidebar:styles.mini_sidebar}>
                <div className={styles.menu_icon}><IoMenu onClick={handleMenuToggle}/></div>
                <div className={styles.sidebar_options}>
                        {routeArray.map((curRoute)=>{ 
                            return(
                                
                                <NavLink to={curRoute.path} className={({isActive})=>`${isOpen?styles.open_sidebar_option: styles.close_sidebar_option} ${isActive? styles.admin_active :""}`} key={curRoute.name}>
                                <div className={styles.sidebar.icon}>{curRoute.icon}</div>
                                {isOpen&&<div className={styles.sidebar.name}>{curRoute.name}</div>}
                            </NavLink>
                            );
                        })}
                    </div>
            </div>
        </>
    
)
    
}