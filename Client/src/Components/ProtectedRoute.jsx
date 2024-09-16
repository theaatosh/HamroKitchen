import { useAuth } from "../Context/AuthContext"
import { Navigate} from "react-router-dom";

export const ProtectedRoute=({children})=>{


    const{isLoggedIn}=useAuth();//from auth context

    return(
        isLoggedIn? children: <Navigate to='/login'/>
    )
};