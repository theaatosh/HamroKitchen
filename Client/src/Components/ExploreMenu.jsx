import { useContext } from "react";
import styles from "../Styles/Home/ExploreNow.module.css";
import {MenuList}  from "../assets/Explore Menu/Menu"
import { StoreContext } from "../Context/StoreContext";
export const ExploreMenu = () => {

  const{ category, setCategory,scrollToDisplayFood }=useContext(StoreContext);

  const handleCategoryClick=(curImg)=>{
    setCategory((preval) =>
      preval === curImg.categoryName ? "All" : curImg.categoryName
    )
    scrollToDisplayFood();
  }
  return (
    <>
      <div className={styles.explore_menu} >
        <h1>Explore Menu</h1>
        <div className={styles.menu_container}>
          {MenuList.map((curImg) => {
            return (
              <div 
                key={curImg.id}
                className={styles.menu_item}
                onClick={() =>handleCategoryClick(curImg)}
              >
                <img
                  src={curImg.url}
                  alt={curImg.categoryName}
                  className={`${category === curImg.categoryName ? styles.active : ""}`}
                />

                <p>{curImg.categoryName}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
