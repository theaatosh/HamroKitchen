import { Outlet } from "react-router-dom"
import { KitchenNavbar } from "./KitchenNavbar"
import { KitchenSidebar } from "./KitchenSidebar"
import styles from '../Styles/Kitchen/KitchenLayout.module.css'

export const KitchenLayout=()=>{


    return(
        <>
        <div className={styles.kitchen_container}>
        <KitchenSidebar/>
        <div className={styles.inner_container}>
        <KitchenNavbar/>
        <div className={styles.outlet_container}>
        <Outlet/>

        </div>

        </div>
       
        

        </div>
        </>
    )
}