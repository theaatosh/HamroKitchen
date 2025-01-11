import React, { useContext, useEffect, useState } from 'react'
import styles from '../Styles/Home/RecomendedFood.module.css';
import { FoodItemDisplay } from './FoodItemDisplay';
import axios from 'axios';
import { StoreContext } from '../Context/StoreContext';
import { useAuth } from '../Context/AuthContext';
export const RecomendedFood = () => {
  const{token,foodItems}=useContext(StoreContext);
  const{userDetails}=useAuth();
  const [food,setFood]=useState([]);

  console.log(foodItems);
console.log(food);

const filteredRec=()=>{
    console.log("hello");    
  const filteredRecomended=food.map((recItem,index)=>{
    const rec=foodItems.find((foodItem,index)=>{
      return foodItem._id===recItem;
      
    })
  console.log(rec);
  
    
  })
  console.log(filteredRecomended);
  
  setFood(filteredRecomended);
}

  // console.log(filteredRecomended);
  
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
      // setFood(shuffledArray);
}
   },[foodItems]);


  
      const fetchRecomended=async()=>{
        try{         
          const res=await axios.get('http://localhost:5010/api/recFood',{headers: {'Authorization': `Bearer ${token}`}});
          setFood(res.data);
        }catch(error){
          console.log(error);
          
        }
      }
      useEffect(()=>{        
        if(token && userDetails.viewed){          
          fetchRecomended();
          if(food.length>0&&foodItems.length>0){            
            filteredRec();
          }
          
        }
      },[token,food,foodItems])
  return (
    <div className={styles.recomended_food_main_con}>
        {/* <h1>Recomended for you</h1>
        <div className={styles.recomended_food_inner}>
            {food.length>0 && 
           
             food.slice(0,4).map((curItem,index)=>{
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
        </div> */}
        <h1>Hello</h1>
    </div>
  )
}

