import { Outlet } from "react-router-dom"
import { KitchenNavbar } from "./KitchenNavbar"
import { KitchenSidebar } from "./KitchenSidebar"
import styles from '../Styles/Kitchen/KitchenLayout.module.css'
import { useState } from "react"

export const KitchenLayout=()=>{
    const[isOpen,setIsOpen]=useState(false);

    const handleMenuToggle=()=>{

        setIsOpen(!isOpen);
    }

    return(
        <>
        <div className={styles.kitchen_container}>
        <KitchenSidebar isOpen={isOpen}/>
        <div className={styles.inner_container}>
        <KitchenNavbar handleMenuToggle={handleMenuToggle} isOpen={isOpen}/>
        <div className={styles.outlet_container}>
        <Outlet/>

        </div>

        </div>
       
        

        </div>
        </>
    )
}