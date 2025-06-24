import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/css/accueil.css'
import Logo from '../assets/img/argentBankLogo.png'
function Header() {


    return (
        <>
            <nav className="main-nav">
                 <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="main-nav-logo" href="./index.html">
                        <img src={Logo} className="main-nav-logo-image"
                            alt="Argent Bank Logo"/>
                        <h1 className="sr-only">Argent Bank</h1>
                    </div>
                </Link>
                <div>
                    <Link to="/Login" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="main-nav-item"> {/*href = "./sign-in.html" */} 
                            <i className="fa fa-user-circle"></i>
                            Sign In
                        </div>
                    </Link>
                </div>
            </nav>
        </>
    )
}
export default Header