
import { useAuth } from "./AuthContext";
import { LoginPage } from "../Pages/Login";



export const AuthUser=({component})=>{
    const{login}=useAuth();
    const token=localStorage.getItem('token');

        if(token)
        {
            login();
        }
        return token? component :<LoginPage/>;
    
}