import { createContext, useContext, useEffect, useState } from "react";
import { StoreContext } from "./StoreContext";
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

 const AuthContext=createContext();
 export const useAuth=()=>useContext(AuthContext);


export const AuthContextProvider=({children})=>{

  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const[userDetails,setUserDetails]=useState({userName:'',role:''});
  const {setCartItems,token,setToken}=useContext(StoreContext);


  //for kitchen Chef
  const savedIsOnline=localStorage.getItem("OnlineStatus")==="true";
  // console.log(savedIsOnline);
  
  const [isKitchenOnline, setIsKitchenOnline] = useState(savedIsOnline);
    const handleToggle = () => {
       setIsKitchenOnline((prevState) =>{
         const newState=!prevState; 
         localStorage.setItem("OnlineStatus",newState);
         
         updateKitchenStatus(newState);

        return newState;
       })
        
    };
    const updateKitchenStatus=async(newState)=>{
      try{
        const res=await axios.post("http://localhost:5010/api/kitchen/getKitchenOnline", {newState},{headers:{'Authorization':`Bearer ${token}`}})
        console.log(res.data);
  
      }
      catch(err){
        console.log(err.message);
  
      }
     }

     useEffect(() => {
      if (token) {
        updateKitchenStatus(isKitchenOnline);
      } else {
      const savedToken = localStorage.getItem("token");
        if (savedToken) {
        setToken(savedToken);
        } else {
          console.log("no token found");
          
          // toast.error("No token found");
        }
      }
    }, [token]);


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
        userDetails,
        isKitchenOnline,setIsKitchenOnline,handleToggle
    }

  return(
    <AuthContext.Provider value={authValue}>
        {children}
    </AuthContext.Provider>
  )
}

