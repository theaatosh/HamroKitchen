import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"


export const KitchenProtectedRoute = ({children}) => {

    const{userDetails}=useAuth();
  return (
    <div>
      {userDetails.role==='kitchen'? children :<Navigate to='/kitchen/Signup'/>}
    </div>
  )
}

