
import { CompletedOrder } from '../KitchenComponents/kitchenDetails/CompletedOrder';
import { CookingOrder } from '../KitchenComponents/kitchenDetails/CookingOrder';
import { NewOrder } from '../KitchenComponents/kitchenDetails/NewOrder';
import { Revenue } from '../KitchenComponents/kitchenDetails/Revenue';
import styles from '../Styles/Kitchen/KitchenPages/KitchenDashboard.module.css';
export const KitchenDashboard=()=>{

    return(
        <div className={styles.dashboard_container}>
            <div className={styles.upper_div}>
            <NewOrder/>
            <CookingOrder/>
            <CompletedOrder/>
            <Revenue/>
            </div>
        </div>  
    )
}