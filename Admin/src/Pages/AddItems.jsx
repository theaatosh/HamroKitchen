import {  useState } from 'react';
import styles from '../Styles/AddItem.module.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect } from 'react';
export const AddItems=()=>{

    const[image,setImage]=useState(false);
    const [error,setError]=useState({})//for input validation

    const[data,setData]=useState({
        name:"",
        description:"",
        price:"",
        category:"Momo"
    })
    const [selectedType,setSelectedType]=useState({
        foodType:"",
        spiceLevel:"",
        dietType:"",
      })
    
      const handleOnChangee=(e)=>{
        const{value,name}=e.target;
        setSelectedType((preVal)=>({
          ...preVal,[name]:value,
        }))
        setError((prev)=>({
          ...prev,[name]:""
        }))
      }
       

    //onChange function call
    const handleOnChange=(e)=>{
        const{name,value}=e.target;
        setData((preVal)=>({
            ...preVal,[name]:value
        }))
        setError((prev)=>({
          ...prev,[name]:""
        }))
    }
    const validate=()=>{
        const errors={}
        if(!data.name.trim()){
          errors.name="Product Name is required"
      }else if(!/^[a-zA-Z][a-zA-Z0-9 ]{2,15}$/.test(data.name)){
          errors.name="Invalid product name"
      }
      if(!data.description.trim()){
          errors.description="product description is required"
      }
      if(!(data.price.trim())){
        errors.price="Price is required "
      }
      else if(!(data.price>0 )){
          errors.price="Price must be greater than 0 "
        }
        else if(!/^[1-9][0-9]*$/.test(data.price)){
          errors.price="Price cant start with 0"
        }
         if(!selectedType.foodType){
          errors["foodType"]="Please select food type"
        }
        if(!selectedType.spiceLevel){
          errors["spiceLevel"]="Please select spiceLevel"
        }
         if(!selectedType.dietType){
          errors["dietType"]="Please select diet type"
        }
        return errors;

    }
    
    //onSubmit 
    const handleFormSubmit=async(e)=>{
        e.preventDefault();
        const validation=validate();
        if(Object.keys(validation).length>0){
          setError(validation);
        }
      else{

        const formData= new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",data.price)
        formData.append("category",data.category)
        formData.append("image",image)
        formData.append("foodType",selectedType.foodType)
        formData.append("diet",selectedType.dietType)
        formData.append("spice",selectedType.spiceLevel)

        console.log(formData);
        try{
             const result = await axios.post('http://localhost:5010/addItems',formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Axios will handle this, but this is just for reference
                }
                }

             );
             toast.success("Food Added ",{
                autoClose:2000
            })
            setData({
                name: "",
                description: "",
                price: "",
                category: "Momo"
              });
              setImage(false);
        }catch(err){
             toast.error("error", {
                autoClose:2000
             });
            console.log(err);
        }
        
      }

    }

  

    return (
        <>
        <div className={styles.addItems_main_container}>
            <form className={styles.addItems_form} onSubmit={handleFormSubmit}>
                    {/* for adding Image  */}
                <div className={styles.add_image_container}>
                    <p>Upload Image Of Food</p>
                    <label htmlFor="image">
                        <img src={image? URL.createObjectURL(image):'/Images/UploadImage.png'} alt="" />
                    </label>
                    <input type="file" id="image" name='image' onChange={(e)=>setImage(e.target.files[0])}  required/>
                </div>
                {/* adding product name  */}
            <div className={styles.add_product_name}>
                <p>Food Name</p>
                <input type="text" name="name" placeholder='Product Name' value={data.name} onChange={handleOnChange} />
                <span style={{color:"red"}}>{error.name? error.name:""}</span>
            </div>
            {/* Product description  */}
            <div className={styles.product_description}>
                <p>Food Description</p>
                <textarea name="description" rows='6' placeholder='Write here' value={data.description} onChange={handleOnChange} ></textarea>
                <span style={{color:"red"}}>{error.description? error.description:""}</span>
            </div>
            {/* for category  */}
            <div className={styles.add_category_price}>
                <div className={styles.add_category}>
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
                </div>
                {/* for Price  */}
                <div className={styles.add_price}>
                    <p>Food Price</p>
                    <input type="number" name="price"  placeholder='Rs.200' value={data.price}  onChange={handleOnChange} />

                    <span style={{color:"red"}}>{error.price? error.price:""}</span>
                </div>
                
            </div>
            
            <div className={styles.section}>
                    <div className={styles.box}>
                <h3>Choose Food Type</h3>
            <label>
              <input
                type="radio"
                name="foodType"
                value="Fast Food"
                checked={selectedType.foodType === 'Fast Food'}
                onChange={ handleOnChangee} 
              /> Fast Food
            </label>
            <label>
              <input
                type="radio"
                name="foodType"
                value="Local Food"
                checked={selectedType.foodType === 'Local Food'}
                onChange={handleOnChangee}
              /> Local Food
            </label>
            <label>
              <input
                type="radio"
                name="foodType"
                value="Both"
                checked={selectedType.foodType === 'Both'}
                onChange={handleOnChangee}
              /> Both
            </label>
            <span style={{color:"red"}}>{error.foodType? error.foodType:""}</span>
            </div>

            <div className={styles.box}>
            <h3>Choose Spice Level</h3>
            <label>
              <input
                type="radio"
                name="spiceLevel"
                value="High"
                checked={selectedType.spiceLevel === 'High'}
                onChange={handleOnChangee}
              /> High
            </label>
            <label>
              <input
                type="radio"
                name="spiceLevel"
                value="Medium"
                checked={selectedType.spiceLevel === 'Medium'}
                onChange={handleOnChangee}
              /> Medium
            </label>
            <label>
              <input
                type="radio"
                name="spiceLevel"
                value="Low"
                checked={selectedType.spiceLevel === 'Low'}
                onChange={handleOnChangee}
              /> Low
            </label>
            <span style={{color:"red"}}>{error.spiceLevel? error.spiceLevel:""}</span>

            </div>
            <div className={styles.box}>
            <h3>Choose Diet Type</h3>
            <label>
              <input
                type="radio"
                name="dietType"
                value="Veg"
                checked={selectedType.dietType === 'Veg'}
                onChange={handleOnChangee}
              /> Veg
            </label>
            <label>
              <input
                type="radio"
                name="dietType"
                value="Non-Veg"
                checked={selectedType.dietType === 'Non-Veg'}
                onChange={handleOnChangee}
              /> Non-Veg
            </label>
            <span style={{color:"red"}}>{error.dietType? error.dietType:""}</span>

            </div>
          </div>
                <button type='submit' className={styles.add_btn} >Add</button>

            </form>
        </div>
        </>
    )
}