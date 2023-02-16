import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext';

const LayoutPrivate = () => {
    const {setUser} =  useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!setUser) {
            navigate('/');
        } else {
            navigate('/home');
        }
    }, [setUser]);

    return (
        <>
        <Outlet />
        </>
    );
}

export default LayoutPrivate;