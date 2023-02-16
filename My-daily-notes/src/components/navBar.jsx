import { NavLink } from 'react-router-dom';
import { useUserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
    const {user, setUser, logOut} = useUserContext();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logOut();
        navigate('/');
    }


    return (
        <nav class>
            {user && (
                <>
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/home/dashboard">Dashboard</NavLink>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </nav>
    );
}