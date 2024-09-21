import styles from '../Styles/Login_Signup/KitchenSignup.module.css';
import { useState } from 'react';

export const KitchenSignup=()=>{
    const[error,setError]=useState('');
   const[formData,setFormData]=useState({
    category:[],
    location:'',

   })

   //selected category are stored inside category array 
   const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setFormData((prevData) => ({
      ...prevData,
      category: selectedOptions,
    }));
  };
 console.log(formData);
 
  
   //handle submit
   const handleSubmit=(e)=>{
        e.preventDefault();
        
   }
    return(
        <>
                <div className={styles.main_container}>
            <div className={styles.signUp_container}>
                <div className={styles.left_container}>
                    <div className={styles.overlay}></div>
                    <div className={styles.text_overlay}>
                    <h1>Welcome To Hamro kitchen</h1>
                    <h3>Experience the essence of <br/>
                    home, anytime, anywhere</h3>
                    </div>
                </div>
                <div className={styles.right_container}>
                    <div className={styles.inner_right}>
                        <div className={styles.heading_signup}> <h1>Get listed in Hamro kitchen</h1></div>
                        
          {/* input details  */}
        <div className={styles.input_details}>
            <form onSubmit={handleSubmit} >
         
            <div className={styles.form_group}>
    
            <label htmlFor="food_items" >Select Food Items:<span><br /> (Note:Hold Ctrl to select mutiple items)</span> </label>
            <select name='category' className={styles.select_dropdown}onChange={handleCategoryChange } multiple required>
                        <option value="Momo">Momo</option>s
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

        <div className={styles.form_group}>
        <label htmlFor='location'>Provide your Location</label>


      </div>


        {/* for signup button  */}
        <div className={styles.signup_btn}>
      <button type="submit" className={styles.submit_button}>Register</button>
      </div>
    </form>

    
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </>
    )


}


