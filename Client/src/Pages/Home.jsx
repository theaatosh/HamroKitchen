import { ExploreMenu } from '../Components/ExploreMenu';
import { Landing } from '../Components/Landing';
import { FoodDisplay } from '../Components/FoodDisplay';
import { AboutUs } from '../Components/AboutUs';
import { FoodOptionModal } from '../Components/FoodOptionModal';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../Context/StoreContext';
import { useAuth } from '../Context/AuthContext';


export const Home = () => {
  const{showModal,setShowModal}=useAuth();
  
  const handleOnClose=()=>{
    setShowModal(false);
  }
  
    return (
   <>
    {showModal&&<FoodOptionModal onClose={handleOnClose} />}
    <Landing/>
    <ExploreMenu/>
    <FoodDisplay/>
    <AboutUs />
   </>
  )
}


