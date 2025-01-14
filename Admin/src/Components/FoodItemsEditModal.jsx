import React from 'react'
import styles from '../Styles/FoodItemsEditModal.module.css';
import { useState } from 'react';
import axios from 'axios';
export const FoodItemsEditModal = ({details,setEditMode,refreshFoodItems}) => {
    // console.log(details);
    
    const{productName,productDescription,productPrice,productCategory,_id}=details;

    const [error,setError]=useState({})
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

        setError((prev)=>({
            ...prev,[name]:""
          }))
    }

    //form validate garne function
    const validate=()=>{
        let errors={};
        if(!data.name.trim()){
            errors.name="Product Name is required"
        }else if(!/^[a-zA-Z][a-zA-Z0-9 ]{2,15}$/.test(data.name)){
            errors.name="Invalid product name"
        }
        if(!data.description.trim()){
            errors.description="product description is required"
        }
        if(!(data.price>0 )){
            errors.price="Price must be greater than 0 "
          }
          else if(!/^[1-9][0-9]*$/.test(data.price)){
            errors.price="Price cant start with 0"
          }
          if(!data.category.trim()){
            errors.category="please select category"
          }
          return errors
    }
    const handleSaveChanges=async(e)=>{
        e.preventDefault();
        const validation=validate();
        if(Object.keys(validation).length>0){
            setError(validation);
        }else{

            const response = await axios.post('http://localhost:5010/api/editItem/edit',data);
            setEditMode(null);
            refreshFoodItems();
        }
    }
  return (
    <div className={styles.main_container}>
        <div className={styles.inner_container}>
        <form className={styles.editFood_form} onSubmit={handleSaveChanges}>
                
                {/* adding product name  */}
            <div className={styles.edit_product_name}>
                <p>Food Name</p>
                <input type="text" name="name" placeholder='Product Name' value={data.name} onChange={handleOnChange} />
                <span style={{color:"red"}}>{error.name? error.name:""}</span>
            </div>
            {/* Product description  */}
            <div className={styles.edit_product_description}>
                <p>Food Description</p>
                <textarea name="description" rows='6' placeholder='Write here' value={data.description} onChange={handleOnChange} ></textarea>
                <span style={{color:"red"}}>{error.description? error.description:""}</span>
            </div>
            {/* for category  */}
            <div className={styles.edit_category_price}>
                <div className={styles.edit_category}>
                    <p>Food Category</p>
                    <select name='category' onChange={handleOnChange} value={data.category}>
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
                    <span style={{color:"red"}}>{error.category? error.category:""}</span>

                </div>
                {/* for Price  */}
                <div className={styles.edit_price}>
                    <p>Food Price</p>
                    <input type="number" name="price" placeholder='Rs.200' value={data.price} onChange={handleOnChange} />
                    <span style={{color:"red"}}>{error.price? error.price:""}</span>

                </div>
            </div>
            
                <button type='submit' className={styles.add_btn}  >Save Changes</button>

            </form>
        </div>
    </div>
  )
}

