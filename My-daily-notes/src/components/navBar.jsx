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
        <nav>
            {user && (
                <>
                    <NavLink className="navLinks" to="/notes/labels">Dashboard</NavLink>
                    <NavLink className="navLinks" to="/notes">My Daily Notes</NavLink>
                    <button id='logOut' onClick={handleLogout}>Logout</button>
                </>
            )}
        </nav>
    );
}