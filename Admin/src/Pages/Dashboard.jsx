import { TotalNoOfKitchens } from '../Components/Dashboard/TotalNoOfKitchens';
import styles from '../Styles/Dashboard.module.css';
export const Dashboard=()=>{


    return (
        <>
        <div className={styles.admin_dashboard_container}>
            <div className={styles.admin_inner_container}>
            <TotalNoOfKitchens quantity={5} topic={'Total no of kitchens'}/>
            <TotalNoOfKitchens quantity={6} topic={'Total no of customers'}/>
            <TotalNoOfKitchens quantity={4} topic={'Total Food Items'}/>
            <TotalNoOfKitchens quantity={2000} topic={'Total Turnover'}/>
            </div>
        </div>
        </>
    )
}