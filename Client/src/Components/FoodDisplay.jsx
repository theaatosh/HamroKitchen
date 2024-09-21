import { useContext, useEffect, useState } from "react";
import styles from "../Styles/Home/FoodDisplay.module.css";
import { StoreContext } from "../Context/StoreContext";
import { FoodItemDisplay } from "./FoodItemDisplay";

export const FoodDisplay = () => {
  //from store context
  const { foodItems, category, searchItem,isLoading,aboutUsRef } = useContext(StoreContext);

  const [filteredItem, setFilteredItem] = useState([]);
  useEffect(() => {
    if(!isLoading){
      let filtered=foodItems;
    if(category !=="All" && searchItem.length===0)
      {
        filtered=foodItems.filter((curItem)=>{
          
          return (curItem.productCategory===category);
        })
      }
      
      else if(searchItem.length>0 )
        {
          filtered=foodItems.filter((curItem)=>curItem.productName.toLowerCase().includes(searchItem)
        );

      }else{
        filtered=foodItems;
      }


          setFilteredItem(filtered);
      }
    }
  , [category, searchItem,foodItems,isLoading]);
  return (
    <>
      <div  className={styles.food_display_container}>
        <h2>Top Dishes Near You</h2>
        <div  className={styles.food_display_list}>
          
        {isLoading ? (
            <p>Loading food items...</p> // Show loading indicator
          ) : (
            filteredItem.map((curItem) => (
              <FoodItemDisplay
                key={curItem._id}
                id={curItem._id}
                name={curItem.productName}
                description={curItem.productDescription}
                price={curItem.productPrice}
                image={curItem.image}
              />
            ))
          )}
          
        </div>
      </div>

      <div ref={aboutUsRef} className={styles.about_us_ref_div}></div>
    </>
  );
};
