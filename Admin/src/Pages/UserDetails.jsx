import { CustomerDetails } from '../Components/CustomerDetails'
import { KitchenDetails } from '../Components/KitchenDetails'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from '../Styles/UserDetails.module.css';
import {Loading} from '../Components/Loading';
export const UserDetails = () => {
  const [userDetails,setUserDetails]=useState();
  const[isLoading,setIsLoading]=useState(false);

  const fetchUserDetails=async()=>{    
    try{
      setIsLoading(true);
      const res=await axios.get('http://localhost:5010/api/users'); 
           
      setUserDetails(res.data);
      
    }catch(error){
      console.log(error);
      
    }
    finally{
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    fetchUserDetails();
  },[])
  return (
    <div className={styles.user_details_container}>
      {isLoading? <div className={styles.loading}><Loading/></div>: (userDetails&&
      <>
      <CustomerDetails  customer={userDetails.customers} fetchUserDetails={fetchUserDetails} />
      <KitchenDetails  kitchen={userDetails.kitchens} fetchUserDetails={fetchUserDetails}/>
      
      
      </>
      )}
      
    </div>
  )
}

