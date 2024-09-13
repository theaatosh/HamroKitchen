import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";
export const AppLayout=()=>{
    return(
        <div className="app">
            <header>  <Navbar/></header>
            <main><Outlet/></main>
           <footer> <Footer/></footer>
            </div>
    )
}