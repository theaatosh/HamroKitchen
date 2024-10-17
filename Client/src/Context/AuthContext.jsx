import { createContext, useContext, useEffect, useState } from "react";
import { StoreContext } from "./StoreContext";



 const AuthContext=createContext();
 export const useAuth=()=>useContext(AuthContext);


export const AuthContextProvider=({children})=>{

  //for user signup and login and message  
  const [showNotification,setShowNotification]=useState(false);
  const[message,setMessage]=useState('');//successfull and error message
  const[messageType,setMessageType]=useState('');//for setting the message type of success and error
  const [isLoggedIn,setIsLoggedIn]=useState(false);

  const {token,setToken}=useContext(StoreContext);
  
  
  
  const login=()=>{
    setIsLoggedIn(true);

    }
    
  const logout=()=>{
    console.log(token);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    setToken(null);
    console.log(token);
    
 
   
  };
  useEffect(() => {
   const storedToken=localStorage.getItem('token');
   console.log(storedToken);
   
  }, []);

    const authValue={
        isLoggedIn,
        login,
        logout,showNotification,setShowNotification,message,setMessage,messageType,setMessageType
    }

  return(
    <AuthContext.Provider value={authValue}>
        {children}
    </AuthContext.Provider>
  )
}

