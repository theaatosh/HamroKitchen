
import styles from '../Styles/Profile/CustomerProfile.module.css';
import { useAuth } from '../Context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../Context/StoreContext';
import axios from 'axios';
export const MyProfile=()=>{

const{userDetails}=useAuth();
const{token,setToken}=useContext(StoreContext);

// const [isEditing,setIsEditing]=useState(false);
const [profileData,setProfileData]=useState({
  
})

const getProfileData=async()=>{
    try{
        const res=await axios.get('http://localhost:5010/api/customer/customerProfile',{headers:{'Authorization':`Bearer ${token}`}})
        console.log(res.data);
        setProfileData(res.data);
    }
    catch(err){
        console.log(err.message);
        
    }
}

useEffect(()=>{
   
    
    if(token){
        getProfileData();
    }
    else{
        const savedToken=localStorage.getItem('token');
        setToken(savedToken);
    }
},[token])

// useEffect(()=>{
//     if(userDetails){
//         const{userName,role,email,phoneNumber}=userDetails;
//         console.log(role);
        
//         setProfileData({
//             userName:userName,
//             email:email,
//             phoneNumber:"9861492358",
//             role:role
//         })

//     }
// },[userDetails])

    // const handleChange=(e)=>{
    //     const{name,value}=e.target;
    //     setProfileData((preVal)=>({
    //         ...preVal,[name]:value,
    //     }))
    // }

    // const handleEditClick=(){

    // }
    // const handleSaveClick=(){

    // }

    return(
        <>
        <div className={styles.main_container}>

            <form action="">
                <label htmlFor="username">UserName:</label>
                <input type="text" name='username' id="username" value={profileData.userName} disabled/>
                <label htmlFor="email">Email:</label>
                <input type="email" name='email' id="email" value={profileData.email}  disabled/>
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input type="tel" name='phoneNumber' id="phoneNumber" value={profileData.phoneNumber} disabled/>
                <label htmlFor="role">Role:</label>
                <input type="text" name='role' id="role" value={profileData.role} disabled/>

                {/* {isEditing ? (<button>Save Changes</button>) :( <button >Edit Profile</button>)} */}
            </form>
        </div>
        </>

        // <>
        // <div className={styles.main_container}>
        //     <h1>{`UserName :${userDetails.userName} and Role :${userDetails.role}`}</h1>

        //     <form action="">
        //         <label htmlFor="username">UserName:</label>
        //         <input type="text" name='username' id="username"/>
        //         <label htmlFor="email">Email:</label>
        //         <input type="email" name='email' id="email" />
        //         <label htmlFor="phoneNumber">Phone Number:</label>
        //         <input type="tel" name='phoneNumber' id="phoneNumber"/>
        //         <label htmlFor="role">Role:</label>
        //         <input type="text" name='role' id="role" />

                
        //     </form>
        // </div>
        // </>
    )
}