    import styles from '../Styles/ManageKitchen.module.css';
    import React from 'react';
    import axios from 'axios';
    import { useState } from 'react';
    import { useEffect } from 'react';
    import { FaCheckCircle } from "react-icons/fa";
    import { FaTimesCircle } from "react-icons/fa";
    import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

    export const ManageKitchen=()=>{
        const[kitchenDetails,setKitchenDetails]=useState([]);
        const[isLoading,setIsLoading]=useState(true);
        const manageKitchen=async()=>{
            try{
                const pendingcurElem=await axios.get('http://localhost:5010/api/manageKitchen');
                setIsLoading(true);
                    setKitchenDetails(pendingcurElem.data);
                    
                }
                catch(err)
                {
                    console.error("error fetching data",err);
                    toast.error(err.message);
                }
                finally{
                    setIsLoading(false);
                }
            }
        
        useEffect(()=>{
                manageKitchen();
                console.log(kitchenDetails);
                
        },[])
        
        //handle Kitchen Approve Function
        const handleKitchenApprove=async(curElem)=>{
            
            try{
                    const approveResponse=await axios.post('http://localhost:5010/api/manageKitchen/updateStatusRight',{
                        userName: curElem.userName,
                        email: curElem.email,
                        cookFoodItem: curElem.cookFoodItem,
                        cookLocation: curElem.cookLocation,
                        role: curElem.role
                    });
                    
                    toast.success(approveResponse.data,{autoClose:1500})
                    manageKitchen();
                    
            }
            catch(err)
            {
                    console.error("error approving kitchen",err);
                    toast.error(err);
            }
            
            
        }
        const handleKitchenReject=async(curElem)=>{
            try{
            const rejectResponse=await axios.post('http://localhost:5010/api/manageKitchen/updateStatusWrong',{
                userName: curElem.userName,
                email: curElem.email,
                cookFoodItem: curElem.cookFoodItem,
                cookLocation: curElem.cookLocation,
                role: curElem.role
            });
            toast.success(rejectResponse.data)
            manageKitchen();
            }
            catch(err)
            {
                console.error("error Rejecting  kitchen",err);
                toast.error(err);
            }
        }
        return(
            <>
                <div className={styles.main_container}>
                <ToastContainer/>
                    <div className={styles.manageKitchen_container}>
                        <h1>Kitchen Request</h1>
                        <div className={styles.manageKitchen_details_container}>
                            <div className={styles.manageKitchen_title}>
                                <p>UserName</p>
                                <p>Email</p>
                                <p>Food Items</p>
                                <p>Location</p>
                                <p>Status</p>
                                <p>App/Rej</p>
                            </div>
                            <hr /><hr />


                            
                            {/* Mapping through curElem */}
                            <div className={styles.detail_container}>
                            {isLoading?(
                            <p>Loading curElem details...</p>
                        ) : kitchenDetails.length>0 ?(  
                            kitchenDetails.map((curElem,index)=>{
                            return(
                            <React.Fragment key={curElem.id || index}>
                                <div className={styles.manageKitchen_detail} >
                                <p>{curElem.userName}</p>
                                <p>{curElem.email}</p>

                                {/* Displaying Food Items */}
                                <p>
                                    {curElem.cookFoodItem &&
                                    
                                        Object.keys(curElem.cookFoodItem).map((item,index,array) => (    
                                            <span key={index}>
                                                {item}
                                                {index < array.length - 1 && ","}
                                            </span>
                                        ))}
                                </p>

                                {/* Displaying Location */}
                                <p>
                                    Lat: {curElem.cookLocation.lat}, Lng: {curElem.cookLocation.lng}
                                </p>

                                <p>{curElem.role}</p>
                                <FaCheckCircle
                                    className={styles.accept_btn}
                                    onClick={() => handleKitchenApprove(curElem)}
                                />
                                <FaTimesCircle
                                    className={styles.reject_btn}
                                    onClick={() => handleKitchenReject(curElem)}
                                />
                                
                            </div>
                            <hr />
                            </React.Fragment>
                            )
                        
                        })
                            
                        ):(<p>No kitchen requests available.</p>)}
                        </div>

                        </div>
                    </div>
                </div>
            </>
        );
    }