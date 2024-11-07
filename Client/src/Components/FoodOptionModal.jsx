import { useRef, useState } from 'react'
import styles from '../Styles/Modal/FoodOption.module.css'
import { RxCross2 } from "react-icons/rx";
export const FoodOptionModal = ({onClose}) => {
    
  const [selectedFoods,setSelectedFoods]=useState([]);
    const modalRef=useRef();
    const handleModalCloseRef=(e)=>{
        if(modalRef.current==e.target)
        {
            // onClose();
        }
    }
    const isSubmitDisabled = selectedFoods.length === 0;
    const handleChange=(e)=>{
      console.log(e.target.checked);
      const{value,checked}=e.target;
      setSelectedFoods((preVal)=>
        checked?[...preVal,value]:preVal.filter((item)=>item!==value)
        // console.log(preVal);
        
      )
      
    }
    const handleSubmit=()=>{

      console.log(selectedFoods);
      
      onClose();
    }
  return (
    <div ref={modalRef} onClick={handleModalCloseRef}className={styles.main_container}>
        <div className={styles.modal_container}>
          <div className={styles.cross_div}>
        <RxCross2  className={styles.cross} onClick={onClose}/>
          </div>
        <div className={styles.inner_container}>
        <h2>Select Your Preferred Food</h2> 
        <div className={styles.items_content}>
          <label>

            <input type="checkbox" value="Pizza"  onChange={handleChange}/> Pizza
          </label>
          <label>
            <input type="checkbox" value="Burger" onChange={handleChange} /> Burger
          </label>
          <label>
            <input type="checkbox" value="Pasta"  onChange={handleChange}/> Pasta
          </label>
          {/* Add more options as needed */}
        </div>
        <button className={styles.btn} disabled={isSubmitDisabled}  onClick={handleSubmit}>Submit</button>
        </div>
        </div>
    </div>
  )
}

