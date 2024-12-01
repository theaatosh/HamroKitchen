import React from 'react'
import { CustomerDetails } from '../Components/CustomerDetails'
import { KitchenDetails } from '../Components/KitchenDetails'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from '../Styles/UserDetails.module.css';
export const UserDetails = () => {
  const [userDetails,setUserDetails]=useState([
    {
      id: 1,
      name: "Aarav Sharma",
      email: "aarav.sharma@example.com",
      role: "customer",
      phone: "+977-9812345678",
    },
    {
      id: 2,
      name: "Sita Rana",
      email: "sita.rana@example.com",
      role: "kitchen",
      phone: "+977-9808765432",
      kitchenName: "Sita's Kitchen",
    },
    {
      id: 3,
      name: "Manoj Karki",
      email: "manoj.karki@example.com",
      role: "customer",
      phone: "+977-9841234567",
    },
    {
      id: 4,
      name: "Rita Bhattarai",
      email: "rita.bhattarai@example.com",
      role: "kitchen",
      phone: "+977-9823456789",
      kitchenName: "Rita's Bites",
    },
    {
      id: 5,
      name: "Prakash Gurung",
      email: "prakash.gurung@example.com",
      role: "customer",
      phone: "+977-9818765432",
    },
    {
      id: 6,
      name: "Anita Tamang",
      email: "anita.tamang@example.com",
      role: "kitchen",
      phone: "+977-9846543210",
      kitchenName: "Anita's Kitchen Delights",
    },
    {
      id: 7,
      name: "Keshav Thapa",
      email: "keshav.thapa@example.com",
      role: "customer",
      phone: "+977-9816547890",
    },
    {
      id: 8,
      name: "Sarita Shrestha",
      email: "sarita.shrestha@example.com",
      role: "kitchen",
      phone: "+977-9825678934",
      kitchenName: "Sarita's Homestyle Cooking",
    },
    {
      id: 9,
      name: "Binod Chaudhary",
      email: "binod.chaudhary@example.com",
      role: "customer",
      phone: "+977-9801234567",
    },
    {
      id: 10,
      name: "Puja Lamsal",
      email: "puja.lamsal@example.com",
      role: "kitchen",
      phone: "+977-9842345678",
      kitchenName: "Puja's Spice Hub",
    },
    {
      id: 11,
      name: "Rahul Singh",
      email: "rahul.singh@example.com",
      role: "customer",
      phone: "+977-9813456789",
    },
    {
      id: 12,
      name: "Sunita Pathak",
      email: "sunita.pathak@example.com",
      role: "kitchen",
      phone: "+977-9809876543",
      kitchenName: "Sunita's Fusion Kitchen",
    },
    {
      id: 13,
      name: "Dipesh Maharjan",
      email: "dipesh.maharjan@example.com",
      role: "customer",
      phone: "+977-9810987654",
    },
    {
      id: 14,
      name: "Maya Tamrakar",
      email: "maya.tamrakar@example.com",
      role: "kitchen",
      phone: "+977-9823450987",
      kitchenName: "Maya's Taste Corner",
    },
  ]
  );
  const fetchUserDetails=async()=>{    
    try{
      const res=await axios.get('http://localhost:5010/api/users');      
      console.log(res.data);
      
    }catch(error){
      console.log(error);
      
    }
  }
  const customer=userDetails.filter((elem,index)=>elem.role==="customer");
  const kitchen=userDetails.filter((elem,index)=>elem.role==="kitchen");
  useEffect(()=>{
    fetchUserDetails();
  },[])
  return (
    <div className={styles.user_details_container}>
        <CustomerDetails details={customer}/>
        <CustomerDetails details={kitchen}/>
        {/* <KitchenDetails kitchen={kitchen}/> */}
    </div>
  )
}

