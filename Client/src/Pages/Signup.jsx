import { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import styles from '../Styles/Login_Signup/Signup.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  toast } from 'react-toastify';
import Loading from '../Components/Loading';

export const SignUpPage=()=>{
  const navigate=useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  //user details
  const [formData,setFormData]=useState({
    userName:"",
    email:"",
    phoneNumber:"",
    password:""
  });
  // console.log(formData);
  
    const [error,setError]=useState({});
    const[ showPassword,setShowPassword]=useState(false);

    //validating form
    const validate=()=>{
      let formErrors={};
      if(!formData.userName.trim()){
        formErrors.userName="UserName Required *";
      }
      else if(!/^[a-zA-Z][a-zA-Z0-9]{2,15}$/.test(formData.userName))
      {
        formErrors.userName="Invalid UserName";
      }
      
      if(!formData.email.trim()){
        formErrors.email="Email is Required *";
      }else if(!/^([A-Za-z0-9]+(?:[.#_][A-Za-z\d]+)*@[A-Za-z]+)(\.[A-Za-z]{2,3})$/.test(formData.email))
      {
        formErrors.email="Incorrect email format ";
      }
      
      if(!formData.phoneNumber.trim())
      {
        formErrors.phoneNumber="Phone number is Required *";
      }
      else if(!/^(98|97|96)[0-9]{8}$/.test(formData.phoneNumber))
      {
        formErrors.phoneNumber="Invalid phone Number";
      }
      
      if(!formData.password.trim()){
        formErrors.password="Password Is required *";
      }
      else if(!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[\W_]).{8,}$/.test(formData.password)){
        formErrors.password="Use atleast a uppercase lowercase a digit and a symbol ";
      }

    return formErrors;
    }
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const validationError=validate();
        if(Object.keys(validationError).length>0)
        {
          setError(validationError);
        }
        else 
        {
          try{
            setIsLoading(true)
            const result = await axios.post('http://localhost:5010/signup',formData);
            
            
            if(result.status===200)
            {
              toast.success(result.data,{autoClose:1500});
                setTimeout(() => {
                navigate('/login');
              }, 2000);
            }
            else if(result.status===400)
              {
                toast.error(result.data,{autoClose:1500});
  
              }
        }
          catch(err)
          {
            console.log(err);
            
          if(err.status===201)
            {
                toast.error(err.response.data,{autoClose:1500});

            }
            else
            {
              toast.error(err.response.data,{autoClose:1500});
            }
          }
          finally {
            setIsLoading(false); 
          }
          
          
        }
    }


    const handleChange=(e)=>{
        const{name,value}=e.target;
        setFormData((prevVal)=>({
            ...prevVal,[name]:value,
        }));

        setError((prevError)=>({...prevError,[name]:''}));
        // console.log(formData);
        // console.log(error);
        
    }

     //handle show password
     const handleShowPassword = () => {
      setShowPassword(!showPassword); 
  }
    return(
        <>
        <div className={styles.main_container}>
            <div className={styles.signUp_container}>
                <div className={styles.left_container}>
                    <div className={styles.overlay}></div>
                    <div className={styles.text_overlay}>
                    <h1>Hamro Kitchen</h1>
                    <h3>Experience the essence of <br/>
                    home, anytime, anywhere</h3>
                    </div>
                </div>
                <div className={styles.right_container}>
                    <div className={styles.inner_right}>
                        <div className={styles.heading_signup}> <h1>Signup</h1></div>
                        
          {/* input details  */}
        <div className={styles.input_details}>
            <form onSubmit={handleSubmit} noValidate>
              {/* for username  */}
            <div className={styles.form_group}>
              <div className={styles.input_icon_wrapper}>
            <label htmlFor="signup_username" className={styles.floating_label}>Username:</label>
            <FaUserCircle className={styles.input_icon}/>
            <input 
             type="text"
             id="signup_asyncusername"
             className={styles.input_field}
             placeholder='Enter your name'
             name="userName"
              value={formData.userName}
             onChange={handleChange}
            />
            </div>
             {error.userName && <p className={styles.input_error}>{error.userName}</p>}
            </div>
          

        {/* for email  */}
        <div className={styles.form_group}>
        <div className={styles.input_icon_wrapper}>
        <label htmlFor="signup_email" className={styles.floating_label}>Email:</label>
        <MdEmail className={styles.input_icon}/>
        <input
          type="email"
          id="signup_email"
         className={styles.input_field}
         placeholder='Enter your email'
          name="email"
          value={formData.email}
          onChange={handleChange}
         
        />
      </div>
      {error.email && <p className={styles.input_error}>{error.email}</p>}
      </div>
      
     
        

      {/* for phone number  */}
      <div className={styles.form_group}>
      <div className={styles.input_icon_wrapper}>
        <label htmlFor="signup_phoneNumber" className={styles.floating_label}>Phone Number:</label>
        <FaPhoneAlt  className={styles.input_icon}/>
        <input
          type="tel"
          id="signup_phoneNumber"
         className={styles.input_field}
          placeholder='Enter your phone number'
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
       
        />
      </div>
      {error.phoneNumber&& <p className={styles.input_error}>{error.phoneNumber}</p>}
      </div>


      {/* for password  */}
      <div className={styles.form_group}>
      <div className={styles.input_icon_wrapper}>
        <label htmlFor="signup_password" className={styles.floating_label}>Password:</label>
        <RiLockPasswordFill className={styles.input_icon}/>
        <input
          type={showPassword?"text":"password"}
          id="signup_password"
         className={styles.input_field}
         placeholder='Create Password'
          name="password"
          value={formData.password}
          onChange={handleChange}

        />
        {showPassword? (<FaEyeSlash className={styles.password_eye} onClick={handleShowPassword}/>):(<FaEye className={styles.password_eye} onClick={handleShowPassword}/>)}
        </div>
        {error.password && <p className={styles.input_error}>{error.password}</p>}
       </div>


        {/* for signup button  */}
        <div className={styles.signup_btn}>
      <button type="submit" className={styles.submit_button}>{isLoading ? <Loading/>:'SignUp'}</button>
      
      </div>
    </form>

    <div className={styles.haveAccount}>
       <p>Already have account? <Link to='/login'><span>Login Now</span></Link></p>
    </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </>
    )
}