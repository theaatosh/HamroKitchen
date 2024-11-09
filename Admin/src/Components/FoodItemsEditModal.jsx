import React from 'react'
import styles from '../Styles/FoodItemsEditModal.module.css';
import { useState } from 'react';
import axios from 'axios';
export const FoodItemsEditModal = ({details,setEditMode}) => {
    // console.log(details);
    
    const{productName,productDescription,productPrice,productCategory,_id}=details;
    const[data,setData]=useState({
        name:productName,
        description:productDescription,
        price:productPrice,
        category:productCategory,
        id:_id
    })

    const handleOnChange=(e)=>{
        const{name,value}=e.target
        setData((prevData)=>({
            ...prevData,[name]:value
        }))
    }
    const handleSaveChanges=async(e)=>{
        e.preventDefault();
        console.log(data);
        const response = await axios.post('http://localhost:5010/api/editItem',data);
        setEditMode(null)
        console.log(response.data.message);

    }
  return (
    <div className={styles.main_container}>
        <div className={styles.inner_container}>
        <form className={styles.manageFood_form} onSubmit={handleSaveChanges}>
                
                {/* adding product name  */}
                <button></button>
            <div className={styles.add_product_name}>
                <p>Food Name</p>
                <input type="text" name="name" placeholder='Product Name' value={data.name} onChange={handleOnChange}required />
            </div>
            {/* Product description  */}
            <div className={styles.product_description}>
                <p>Food Description</p>
                <textarea name="description" rows='6' placeholder='Write here' value={data.description} onChange={handleOnChange} required></textarea>
            </div>
            {/* for category  */}
            <div className={styles.add_category_price}>
                <div className={styles.add_category}>
                    <p>Food Category</p>
                    <select name='category' onChange={handleOnChange} value={data.category}required>
                        <option value="Momo">Momo</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Chowmein">Chowmein</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Fry Rice">Fry Rice</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Sausage">Sausage</option>
                        <option value="Burger">Burger</option>
                        <option value="Pizza">Pizza</option>
                        <option value="Sekuwa">Sekuwa</option>
                    </select>
                </div>
                {/* for Price  */}
                <div className={styles.add_price}>
                    <p>Food Price</p>
                    <input type="number" name="price" placeholder='Rs.200' value={data.price} required onChange={handleOnChange} />
                </div>
            </div>
            
                <button type='submit' className={styles.add_btn}  >Save Changes</button>

            </form>
        </div>
    </div>
  )
}

