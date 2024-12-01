

export const Input = ({placeholder,required,onChange,value,type,name}) => {  
    return (
      <input
      type={type} 
      onChange={onChange}
       value={value}
        placeholder={placeholder}
       required={required}
       name={name}
      className='border-2 py-2 px-2 w-[100%] hover:border-blue-300 transition-all duration-200 ease-linear focus:border-blue-400 outline-none rounded-xl '
      />
    )
  }
  
  
  