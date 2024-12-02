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
        
    

        <div className='h-screen w-[100%] flex items-center justify-center  bg-[#f5f5f5]'>
      <form className='w-[30%]' onSubmit={handleSubmit}>
            <div className='  p-10 mt-[70px] bg-white w-[100%]'>
                <div className='flex flex-col justify-center items-center '>
                <GrUpdate className='text-[25px]'/>
                        <h1 className='text-3xl font-bold mt-5'>New Password</h1>
                        <p className='text-gray-500 mt-1'>Enter at least 6 digit long password</p>
                </div>
                <div className='flex flex-col gap-3 mt-7'>
                
                
                <div className='flex flex-col '>
                    <label htmlFor="" className='text-gray-500'>Password *</label>
                   <Input placeholder={'Enter your Password'} name={"password"} onChange={(e)=>handlePasswordChange(e)}type={'password'}required  />
                   {error.password && <p className="text-red-600">{error.password}</p>}
                </div>
                <div className='flex flex-col '>
                    <label htmlFor="" className='text-gray-500'>Confirm Password *</label>
                   <Input placeholder={'Re-enter your Password'} name={"confirmPassword"} onChange={(e)=>handleConfirmPasswordChange(e)} type={'password'}required  />
                   {error.confirmPassword&& <p className="text-red-600">{error.confirmPassword}</p>}
                </div>
                    
                    <div className='flex items-center justify-center mt-4'>
                    <Button  type={'submit'}>{isLoading?<Loading/>:"Update Password"}</Button>

                    </div>

                    <div className='mt-3'>
                        <BackToLogin/>
                    </div>
                </div>
            </div>
      </form>
    </div>
    </div>
  )
}


