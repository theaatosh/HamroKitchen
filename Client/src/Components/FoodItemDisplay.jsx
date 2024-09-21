import {  useContext } from 'react';
import {  IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import styles from '../Styles/Home/FoodItemDisplay.module.css';
import { StoreContext } from '../Context/StoreContext';
export const FoodItemDisplay=({id,name,description,image,price})=>{

    
    const{cartItems,addToCart,removeFromCart,url}=useContext(StoreContext);
    // console.log(cartItems);
    
return(
    <>
    <div className={styles.food_item}>
        <div className={styles.foodItem_img_container}>
            <img className={styles.foodItem_img} src={url+"/"+image} alt={name} />
            {!cartItems[id]? (<IoIosAddCircleOutline className={styles.add_icon}onClick={()=>addToCart(id)}/> ): (
                <div className={styles.item_counter_container}>
                <CiCircleMinus className={styles.sub1_icon} onClick={()=>removeFromCart(id)}/> 
                    <p>{cartItems[id]}</p>
                    <IoIosAddCircleOutline className={styles.add1_icon}onClick={()=>addToCart(id)}/>

                </div> )}

        </div>
        <div className={styles.foodItem_info}>
            <p className={styles.name}>{name}</p>
            <p className={styles.description}>{description}</p>
            <p className={styles.price}>Rs.{price}</p>
        </div>

    </div>
    </>
)

}