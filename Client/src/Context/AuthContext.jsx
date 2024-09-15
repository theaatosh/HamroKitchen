import { createContext, useContext, useState } from "react";


 const AuthContext=createContext();
 export const useAuth=()=>useContext(AuthContext);


export const AuthContextProvider=({children})=>{

    const [isAuthenticated,setIsAuthenticated]=useState(false);

  const login=()=>setIsAuthenticated(true);
  const logout=()=>setIsAuthenticated(false);

    const authValue={
        isAuthenticated,
        login,
        logout
    }

  return(
    <AuthContext.Provider value={authValue}>
        {children}
    </AuthContext.Provider>
  )
}

