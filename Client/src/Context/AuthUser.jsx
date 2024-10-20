import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { LoginPage } from '../Pages/Login';


const AuthUser= () => {
    const navigate=useNavigate();
    const { login } = useAuth();
    const token = localStorage.getItem('token');
    if(token)
    {
        console.log(token);
        login();
    }
    return token ? navigate('/'):<LoginPage/>;
};

export default AuthUser;