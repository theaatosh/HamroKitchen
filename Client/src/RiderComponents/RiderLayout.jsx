import React from 'react'
import { RiderSidebar } from './RiderSidebar'
import { RiderNavbar } from './RiderNavbar'
import { Outlet } from 'react-router-dom'
import styles from '../Styles/Rider/RiderLayout.module.css'


export const RiderLayout = () => {
    return(
        <>
        <div className={styles.rider_container}>
        <RiderSidebar/>
        <div className={styles.inner_container}>
        <RiderNavbar/>
        <div className={styles.outlet_container}>
        <Outlet/>

        </div>

        </div>
       
        

        </div>
        </>
    )
}

