import React, { useContext, useEffect, useState } from 'react'
import styles from '../Styles/Home/RecomendedFood.module.css';
import { FoodItemDisplay } from './FoodItemDisplay';
import axios from 'axios';
import { StoreContext } from '../Context/StoreContext';
import { useAuth } from '../Context/AuthContext';
import Loading from './Loading';
export const RecomendedFood = () => {
  const{token,foodItems}=useContext(StoreContext);
  const{userDetails}=useAuth();
  const [loading,setLoading]=useState(null);
  
    const [food,setFood]=useState([]);
  const[recFilteredItems,setRecFilteredItems]=useState([]);

  //yo xai bhako foodites lai shuffle garera dekhaune
const handleFoodShuffle=(foodItems)=>{
const shuffledArray=[...foodItems];
for(let i=shuffledArray.length-1;i > 0;i--){

  const j = Math.floor(Math.random() * (i + 1));

  [shuffledArray[i],shuffledArray[j]]=[shuffledArray[j],shuffledArray[i]];
}
return shuffledArray;
}

   useEffect(()=>{
    if(foodItems.length>0){
      const shuffledArray=handleFoodShuffle(foodItems);
      setRecFilteredItems(shuffledArray);

    }
   },[foodItems]);

   //esle xai user ko preferences anusar rec bhako food dekhaune
const handleRecFood=()=>{  
  const arr=food.replace(/^\[|\]|'|'$/g,"").trim().split(",").map((item)=>item.trim());
  const filteredItems=arr.map((recId,index)=>{
    return foodItems.find((item)=>item._id===recId)
  })
  setRecFilteredItems(filteredItems);
  
  
}

  
      const fetchRecomended=async()=>{
        setLoading(true);
        try{         
          const res=await axios.get('http://localhost:5010/api/recFood',{headers: {'Authorization': `Bearer ${token}`}});
            setFood(res.data);
        }catch(error){
          console.log(error);
          
        }
        finally{
          setLoading(false);
        }
      }
      useEffect(()=>{   
        console.log(userDetails.viewed);
             
        if(token && userDetails.viewed){          
          fetchRecomended();
        }
      },[token,userDetails])

      useEffect(()=>{
        if(food.length>0&&foodItems.length>0){
          handleRecFood();
        }
        else{
          handleFoodShuffle(foodItems);
        }
      },[food,foodItems])
  return (
    <div className={styles.recomended_food_main_con}>
        <h1>Recomended for you</h1>
        <div className={styles.recomended_food_inner}>
            {loading?<div className={styles.loading}><Loading/></div>:recFilteredItems.length>0 && 
             recFilteredItems.slice(0,4).map((curItem)=>{
                return(
                <FoodItemDisplay
                key={curItem._id}
                id={curItem._id}
                name={curItem.productName}
                description={curItem.productDescription}
                price={curItem.productPrice}
                image={curItem.image}
              />
            )})
            }
        </div>
        
    </div>
  )
}

