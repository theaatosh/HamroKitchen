import { createContext, useContext, useEffect, useState } from "react";
import { StoreContext } from "./StoreContext";

 const AuthContext=createContext();
 export const useAuth=()=>useContext(AuthContext);


export const AuthContextProvider=({children})=>{

  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const {setCartItems,token,setToken}=useContext(StoreContext);

   const login=()=>{
    setIsLoggedIn(true);
  }
  
  useEffect(()=>{
  if(token)
    {
      setIsLoggedIn(true);
      
    }
  },[token])
  
  const logout=(setIsUserMenuOpen)=>{
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    setToken(null);
    setCartItems({});
    setIsUserMenuOpen(false);
 };
const authValue={
        isLoggedIn,
        login,
        logout
    }

  return(
    <AuthContext.Provider value={authValue}>
        {children}
    </AuthContext.Provider>
  )
}

