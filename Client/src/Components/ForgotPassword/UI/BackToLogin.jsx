
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
export const BackToLogin = () => {
    const navigate=useNavigate();
     const navigateHandler=()=>{
navigate('/login');

     }
  return (
    <div className='bg-[#f0f0f0] text-center rounded-lg py-2 flex justify-center items-center gap-2 text-xl cursor-pointer text-blue-400' onClick={navigateHandler}>
      <IoMdArrowRoundBack />Back to login
    </div>
  )
}
  

