import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import '../../styles/css/accueil.css';
import { logout } from '../../Redux/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Error() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout());
    }, [dispatch, navigate]);

    return (
        <div className="error">
            <h1>404</h1>
            <p className="error__oups">Oups! La page que vous demandez n'existe pas.</p>
            <p className="error__accueil"><Link to="/">Retourner sur la page d'acceuil</Link></p>
        </div>
   )
}

export default Error