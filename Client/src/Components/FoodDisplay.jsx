import { useContext, useEffect, useState } from "react";
import styles from "../Styles/Home/FoodDisplay.module.css";
import { StoreContext } from "../Context/StoreContext";
import { FoodItemDisplay } from "./FoodItemDisplay";

export const FoodDisplay = () => {
  //from store context
  const { foodItems, category, searchItem } = useContext(StoreContext);

  const [filteredItem, setFilteredItem] = useState([]);
  useEffect(() => {
      let filtered=foodItems;

      
      if(category !=="All" && searchItem.length===0)
      {
        filtered=filtered.filter((curItem)=>{
          
          return (curItem.category===category);
        })
      }
      
      
      if(searchItem.length>0 )
        {
          filtered=filtered.filter((curItem)=>curItem.name.toLowerCase().includes(searchItem)
        );

      }


          setFilteredItem(filtered)
      }
  , [category, searchItem]);
  return (
    <>
      <div className={styles.food_display_container}>
        <h2>Top Dishes Near You</h2>
        <div className={styles.food_display_list}>
          {filteredItem.map((curItem) => {
            return (
              <FoodItemDisplay
                key={curItem.id}
                id={curItem.id}
                name={curItem.name}
                description={curItem.description}
                price={curItem.price}
                image={curItem.image}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
