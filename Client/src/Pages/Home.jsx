import { ExploreMenu } from '../Components/ExploreMenu';
import { Landing } from '../Components/Landing';
import { FoodDisplay } from '../Components/FoodDisplay';
import { AboutUs } from '../Components/AboutUs';


export const Home = () => {
    return (
   <>
    <Landing/>
    <ExploreMenu/>
    <FoodDisplay/>
    <AboutUs />
   </>
  )
}


