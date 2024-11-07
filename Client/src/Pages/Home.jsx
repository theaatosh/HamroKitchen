import { ExploreMenu } from '../Components/ExploreMenu';
import { Landing } from '../Components/Landing';
import { FoodDisplay } from '../Components/FoodDisplay';
import { AboutUs } from '../Components/AboutUs';
import { FoodOptionModal } from '../Components/FoodOptionModal';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../Context/StoreContext';


export const Home = () => {
  const{token}=useContext(StoreContext);
  const[showModal,setShowModal]=useState(false);
  const handleOnClose=()=>{
    setShowModal(false);
  }
  useEffect(()=>{
    setShowModal(true);
    
  },[token])
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


