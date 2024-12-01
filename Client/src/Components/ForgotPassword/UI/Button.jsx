export const Button = ({onClick,type,children}) => {
    return (
      <button onClick={onClick} type={type} className='px-0 py-4 w-[50%] rounded-md bg-blue-500 hover:bg-blue-400 text-white'>{children} </button>
    )
  }
  
  
  