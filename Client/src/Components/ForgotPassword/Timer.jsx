
import Countdown from 'react-countdown';
export const Timer = () => {
  return (
    <div className='text-blue-500'>
      <Countdown date={Date.now()+60000}/>
    </div>
  )
}


