import react from 'react'
import {authService} from '../appwrite/auth'
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/AuthSlice';
import { useDispatch } from 'react-redux';
function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Submit=async()=>{
        await authService.logout();
        dispatch(logout());
        navigate('/auth/user/login');
    }
  return(
    <>
    <button onClick={Submit}>Logout</button>
    </>
  )
}  
export default Logout;