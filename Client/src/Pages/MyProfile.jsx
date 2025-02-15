
// import styles from '../Styles/Profile/CustomerProfile.module.css';
// import { useAuth } from '../Context/AuthContext';
// import { useContext, useEffect, useState } from 'react';
// import { StoreContext } from '../Context/StoreContext';
// import axios from 'axios';
// export const MyProfile=()=>{

// const{userDetails}=useAuth();
// const{token,setToken}=useContext(StoreContext);

// // const [isEditing,setIsEditing]=useState(false);
// const [profileData,setProfileData]=useState({})

// const getProfileData=async()=>{
//     try{
//         const res=await axios.get('http://localhost:5010/api/customer/customerProfile',{headers:{'Authorization':`Bearer ${token}`}})
//         console.log(res.data);
//         setProfileData(res.data);
//     }
//     catch(err){
//         console.log(err.message);
        
//     }
// }

// useEffect(()=>{
//    if(token){
//         getProfileData();
//     }
//     else{
//         const savedToken=localStorage.getItem('token');
//         setToken(savedToken);
//     }
// },[token])

// // useEffect(()=>{
// //     if(userDetails){
// //         const{userName,role,email,phoneNumber}=userDetails;
// //         console.log(role);
        
// //         setProfileData({
// //             userName:userName,
// //             email:email,
// //             phoneNumber:"9861492358",
// //             role:role
// //         })

// //     }
// // },[userDetails])

//     // const handleChange=(e)=>{
//     //     const{name,value}=e.target;
//     //     setProfileData((preVal)=>({
//     //         ...preVal,[name]:value,
//     //     }))
//     // }

//     // const handleEditClick=(){

//     // }
//     // const handleSaveClick=(){

//     // }

//     return(
//         <>
//         <div className={styles.main_container}>

//             <form action="">
//                 <div className={styles.field_wrapper}>
//                 <label htmlFor="username">UserName:</label>
//                 <input type="text" name='username' id="username" value={profileData.userName} disabled/>
//                 </div>
//                 <div className={styles.field_wrapper}>
//                 <label htmlFor="email">Email:</label>
//                 <input type="email" name='email' id="email" value={profileData.email}  disabled/>

//                 </div>
//                 <div className={styles.field_wrapper}>
//                 <label htmlFor="phoneNumber">Phone Number:</label>
//                 <input type="tel" name='phoneNumber' id="phoneNumber" value={profileData.phoneNumber} disabled/>

//                 </div>
//                 <div className={styles.field_wrapper}>
//                 <label htmlFor="role">Role:</label>
//                 <input type="text" name='role' id="role" value={profileData.role} disabled/>
//                 </div>
//                 <div className={styles.field_wrapper}>
//                 <label htmlFor="kitchenCapacity"> Kitchen capacity:</label>
//                 <input type="text" name='kitchenCapacity' id="kitchenCapacity" value={profileData.weighted} disabled/>
//                 </div>

//                 {/* {isEditing ? (<button>Save Changes</button>) :( <button >Edit Profile</button>)} */}
//             </form>
//         </div>
//         </>

     
//     )
// }

import React, { useEffect, useState } from 'react';
import styles from '../Styles/Profile/CustomerProfile.module.css';
import { useAuth } from '../Context/AuthContext';

export const MyProfile = () => {
    const { profileData} = useAuth();
    const [isEditing,setIsEditing]=useState(false);

    const [profileInfo,setProfileInfo]=useState({
        userName:profileData?.userName||"",
        email:profileData?.email||"",
        phoneNumber:profileData?.phoneNumber||"",
    })
    const handleOnChange=(e)=>{
        const {name,value}=e.target;
        setProfileInfo((prev)=>({
            ...prev,[name]:value
        }))
    }

    const handleEditChange=(e)=>{
        e.preventDefault();
        setIsEditing((prev)=>!prev)
    }
    useEffect(()=>{
            if(profileData){
                setProfileInfo({userName:profileData.userName||"",
                    email:profileData.email||"",
                    phoneNumber:profileData.phoneNumber||""})
            }
    },[profileData])

    const handleSaveChanges=()=>{
            console.log(profileInfo);
            
        setIsEditing(false)
    }
    return (
        <div className={styles.main_container}>
            <div className={styles.profile_card}>
                <div className={styles.profile_header}>
                    <h2 className={styles.username}>{profileData.userName || 'User Name'}</h2>
                    <p className={styles.role}>{profileData.role || 'Customer'}</p>
                </div>
                <form className={styles.profile_form}>
                    <div className={styles.field_wrapper}>
                        <label htmlFor="username">UserName:</label>
                        <input type="text" id="username" value={profileInfo.userName} name='userName' onChange={handleOnChange} disabled={!isEditing}/>
                    </div>
                    <div className={styles.field_wrapper}>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={profileInfo.email} name='email' onChange={handleOnChange} disabled={!isEditing} />
                    </div>
                    <div className={styles.field_wrapper}>
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input type="tel" id="phoneNumber" value={profileInfo.phoneNumber} name='email' onChange={handleOnChange} disabled={!isEditing}/>
                    </div>
                    {profileData.role==="kitchen"&& 
                    <div className={styles.field_wrapper}>
                    <label htmlFor="kitchenCapacity">Kitchen Capacity:</label>
                    <input type="text" id="kitchenCapacity" value={profileData.weighted} disabled/>
                </div>
                    }
                    
                <div className={styles.btns}>
                    {isEditing ? (<button type='submit' className={styles.saveChanges_btn} onClick={handleSaveChanges}>Save Changes</button>) :( <button type='button' className={styles.edit_btn} onClick={handleEditChange}>Edit Profile</button>)}
                </div>
                </form>


            </div>
        </div>
    );
};
