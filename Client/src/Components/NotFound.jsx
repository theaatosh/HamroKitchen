import { useNavigate } from 'react-router-dom';
import styles from '../Styles/NotFound/404NotFound.module.css';
export const NotFound=()=>{
    const navigate = useNavigate();

    const goHome = () => {
      navigate('/');
    };
  
    return (
      <div className={styles.not_found_container}>
        <h1>404</h1>
        <p>{`Oops! The page you're looking for can't be found.`}</p>
        <button onClick={goHome} className={styles.home_btn}>Go to Homepage</button>
      </div>
    );
}