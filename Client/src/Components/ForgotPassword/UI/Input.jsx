
import styles from '../../../Styles/ForgotPassword/Input.module.css';
export const Input = ({placeholder,required,onChange,value,type,name}) => {  
    return (
      <input
      type={type} 
      onChange={onChange}
       value={value}
        placeholder={placeholder}
       required={required}
       name={name}
      className={styles.input}
      />
    )
  }
  
  
  