import { ExploreMenu } from '../Components/ExploreMenu';
import { Landing } from '../Components/Landing';
import { FoodDisplay } from '../Components/FoodDisplay';
import { AboutUs } from '../Components/AboutUs';
import { FoodOptionModal } from '../Components/FoodOptionModal';
import { useAuth } from '../Context/AuthContext';
import { RecomendedFood } from '../Components/RecomendedFood';


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
    <RecomendedFood/>
    <FoodDisplay/>
    <AboutUs />
   </>
  )
}


