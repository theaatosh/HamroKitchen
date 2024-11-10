import { useRef, useState } from 'react'
import styles from '../Styles/Modal/FoodOption.module.css'
import { RxCross2 } from "react-icons/rx";
export const FoodOptionModal = ({onClose}) => {
    


  const [selectedType,setSelectedType]=useState({
    foodType:"",
    spiceLevel:"",
    dietType:"",
  })

const handleOnChange=(e)=>{
const{value,name}=e.target;
setSelectedType((preVal)=>({
  ...preVal,[name]:value,
}))

}
    const modalRef=useRef();

    const handleModalCloseRef=(e)=>{
        if(modalRef.current==e.target)
        {
            // onClose();
        }
    }
    const isSubmitDisabled = !selectedType.foodType || !selectedType.spiceLevel || !selectedType.dietType;    
  
    const handleSubmit=()=>{
console.log(selectedType);

      
      onClose();
    }
  return (
    <div ref={modalRef} onClick={handleModalCloseRef}className={styles.main_container}>
        <div className={styles.modal_container}>
          <div className={styles.cross_div}>
        <RxCross2  className={styles.cross} onClick={onClose}/>
          </div>
        <div className={styles.inner_container}>
        <h2>Customize Your Preferences</h2> 
        
        <div className={styles.section}>
            <h3>Choose Food Type</h3>
            <label>
              <input
                type="radio"
                name="foodType"
                value="Fast Food"
                checked={selectedType.foodType === 'Fast Food'}
                onChange={ handleOnChange}
              /> Fast Food
            </label>
            <label>
              <input
                type="radio"
                name="foodType"
                value="Local Food"
                checked={selectedType.foodType === 'Local Food'}
                onChange={handleOnChange}
              /> Local Food
            </label>
            <label>
              <input
                type="radio"
                name="foodType"
                value="Both"
                checked={selectedType.foodType === 'Both'}
                onChange={handleOnChange}
              /> Both
            </label>
          </div>


          <div className={styles.section}>
            <h3>Choose Spice Level</h3>
            <label>
              <input
                type="radio"
                name="spiceLevel"
                value="High"
                checked={selectedType.spiceLevel === 'High'}
                onChange={handleOnChange}
              /> High
            </label>
            <label>
              <input
                type="radio"
                name="spiceLevel"
                value="Medium"
                checked={selectedType.spiceLevel === 'Medium'}
                onChange={handleOnChange}
              /> Medium
            </label>
            <label>
              <input
                type="radio"
                name="spiceLevel"
                value="Low"
                checked={selectedType.spiceLevel === 'Low'}
                onChange={handleOnChange}
              /> Low
            </label>
          </div>


          <div className={styles.section}>
            <h3>Choose Diet Type</h3>
            <label>
              <input
                type="radio"
                name="dietType"
                value="Veg"
                checked={selectedType.dietType === 'Veg'}
                onChange={handleOnChange}
              /> Veg
            </label>
            <label>
              <input
                type="radio"
                name="dietType"
                value="Non-Veg"
                checked={selectedType.dietType === 'Non-Veg'}
                onChange={handleOnChange}
              /> Non-Veg
            </label>
            <label>
              <input
                type="radio"
                name="dietType"
                value="Both"
                checked={selectedType.dietType === 'Both'}
                onChange={handleOnChange}
              /> Both
            </label>
          </div>
        
        <button className={styles.btn} disabled={isSubmitDisabled}  onClick={handleSubmit}>Submit</button>
        </div>
        </div>
    </div>
  )
}



  // const handleChange=(e)=>{
    //   console.log(e.target.checked);
    //   const{value,checked}=e.target;
    //   setSelectedFoods((preVal)=>
    //     checked?[...preVal,value]:preVal.filter((item)=>item!==value)
        
    //   )
      
    // }