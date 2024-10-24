
import styles from '../Styles/Profile/CustomerProfile.module.css';
import { useAuth } from '../Context/AuthContext';
export const MyProfile=()=>{

const{userDetails}=useAuth();
    return(
        <>
        <div className={styles.main_container}>
            <h1>{`UserName :${userDetails.userName} and Role :${userDetails.role}`}</h1>
        </div>
        </>
    )
}