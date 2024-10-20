import { useContext } from 'react';
import styles from '../Styles/Profile/CustomerProfile.module.css';
import { StoreContext } from '../Context/StoreContext';
export const MyProfile=()=>{

const{userName}=useContext(StoreContext);
    return(
        <>
        <div className={styles.main_container}>
            <h1>{`Profile of UserId:${userName}`}</h1>
        </div>
        </>
    )
}