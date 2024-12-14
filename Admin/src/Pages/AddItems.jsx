import {  useState } from 'react';
import styles from '../Styles/AddItem.module.css';
import { toast } from 'react-toastify';
import axios from 'axios';
export const AddItems=()=>{

    const[image,setImage]=useState(false);
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
        }))}
        console.log(selectedType);
        
    //onChange function call
    const handleOnChange=(e)=>{
        const{name,value}=e.target;
        setData((preVal)=>({
            ...preVal,[name]:value
        }))
    }
    
    //onSubmit 
    const handleFormSubmit=async(e)=>{
        e.preventDefault();
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
                    <input type="file" id="image" name='image' onChange={(e)=>setImage(e.target.files[0])} required />
                </div>
                {/* adding product name  */}
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
            <label>
              <input
                type="radio"
                name="dietType"
                value="Both"
                checked={selectedType.dietType === 'Both'}
                onChange={handleOnChangee}
              /> Both
            </label>
            </div>
          </div>
                <button type='submit' className={styles.add_btn} >Add</button>

            </form>
        </div>
        </>
    )
}