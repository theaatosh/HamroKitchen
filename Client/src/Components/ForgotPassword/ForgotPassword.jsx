import { useState } from 'react';
import { BackToLogin } from './UI/BackToLogin'
import { Button } from "./UI/Button"
import { Input } from "./UI/Input"
import { MdAttachEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const ForgotPassword = () => {
    const [email,setEmail]=useState('');
    const navigate=useNavigate();
    const handleEmailChange=(e)=>{
        setEmail(e.target.value);
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(email);
        try {
          const res = await axios.post("http://localhost:5010/api/forgotpassword/forgetPassword",{email})
          if (res.status===200) {
            navigate('/otp/verify',{state:{email}});
          }
      } catch (error) {
         console.log(error);
      }
        
    }
  return (
    <div>
      <div className='h-screen w-[100%] flex items-center justify-center  bg-[#f5f5f5]'>
      <form className='w-[30%]' onSubmit={(e)=>handleSubmit(e)}>
            <div className='  p-10 bg-white w-[100%]'>
                <div className='flex flex-col justify-center items-center '>
                <MdAttachEmail className='text-[25px] font-bold'/>
                        <h1 className='text-3xl font-bold mt-5 '>Forgot your Password</h1>
                        <p className='text-gray-500 mt-1'>Enter your registered email we will send a 6-digit OTP</p>
                </div>
                <div className='flex flex-col gap-3 mt-7'>
                
                <div className='flex flex-col '>
                    <label htmlFor="" className='text-gray-500'>Email *</label>
                   <Input placeholder={'Enter your email'} type={'email'} onChange={(e)=>handleEmailChange(e)} required/>
                </div>
                
                    
                    <div className='flex items-center justify-center mt-4'>
                    <Button type={'submit'}>Send OTP</Button>

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


