import axios from 'axios';
import { TotalNoOfKitchens } from '../Components/Dashboard/TotalNoOfKitchens';
import styles from '../Styles/Dashboard.module.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { Loading } from '../Components/Loading';
import { Pie } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { OrderDetails } from '../Components/Dashboard/OrderDetails';
import { TotalTurnOver } from '../Components/Dashboard/TotalTurnOver';
ChartJS.register(ArcElement, Tooltip, Legend);
export const Dashboard=()=>{

    const [userDetails,setUserDetails]=useState(null);
    const [chartData,setChartData]=useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
        const fetchDetails=async()=>{
            try{     
                setIsLoading(true);           
                const response=await axios.get('http://localhost:5010/api/dashboard');
                console.log(response);
                
                setUserDetails(response.data);
                
                const {  totalCustomer, totalKitchen } = response.data;
                setChartData({
                    labels:["Total Customers","Total Kitchens"],
                    datasets:[{
                        data:[totalCustomer, totalKitchen],
                        backgroundColor:["#36A2EB", "#FF6384", "#FFCE56"],
                        hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"]
                    }]
                })
                
            }
            catch(error){
                console.log(error);
                
            }
            finally{
                setIsLoading(false);
            }
        }
        useEffect(()=>{
            fetchDetails();
        },[])
        

    return (
        <>
        <div className={styles.admin_dashboard_container}>
            { isLoading?(
               <div className={styles.loading}><Loading/></div>
            ):( userDetails&&(
                <div className={styles.outer_con}>
                    <h1 className={styles.heading}>Overview</h1>
                <div className={styles.user_detail_container}>
                    <div className={styles.user_detail_inner_container}>
                <TotalNoOfKitchens quantity={userDetails.totalUsers} topic={'Total no of users'}/>
                <TotalNoOfKitchens quantity={userDetails.totalCustomer} topic={'Total no of customers'}/>
                <TotalNoOfKitchens quantity={userDetails.totalKitchen} topic={'Total no of kitchens'}/>

                    </div>
                
                {chartData&&
                <div className={styles.pie_chart_con}>
                    <p style={{fontSize:"3vh"}}>Total Users: {chartData?.datasets[0]?.data.reduce((a, b) => a + b, 0) || 0}</p>
                    <Pie data={chartData}/>
                </div>
                }
                </div>
                </div>
                )
            )  }

                {/* orders detail display container  */}
                 {!isLoading&&userDetails&&(  
                     <div className={styles.right_container}>
                    <h1 className={styles.heading}>Orders Summary</h1>
                        <div className={styles.order_detail_container}>
                    <OrderDetails quantity={userDetails.totalOrders} topic={"Total Orders"}/>
                    <OrderDetails quantity={userDetails.totalOrdersCompleted} topic={"Completed Orders"}/>
                    <OrderDetails quantity={userDetails.totalPendingOrders} topic={"Pending Orders"}/>
                    <OrderDetails quantity={userDetails.totalFoodItems} topic={"Food Items"}/>
                </div>

                <div className={styles.amount_detail_con}>
                <h1 className={styles.heading}>Revenue</h1>
                    <div className={styles.amount_inner_con}>
                    <TotalTurnOver quantity={userDetails.totalAmount} topic={"Total TurnOver"}/>
                    <TotalTurnOver quantity={userDetails.totalAmount} topic={"Average TurnOver"}/>

                    </div>
                </div>
                </div>)}
                    
                    
                


        </div>
        </>
    )
}