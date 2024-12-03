import { useState } from "react";
import { BackToLogin } from "./UI/BackToLogin"
import { Button } from "./UI/Button"
import { Input } from "./UI/Input"
import { GrUpdate } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast } from 'react-toastify';
import Loading from '../Loading';
import styles from '../../Styles/ForgotPassword/PasswordUpdate.module.css';

export const PasswordUpdate = () => {
  const location=useLocation();
  const email=location.state?.email;
    const navigate=useNavigate();
    const[password,setPassword]=useState('');
    const[confirmPassword,setConfirmPassword]=useState('');
    const[error,setError]=useState({});
    const[isLoading,setIsLoading]=useState(false);

    const handlePasswordChange=(e)=>{
      const{name}=e.target;
        setPassword(e.target.value);

        setError((preError)=>(
          {
            ...preError,[name]:""
          }
        ))
        
        
    }
    const handleConfirmPasswordChange=(e)=>{
      const{name}=e.target;
        setConfirmPassword(e.target.value);
        setError((preError)=>(
          {
            ...preError,[name]:""
          }
        ))
    }
    
    const validate=()=>{
      let formErrors={};
      
      if(!password.trim()){
        console.log("eta xa");
        
        formErrors.password="Password Is required *";
      }
      else if(!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[\W_]).{8,}$/.test(password)){
        formErrors.password="Use atleast a uppercase lowercase a digit and a symbol ";
      }
      if(!confirmPassword.trim()){
        formErrors.confirmPassword="Confirm Password Is required *";
      }
      else if(!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[\W_]).{8,}$/.test(confirmPassword)){
        formErrors.confirmPassword="Use atleast a uppercase lowercase a digit and a symbol ";
      }

    return formErrors;
    }
    const handleSubmit=async(e)=>{
      e.preventDefault();
        const validateError=validate();
        if(Object.keys(validateError).length>0){
          setError(validateError);
        }else{
          if(password===confirmPassword)
            {
              try{
                setIsLoading(true);
                const response=await axios.post("http://localhost:5010/api/forgotpassword/changePassword",{email,password})
                if(response){
                  toast.success(response.data.message);
                  navigate('/login');
                }
              }
              catch(error){
                console.log(error);
                
              }
              finally{
                setIsLoading(false);
              }
            }
            else{
                toast.error("Password and Confirm Password must match.")
                
            }
        }
        
      
        
    }
  return (
    <div>
        
    

        <div className={styles.password_update_main_container}>
      <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.form_inner}>
                <div className={styles.upper}>
                <GrUpdate className={styles.update_icon}/>
                        <h1 className={styles.heading}>New Password</h1>
                        <p className={styles.sub_heading}>Enter at least 6 digit long password</p>
                </div>
                <div className={styles.lower}>
                
                
                <div className={styles.password_input}>
                    <label htmlFor="" className={styles.label}>Password *</label>
                   <Input placeholder={'Enter your Password'} name={"password"} onChange={(e)=>handlePasswordChange(e)}type={'password'}  />
                   {error.password && <p className={styles.error}>{error.password}</p>}
                </div>
                <div className={styles.password_input}>
                    <label htmlFor="" className={styles.label}>Confirm Password *</label>
                   <Input placeholder={'Re-enter your Password'} name={"confirmPassword"} onChange={(e)=>handleConfirmPasswordChange(e)} type={'password'} />
                   {error.confirmPassword&& <p className={styles.error}>{error.confirmPassword}</p>}
                </div>
                    
                    <div className={styles.updatepw_con}>
                    <Button  type={'submit'}>{isLoading?<Loading/>:"Update Password"}</Button>

                    </div>

                    <div className={styles.button}>
                        <BackToLogin/>
                    </div>
                </div>
            </div>
      </form>
    </div>
    </div>
  )
}


