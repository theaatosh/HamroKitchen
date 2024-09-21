import { Outlet } from "react-router-dom"
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import styles from '../Styles/AdminLayout.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const AdminLayout=()=>{

    return(
        <>
        <div className={styles.admin_container}>
            <ToastContainer/>
        <Sidebar/>
        <div className={styles.inner_container}>
        <Navbar/>
        <Outlet/>

        </div>
       
        

        </div>
        </>
    )
}