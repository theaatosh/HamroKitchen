import { createContext, useContext, useState } from "react";


 const AuthContext=createContext();
 export const useAuth=()=>useContext(AuthContext);


export const AuthContextProvider=({children})=>{

  //for user signup and login and message  
  const [showNotification,setShowNotification]=useState(false);
  const[message,setMessage]=useState('');//successfull and error message
  const[messageType,setMessageType]=useState('');//for setting the message type of success and error
  const [isLoggedIn,setIsLoggedIn]=useState(false);
    
  

  const login=()=>setIsLoggedIn(true);
  const logout=()=>setIsLoggedIn(false);

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

