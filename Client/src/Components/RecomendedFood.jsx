import React, { useContext, useEffect, useState } from 'react'
import styles from '../Styles/Home/RecomendedFood.module.css';
import { FoodItemDisplay } from './FoodItemDisplay';
import axios from 'axios';
import { StoreContext } from '../Context/StoreContext';
import { useAuth } from '../Context/AuthContext';
export const RecomendedFood = () => {
  const{token}=useContext(StoreContext);
  const{userDetails}=useAuth();
  
    const [food,setFood]=useState([
        {
          key: "1",
          id: "1",
          name: "Classic Pizza",
          description: "A delicious cheesy classic pizza topped with fresh tomatoes and basil.",
          price: 9.99,
          image: '/Images/FoodItems/chiFryRice.jpg'
        },
        {
          key: "2",
          id: "2",
          name: "Veggie Burger",
          description: "A healthy veggie burger loaded with fresh lettuce, tomato, and avocado.",
          price: 7.99,
          image:'/Images/FoodItems/chiFryRice.jpg'
        },
        {
          key: "3",
          id: "3",
          name: "Spaghetti Carbonara",
          description: "Traditional Italian pasta dish with creamy sauce and crispy bacon.",
          price: 12.99,
          image:'/Images/FoodItems/chiFryRice.jpg'
        },
        {
          key: "4",
          id: "4",
          name: "Caesar Salad",
          description: "Crisp romaine lettuce tossed with Caesar drfsfsdfsfsdsddddddddddddddddessing, croutons, and Parmesan.",
          price: 6.99,
          image: '/Images/FoodItems/chiFryRice.jpg'
        },
        {
          key: "4",
          id: "4",
          name: "Caesar Salad",
          description: "Crisp romaine lettuce tossed with Caesar dressing, croutons, and Parmesan.",
          price: 6.99,
          image: "https://example.com/images/caesar-salad.jpg"
        },
        
      ])

      const fetchRecomended=async()=>{
        try{
         
          const res=await axios.get('http://localhost:5010/api/recFood',{headers: {'Authorization': `Bearer ${token}`}})
          console.log(res.data);
        }catch(error){
          console.log(error);
          
        }
      }
      useEffect(()=>{
        console.log(userDetails.viewed,token);
        
        if(token && userDetails.viewed){
          fetchRecomended();
        }
      },[token])
  return (
    <div className={styles.recomended_food_main_con}>
        <h1>Recomended for you</h1>
        <div className={styles.recomended_food_inner}>
            {food && 
            food.slice(0,4).map((curItem,index)=>{
                return(
                <FoodItemDisplay
                key={curItem.id}
                id={curItem.id}
                name={curItem.name}
                description={curItem.description}
                price={curItem.price}
                image={curItem.image}
              />
            )})
            }
        </div>
    </div>
  )
}

