import { FaFingerprint } from "react-icons/fa";
import { Button } from './UI/Button';
import { BackToLogin } from './UI/BackToLogin';
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast } from 'react-toastify';
import Loading from '../Loading';
import styles from '../../Styles/ForgotPassword/OtpVerify.module.css';

export const VerifyOtp = () => {
    const location=useLocation();
    const email=location.state?.email;

    const[isLoading,setIsLoading]=useState(false);
    const navigate = useNavigate();
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);
    const ref6 = useRef(null);
    const inputRef = [ref1, ref2, ref3, ref4, ref5, ref6];

    const [otp, setOtp] = useState(['', '', '', '', '', '']); 

    const handleChange = (e, index) => {
        const updatedOtp = [...otp];
        updatedOtp[index] = e.target.value;
        setOtp(updatedOtp);

     
        if (index < 5 && e.target.value) {
            inputRef[index + 1].current.focus();
        }
    };

    useEffect(() => {
        if (ref1.current) {
            ref1.current.focus();
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const otpString = otp.join('');
        console.log("OTP Submitted:", otpString);
        
        try {
            setIsLoading(true);
            const response = await axios.post("http://localhost:5010/api/forgotpassword/verifyOTP",{email,otp})
            if (response.status===200) {
                console.log(response.data.message);
                
                toast.success(response.data.message);
                navigate('/password/update',{state:{email}});
            } 
        } catch (error) {
                        toast.error(error.response.data.message);
        }
        finally{
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.otp_verify_main_con}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.form_inner}>
                    <div className={styles.upper}>
                        <FaFingerprint className={styles.fingerprint_icon} />
                        <h1 className={styles.heading}>Verify your OTP</h1>
                        <p className={styles.sub_heading}>
                            Enter 6 digit OTP here we just sent to your email
                        </p>
                    </div>
                    <div className={styles.lower}>
                        <div>
                            <label htmlFor="" className={styles.otp_label}>OTP *</label>
                            <div className={styles.otp_input_con}>
                                {inputRef.map((item, index) => (
                                    <input
                                        required
                                        ref={item}
                                        key={index}
                                        type="number"
                                        value={otp[index]} 
                                        onChange={(e) => handleChange(e, index)}
                                        onInput={(e) => {
                                            if (e.target.value.length > 1) {
                                                e.target.value = e.target.value.slice(0, 1);
                                            }
                                        }}
                                        className={styles.otp_input}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className={styles.verify_btn}>
                            <Button type="submit">{isLoading?<Loading/>:"Verify"}</Button>
                        </div>

                        <div className={styles.button}>
                            <BackToLogin />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
