import { useAuth } from "../Context/AuthContext"
import { Navigate} from "react-router-dom";

export const ProtectedRoute=({children})=>{


    const{isAuthenticated}=useAuth();//from auth context

    return(
        isAuthenticated? children: <Navigate to='/login'/>
    )
};