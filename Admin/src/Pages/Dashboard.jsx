import axios from 'axios';
import { TotalNoOfKitchens } from '../Components/Dashboard/TotalNoOfKitchens';
import styles from '../Styles/Dashboard.module.css';
import { useEffect } from 'react';
export const Dashboard=()=>{

        const fetchDetails=async()=>{

            try{
                console.log("hello");
                
                const response=await axios.get('http://localhost:5010/api/dashboard');
                console.log(response.data);
                
            }
            catch(error){
                console.log(error.message);
                
            }
        }
        useEffect(()=>{
            fetchDetails();
        },[])
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