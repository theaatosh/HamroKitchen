import { useContext, useState } from 'react';
import { FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import styles from '../Styles/Login_Signup/Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { StoreContext } from '../Context/StoreContext';
import {  toast } from 'react-toastify';


export const LoginPage=()=>{

  const navigate=useNavigate();
  const{login,userCredentials}=useAuth();
  const{setToken}=useContext(StoreContext);
  const [isLoading, setIsLoading] = useState(false);

    const [error,setError]=useState({});
    const [showPassword,setShowPassword]=useState(false);
    const [formData,setFormData]=useState({
        userName:"",
        password:""
    });

      //form validation
    const validate= ()=>{
      let formErrors={};
      if(!formData.userName.trim()){
        formErrors.userName="UserName Required *";
      }

      
      
      if(!formData.password.trim()){
        formErrors.password="Password Is required *";
      }

    return formErrors;
    }
    const handleSubmit= async (e)=>{
      e.preventDefault();
      const validationError=validate();
      if(Object.keys(validationError).length>0)
      {
        setError(validationError);
      }
      else 
      {

        try{
          setIsLoading(true);
          const result =await axios.post('http://localhost:5010/login',formData);
          console.log(result.data.message);
          
          if(result.status===200)
            {
              if(result.data.message==="login sucessfully"){
                toast.success(result.data.message,{
                  autoClose:1000,
                });
                const token = result.data.token;
             localStorage.setItem('token', token); 
              setToken(token);

              //token bata decode gareko user details
              userCredentials(token);
              
              login();
              setTimeout(() => {
              navigate('/');
            }, 3000);

            }else if(result.data.message==="incorrect password"){
              toast.error(result.data.message,{autoClose:1500});
            }
            else if(result.data.message==="user doesnt exist please register first"){
              toast.error(result.data.message,{autoClose:1500});
            }
          }else{
            console.log("hi");
          }
          
        }
        catch(error)
        {
          toast.error(error.message,{autoClose:1500})
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
          }))

          setError((prevError)=>({...prevError,[name]:''}));
          
    }
    //handle show password
    const handleShowPassword=()=>{
      setShowPassword(!showPassword);
    }
    return(
        <>
        <div className={styles.main_container}>
            <div className={styles.signUp_container}>
              {/* left container */}
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
                        <div className={styles.heading_welcome}> <h1>Welcome</h1></div>
                        <p className={styles.sub_head}>Login with username</p>                      
                        
            {/* right Container */}
        <div className={styles.input_details}>
            <form onSubmit={handleSubmit} noValidate>

              {/* for username  */}
            <div className={styles.form_group}>
            <div className={styles.input_icon_wrapper}>
            <label htmlFor="login_username" className={styles.floating_label}>Username:</label>
            <FaUserCircle className={styles.input_icon}/>
            <input 
             type="text"
             id="login_username"
             className={styles.input_field}
             placeholder='Enter your username'
             name="userName"
              value={formData.userName}
             onChange={handleChange}
             required
             />
             </div>
              {error.userName && <p className={styles.input_error}>{error.userName}</p>}
            </div>

        {/* for password  */}
      <div className={styles.form_group}>
      <div className={styles.input_icon_wrapper}>
        <label htmlFor="login_password" className={styles.floating_label}>Password:</label>
        <RiLockPasswordFill className={styles.input_icon}/>
        <input
          type={showPassword? "text" :"password"}
          id="login_password"
         className={styles.input_field}
         placeholder='Enter your Password'
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {showPassword? (<FaEye className={styles.password_eye} onClick={handleShowPassword}/>): (<FaEyeSlash className={styles.password_eye} onClick={handleShowPassword}/>)}
        </div>
         {error.password && <p className={styles.input_error}>{error.password}</p>}
      <p className={styles.forgot_password}>Forgot your password?</p>
      </div>

        <div className={styles.login_btn}>
      <button type="submit" className={styles.submit_button}>{isLoading ? 'Logging in...' : 'Login'}</button>
      </div>
    </form>
    <div className={styles.haveAccount}>
        <p>Don{`'`}t have an account? <Link to='/signup'><span>SignUp Now</span></Link> </p>
    </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </>
    )
}