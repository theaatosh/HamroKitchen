import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import styles from '../Styles/ManageFoodItems.module.css';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { FoodItemsEditModal } from '../Components/FoodItemsEditModal';
export const ManageFoodItems = () => {

    const [foodDetails,setFoodDetails]=useState([]);
    const[isLoading,setIsLoading]=useState(false);
    const[editMode,setEditMode]=useState(null);
    const fetchFoodItems = async () => {
        try {
          const response = await axios.get('http://localhost:5010/topDishes');
            setIsLoading(true);
              setFoodDetails(response.data); 
              console.log(response.data);
              
              
              
          } catch (error) {
              console.error('Error fetching food items:', error);
          }
          finally{
            setIsLoading(false);
          }
      };
      useEffect(()=>{
    fetchFoodItems();
    
    
      },[])

      const handleEdit=(curElem)=>{
        setEditMode(curElem);
      }
      
      const handleDelete=async(curElem)=>{
        const response = await axios.post('http://localhost:5010/api/editItem/delete',curElem);
        console.log(response.data.message);
        fetchFoodItems();

      }
  return (
    <>
     <div className={styles.main_container}>
                <ToastContainer/>
                    <div className={styles.manageFoodItems_container}>
                        <h1>Food Details </h1>
                        <div className={styles.manageFoodItems_details_container}>
                            <div className={styles.manageFoodItems_title}>
                                <p>S.N</p>
                                <p>Product Name</p>
                                <p>Description</p>
                                <p>Price</p>
                                <p>Category</p>
                                <p>Edit/Delete</p>
                                
                            </div>
                            <hr /><hr />


                            
                            {/* Mapping through curElem */}
                            <div className={styles.detail_container}>
                            {foodDetails.length===0? (
                            <p>Loading curElem details...</p>
                        ) : (
                            foodDetails.map((curElem,index)=>{
                            return(
                                <React.Fragment  key={curElem.id || index}>
                                <div className={styles.manageFoodItems_detail}>
                                <p>{index+1}</p>
                                <p>{curElem.productName}</p>
                                <p>{curElem.productDescription}</p>
                                <p>{curElem.productPrice}</p>
                                <p>{curElem.productCategory}</p>

                              
                                <div className={styles.edit_del_con}>
                                <FaEdit onClick={()=>handleEdit(curElem)} className={styles.edit_icon}/>
                                <MdDelete onClick={()=>handleDelete(curElem)} className={styles.delete_icon}/>
                                </div>
                            </div>
                            <hr />
                            </React.Fragment>
                            
                            )
                         }
                      )
                            
                        )}
                        </div>

                        </div>
                    </div>

                    {editMode && (<FoodItemsEditModal details={editMode} setEditMode={setEditMode}/>)}
                </div>
    </>
  )
}

