import { createContext, useContext, useEffect, useState } from "react";
import { StoreContext } from "./StoreContext";
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

 const AuthContext=createContext();
 export const useAuth=()=>useContext(AuthContext);


export const AuthContextProvider=({children})=>{


  const[showModal,setShowModal]=useState(false);//for  food preferences modal 
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const[userDetails,setUserDetails]=useState({userName:'',role:'',viewed:false});
  const {token,setToken}=useContext(StoreContext);


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
        await axios.post("http://localhost:5010/api/kitchen/getKitchenOnline", {newState},{headers:{'Authorization':`Bearer ${token}`}})
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

    //for rider online offline ko lagi
  //   const savedRiderIsOnline=localStorage.getItem("riderOnlineStatus")==="true";
  //   const [isRiderOnline, setIsRiderOnline] = useState(savedIsOnline);

  //   const handleRiderToggle = () => {
  //     setIsRiderOnline((prevState) =>{
  //       const newState=!prevState; 
  //       localStorage.setItem("riderOnlineStatus",newState);
        
  //       updateKRiderStatus(newState);

  //      return newState;
  //     })
       
  //  };
    


//information extracted from jwt
  const userCredentials=(token)=>{
    try{
      const decodedToken=jwtDecode(token);
      
      const{userName,role,viewed}=decodedToken;
      setUserDetails({userName,role,viewed})
      
    }
    catch(error){
      console.log(error.message);
      
    }
  }
  //on every refresh token is fetched from localstorage and then passed to userCredentials
  useEffect(()=>{
    const token=localStorage.getItem('token');
    if(token){
      userCredentials(token);
    }


},[])

   const login=(token)=>{
    setIsLoggedIn(true);
    const decodedToken=jwtDecode(token);
    const{viewed}=decodedToken;
      if(viewed===false){
        
        setShowModal(true);
      }else{
        setShowModal(false);
      }
    
  }
  useEffect(()=>{
  if(token)
    {
      setIsLoggedIn(true);
      
    }
  },[token])
  
  

//profile page ko lagi
const [profileData, setProfileData] = useState({});

const getProfileData = async () => {
    try {
        const res = await axios.get('http://localhost:5010/api/customer/customerProfile', {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        setProfileData(res.data);
    } catch (err) {
        console.log(err.message);
    }
};


useEffect(() => {
    if (token) {
        getProfileData();
    } else {
        const savedToken = localStorage.getItem('token');
        setToken(savedToken);
    }
}, [token]);

const authValue={
  isLoggedIn,
  login,
  userCredentials,
  userDetails,
  isKitchenOnline,setIsKitchenOnline,handleToggle,profileData,setProfileData,setShowModal,showModal,setIsLoggedIn
  ,updateKitchenStatus
}
  return(
    <AuthContext.Provider value={authValue}>
        {children}
    </AuthContext.Provider>
  )
}

