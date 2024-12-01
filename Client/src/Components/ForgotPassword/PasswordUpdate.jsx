import { useState } from "react";
import { BackToLogin } from "./UI/BackToLogin"
import { Button } from "./UI/Button"
import { Input } from "./UI/Input"
import { GrUpdate } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const PasswordUpdate = () => {
  const location=useLocation();
  const email=location.state?.email;
    const navigate=useNavigate();
    const[password,setPassword]=useState('');
    const[confirmPassword,setConfirmPassword]=useState('');

    const handlePasswordChange=(e)=>{
        setPassword(e.target.value);
    }
    const handleConfirmPasswordChange=(e)=>{
        setConfirmPassword(e.target.value);
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(password===confirmPassword)
            {
                console.log("done");
                // navigate('/login');
            }
            else{
                console.log("password must be same");
                
            }
        console.log(password,confirmPassword);
      try{
        
        const response=await axios.post("http://localhost:5010/api/forgotpassword/changePassword",{email,password})
        if(response){
          navigate('/login');
        }
      }
      catch(error){
        console.log(error);
        
      }
        
    }
  return (
    <div>
        
    

        <div className='h-screen w-[100%] flex items-center justify-center  bg-[#f5f5f5]'>
      <form className='w-[30%]' onSubmit={handleSubmit}>
            <div className='  p-10 bg-white w-[100%]'>
                <div className='flex flex-col justify-center items-center '>
                <GrUpdate className='text-[25px]'/>
                        <h1 className='text-3xl font-bold mt-5'>New Password</h1>
                        <p className='text-gray-500 mt-1'>Enter at least 6 digit long password</p>
                </div>
                <div className='flex flex-col gap-3 mt-7'>
                
                
                <div className='flex flex-col '>
                    <label htmlFor="" className='text-gray-500'>Password *</label>
                   <Input placeholder={'Enter your Password'} onChange={(e)=>handlePasswordChange(e)}type={'password'}required  />
                </div>
                <div className='flex flex-col '>
                    <label htmlFor="" className='text-gray-500'>Confirm Password *</label>
                   <Input placeholder={'Re-enter your Password'} onChange={(e)=>handleConfirmPasswordChange(e)} type={'password'}required  />
                </div>
                    
                    <div className='flex items-center justify-center mt-4'>
                    <Button  type={'submit'}>Update Password</Button>

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


