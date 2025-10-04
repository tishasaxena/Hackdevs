import react from 'react'
import {authService} from '../appwrite/auth'
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { useDispatch } from 'react-redux';
function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Submit=async()=>{
        await authService.logout();
        dispatch(logout());
        navigate('/');
    }
  return(
    <>
    <button onClick={Submit}  className="px-4 py-2 rounded-md font-semibold bg-yellow-300 text-blue-800 hover:bg-yellow-400 transition">Logout</button>
    </>
  )
}  
export default Logout;