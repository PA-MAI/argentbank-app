import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link , useNavigate } from 'react-router-dom';
import '../styles/css/accueil.css'
import Logo from '../assets/img/argentBankLogo.png'
import { logout } from './../Redux/userSlice';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); 
  };

    return (
        <nav className="main-nav">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="main-nav-logo">
              <img src={Logo} className="main-nav-logo-image" alt="Argent Bank Logo" />
              <h1 className="sr-only">Argent Bank</h1>
            </div>
          </Link>
    
          <div>
            {user ? (
              <>
                <Link to="/User" className="main-nav-item">
                  <i className="fa fa-user-circle"></i>
                  {user.firstName} 
                </Link>
                <Link to="/" className="main-nav-item-logout">        
                  <button onClick={handleLogout} className="main-nav-item" style={{ background: 'none', border: 'none',  cursor: 'pointer', color: 'inherit',fontSize:'16px', width:'120px', marginRight:'20px', fontWeight:'bold'}}>
                    <i className="fa fa-sign-out"></i>
                     Sign-out
                  </button>
                </Link>    
              </>
            ) : (
              <Link to="/Login" className="main-nav-item">
                <i className="fa fa-user-circle"></i>
                Sign In
              </Link>
            )}
          </div>
        </nav>
      );
    }
    
    export default Header;