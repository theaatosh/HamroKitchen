import { createContext, useContext, useEffect, useState } from "react";
import { StoreContext } from "./StoreContext";
import {jwtDecode} from 'jwt-decode';

 const AuthContext=createContext();
 export const useAuth=()=>useContext(AuthContext);


export const AuthContextProvider=({children})=>{

  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const[userDetails,setUserDetails]=useState({userName:'',role:''});
  const {setCartItems,token,setToken}=useContext(StoreContext);

  const userCredentials=(token)=>{
    try{
      const decodedToken=jwtDecode(token);
      const{userName,role}=decodedToken;
      setUserDetails({userName,role})
      
    }
    catch(error){
      console.log(error);
      
    }
  }
  //on every refresh token is fetched from localstorage and then passed to userCredentials
  useEffect(()=>{
    const token=localStorage.getItem('token');
    userCredentials(token);

},[])

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
        logout,
        userCredentials,
        userDetails
    }

  return(
    <AuthContext.Provider value={authValue}>
        {children}
    </AuthContext.Provider>
  )
}

