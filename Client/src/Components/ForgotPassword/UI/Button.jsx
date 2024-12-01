export const Button = ({onClick,type,children}) => {
    return (
      <button onClick={onClick} type={type} className='px-2 py-8 w-[50%] rounded-md bg-blue-500 hover:bg-blue-400 text-white'>{children} </button>
    )
  }
  
  
  