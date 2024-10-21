
import styles from '../Styles/Profile/CustomerProfile.module.css';
import { useAuth } from '../Context/AuthContext';
export const MyProfile=()=>{

const{userDetails}=useAuth();
    return(
        <>
        <div className={styles.main_container}>
            <h1>{`Profile of UserId:${userDetails.userName}`}</h1>
        </div>
        </>
    )
}