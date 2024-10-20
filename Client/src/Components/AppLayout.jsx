import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
// import { App } from "../App";
export const AppLayout=()=>{
    
    return(
        <div className="app">
            <header>  <Navbar/>
            <ToastContainer/>
            </header>
            <main>
                <Outlet/>
            </main>
           <footer> <Footer/></footer>
            </div>
    )
}